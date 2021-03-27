<template>
  <v-container>
    <v-chip color="accent" pill v-for="(team, id) in draft" :key="id">
      {{ team.name }}
    </v-chip>
  </v-container>
</template>

<script>
import * as fb from "../firebase";
export default {
  data() {
    return {
      draft: {},
    };
  },
  methods: {
    enterDraft(league, team) {
      this.$store.dispatch("enterDraft", { league, team });
      //Can only enter the draft if they are not already in it
    },
    async leaveDraft(league, team) {
      await this.$store.dispatch("exitDraft", { league, team });
      //Can leave the draft whenever
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
      this.draft = Object.fromEntries(
        Object.entries(snap.data().draft.teams).filter(([key, value]) => {
          console.log(key);
          return value.isLive === true;
        })
      );
    });
  },
};
</script>
