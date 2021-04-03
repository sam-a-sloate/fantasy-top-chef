<template>
  <v-container fluid>
    <v-row dense>
      <v-col cols="2" v-for="(team, id) in dleague.teams" :key="id">
        <!-- TODO keep consistent ordering here for a better UX bc this changes -->
        <DraftCard
          color="accent"
          :teamName="team.name"
          :present="team.inDraft"
          :team="team"
          :turn="id === currentPick"
        >
          {{ team.name }}
        </DraftCard>
      </v-col>
      <v-col cols="2">
        <button
          @click="startDraft()"
          :disabled="!allTeamsPresent"
          class="button"
        >
          Begin Draft
        </button>
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <FullCast
      :clickable="currentPick === this.$route.params.team"
      :disabled="chosen"
      v-on:choose-chef="selectPlayer"
    >
    </FullCast>
  </v-container>
</template>

<script>
import * as fb from "../firebase";
import DraftCard from "@/components/DraftCard";
import FullCast from "@/components/FullCast";

export default {
  data() {
    return {
      dleague: {
        teams: {}
      },
    };
  },
  methods: {
    enterDraft(league, team) {
      this.$store.dispatch("enterDraft", { league, team });
      //Can only enter the draft if they are not already in it
    },
    async leaveDraft(league, team) {
      await fb.leagueCollection.doc(league).update({
        [`teams.${team}.inDraft`]: false,
      });
      //Can leave the draft whenever
    },
    selectPlayer(id) {
      this.$store.dispatch("selectPlayer", {
        id,
        league: this.$route.params.league,
        team: this.$route.params.team,
      });
    },
    startDraft() {
      //Kick off the draft setting the pick order
      this.$store.dispatch("initializeDraft");
    },
  },
  computed: {
    chosen: function () {
      if(!this.dleague) {
        return {};
      }
      return Object.values(this.dleague.teams)
        .reduce((collector, reducee) => collector.concat(reducee.roster), [])
        .reduce((obj, chef) => {
          obj[chef] = true;
          return obj;
        }, {});
    },
    allTeamsPresent: function () {
      if (this.dleague.teams) {
        return (
          Object.keys(this.dleague.teams).length ==
          Object.keys(this.dleague.teams).filter(
            (k) => this.dleague.teams[k].inDraft
          ).length
        );
      } else {
        return false;
      }
    },
    currentPick: function () {
      //Get the current team picking
      if (!this.dleague.order) {
        return false;
      }
      return this.dleague.order[this.dleague.pick];
    },
  },
  watch: {
    $route() {
      // TODO: need react to route changes as well as leaving the page for this to work
      this.leaveDraft(this.$route.params.league, this.$route.params.team);
    },
  },
  created() {
    window.addEventListener("beforeunload", () =>
      this.leaveDraft(this.$route.params.league, this.$route.params.team).get()
    );
    //The person must own the team. This can be done in the router to check if they own the team!! Otherwise bad for sure
    this.enterDraft(this.$route.params.league, this.$route.params.team);
    fb.leagueCollection.doc(this.$route.params.league).onSnapshot((snap) => {
      this.dleague = snap.data(); //TODO sort these by key to keep consistent order
    })
  },
  components: {
    DraftCard,
    FullCast,
  },
};
</script>
