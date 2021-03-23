import Vue from "vue";
import Vuex from "vuex";
import * as fb from "../firebase";
import router from "../router/index";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    // Fully describes signed in user's profile
    userProfile: {},
    currentLeague: {},
    leagues: [],
  },
  mutations: {
    // Any state mutations can be defined in this method
    setUserProfile(state, val) {
      state.userProfile = val;
    },
    setCurrentLeague(state, val) {
      state.currentLeague = val;
    },
  },
  getters: {
    leagueIsFull: (state) => {
      return state.currentLeague.teams.length >= state.currentLeague;
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
      });
      router.push("/league/" + newLeague.id);
    },

    async setCurrentLeague({ commit }, { uid }) {
      return fb.leagueCollection
        .doc(uid)
        .get()
        .then((cl) => commit("setCurrentLeague", cl.data()));
    },
  },
  modules: {},
});

export default store;
