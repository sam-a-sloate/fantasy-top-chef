import Vue from "vue";
import Vuex from "vuex";
import * as fb from "../firebase";
import router from "../router/index";

Vue.use(Vuex);

//How can I determine which team is there? Basically when someone enters the draft page I need to
const store = new Vuex.Store({
  state: {
    // Fully describes signed in user's profile
    userProfile: {},
    currentLeague: {},
    currentTeam: {},
    ownedTeams: [],
    leagues: [],
    cast: {},
  },
  mutations: {
    // Any state mutations can be defined in this method
    setUserProfile(state, val) {
      state.userProfile = val;
    },
    setCurrentLeague(state, val) {
      state.currentLeague = val;
    },
    setCurrentTeam(state, val) {
      state.currentTeam = val;
    },
    setOwnedTeams(state, val) {
      state.teams = val;
    },
    setCast(state, val) {
      state.cast = val;
    },
  },
  getters: {
    leagueIsFull: (state) => {
      return state.currentLeague.teams.length >= state.currentLeague;
    },
    cast: (state) => {
      return state.cast;
    },
  },
  actions: {
    async login({ dispatch }, form) {
      // sign user in
      const { user } = await fb.auth.signInWithEmailAndPassword(
        form.email,
        form.password
      );

      // fetch user profile and set in state
      dispatch("fetchUserProfile", user);
    },
    async fetchUserProfile({ commit }, user) {
      // fetch user profile
      const userProfile = await fb.usersCollection.doc(user.uid).get();

      // set user profile in state
      commit("setUserProfile", userProfile.data());

      // change route to dashboard
      if (router.currentRoute.path === "/login") {
        router.push("/");
      }
    },
    async signup({ dispatch }, form) {
      // sign user up
      const { user } = await fb.auth.createUserWithEmailAndPassword(
        form.email,
        form.password
      );

      // create user profile object in userCollections
      await fb.usersCollection.doc(user.uid).set({
        name: form.name,
      });

      // fetch user profile and set in state
      dispatch("fetchUserProfile", user);
    },
    async logout({ commit }) {
      await fb.auth.signOut();

      // clear userProfile and redirect to /login
      commit("setUserProfile", {});
      router.push("/login");
    },

    async createLeague({ state }, form) {
      const newLeague = await fb.leagueCollection.add({
        createdOn: new Date(),
        name: form.name,
        max: form.max,
        owner: fb.auth.currentUser.uid,
        ownerName: state.userProfile.name,
        teams: [],
        show: "top-chef",
        pick: 0,
      });
      router.push("/league/" + newLeague.id);
    },

    async createTeam({ state }, teamForm) {
      const teamInLeague = {
        name: teamForm.name,
        ownerName: state.userProfile.name,
        owner: fb.auth.currentUser.uid,
        roster: [],
      };
      const newTeam = await fb.teamCollection.add({
        name: teamForm.name,
        owner: fb.auth.currentUser.uid,
        ownerName: state.userProfile.name,
        league: state.currentLeague.id,
        roster: [], //Ids of all the chefs that are on the team
      });
      await fb.leagueCollection.doc(state.currentLeague.id).update({
        [`teams.${newTeam.id}`]: teamInLeague,
      });
      router.push("/team/" + newTeam.id);
    },

    async setCurrentLeague({ commit }, { uid }) {
      return fb.leagueCollection
        .doc(uid)
        .get()
        .then((cl) => commit("setCurrentLeague", { id: uid, ...cl.data() }));
    },

    async setCurrentTeam({ commit, dispatch }, { uid }) {
      return fb.teamCollection
        .doc(uid)
        .get()
        .then((cl) => {
          const data = cl.data();
          commit("setCurrentTeam", { id: uid, ...data });
          dispatch("setCurrentLeague", { uid: data.league });
        });
    },

    //TODO do we need a team collection
    async setOwnedTeams({ commit }) {
      const teams = await fb.teamCollection
        .where("owner", "==", fb.auth.currentUser.uid)
        .get();
      if (teams.empty) {
        commit("setOwnedTeams", []);
      } else {
        const teamData = teams.docs.map(function (team) {
          return { id: team.id, ...team.data() };
        });

        commit("setOwnedTeams", teamData);
      }
    },

    async setCast({ commit }) {
      const cast = await fb.topChefCollection.get();
      if (cast.empty) {
        commit("setCast", []);
      } else {
        commit("setCast", cast.data());
      }
    },

    async enterDraft({ dispatch, state }, { league, team }) {
      dispatch("setCurrentLeague", { uid: league }).then(() => {
        //If the team is in the league
        if (state.currentLeague.teams[team]) {
          // Mark the team as being in the draft
          fb.leagueCollection.doc(league).update({
            [`teams.${team}.inDraft`]: true,
          });
        }
      });
    },

    async selectPlayer({ dispatch }, { id, league, team }) {
      await fb.leagueCollection.doc(league).update({
        [`teams.${team}.roster`]: fb.fieldValue.arrayUnion(id),
        ["pick"]: fb.fieldValue.increment(1),
      });
      console.log(dispatch);
    },

    //TODO: Need to do this before the page is entered or this will not work damn
    async initializeDraft({ state }) {
      // Generates list of team ids in advance based on the cast size

      //1) Generate list of ids in advance based on the cast size and number of players? Seems easy
      let index = 0;
      let forwards = true;
      const teams = Object.keys(state.currentLeague.teams); // Get the teams
      const length = teams.length; // Get the length of the key set
      let order = [];
      Object.keys(state.cast).forEach(function () {
        //For each chef ID (x number of times)
        //Get the team at the index
        order.push(teams[index]); //Add the team to the overall list
        if (forwards) {
          if (index == length - 1) {
            //Time to Snake back
            forwards = false;
          } else {
            //Move forward
            index = index + 1;
          }
        } else {
          if (index == 0) {
            //Time to snake forward
            forwards = true;
          } else {
            index = index - 1;
          }
        }
      });
      await fb.leagueCollection.doc(state.currentLeague.id).update({
        [`order`]: order,
        ["pick"]: 0,
      });
      
    },
  },
  modules: {},
});

export default store;
