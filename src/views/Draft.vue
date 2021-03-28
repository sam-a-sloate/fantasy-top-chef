<template>
  <v-container fluid>
    <v-row dense>
      <v-col cols="2" v-for="(team, id) in teams" :key="id">
        <DraftCard color="accent" :teamName="team.name">
          {{ team.name }}
        </DraftCard>
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <FullCast :clickable="true" :disabled="chosen" v-on:choose-chef="selectPlayer"> </FullCast>
  </v-container>
</template>

<script>
import * as fb from "../firebase";
import DraftCard from "@/components/DraftCard";
import FullCast from "@/components/FullCast";

export default {
  data() {
    return {
      teams: {},
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
  },
  computed: {
    chosen: function() {
      return Object.values(this.teams).reduce((collector, reducee) => collector.concat(reducee.roster), []).reduce((obj, chef) => {
        obj[chef]=true;
        return obj;
      }, {})
    }
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
      this.teams = Object.fromEntries(
        Object.entries(snap.data().teams).filter(([key, value]) => {
          console.log(key);
          return value.inDraft === true;
        })
      );
    });
  },
  components: {
    DraftCard,
    FullCast,
  },
};
</script>
