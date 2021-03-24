<template>
  <div v-if="loaded">
    <h1 v-if="isFull">Sorry the league is full! Create a new league</h1>
    <form v-else @submit.prevent>
      <input
        v-model.trim="teamForm.name"
        type="text"
        placeholder="Enter your team's name"
        id="name"
      />
      <button @click="createTeam()" class="button">Create Team</button>
    </form>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      teamForm: {
        name: "",
      },
      loaded: false,
    };
  },
  methods: {
    async getLeague(uid) {
      //Need to figure out how to wait for this before moving on
      await this.$store.dispatch("setCurrentLeague", {
        uid,
      });
    },
    createTeam() {
      this.$store.dispatch("createTeam", {
        name: this.teamForm.name,
      });
    },
  },
  computed: {
    ...mapState(["currentLeague"]),
    isFull() {
      return this.currentLeague.teams.length >= this.currentLeague.max;
    },
  },
  created() {
    return this.getLeague(this.$route.params.uid).then(
      () => (this.loaded = true)
    );
  },
};
</script>
