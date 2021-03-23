<template>
  <div class="col2">
    <form @submit.prevent>
      <h1>Create a new League</h1>
      <div>
        <label for="name">League Name</label>
        <input
          v-model.trim="leagueForm.name"
          type="text"
          placeholder="Top Cheffers"
          id="name"
        />
        <input
          v-model.trim="leagueForm.max"
          type="integer"
          id="name"
          placeholder="Up to 5 people can join a league"
          max="5"
        />
      </div>
      <button @click="createLeague()" class="button">Sign Up</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      leagueForm: {
        name: "",
        max: 4,
      },
    };
  },
  methods: {
    createLeague() {
      this.$store.dispatch("createLeague", {
        name: this.leagueForm.name,
        max: this.leagueForm.max,
      });
    },
  },
};
</script>
