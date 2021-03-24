<template>
  <div>
    <div class="col1">
      <h1>Welcome to {{ this.$store.state.currentTeam.name }}</h1>
      <h2>
        You are in the league: 
        <router-link :to="{name: 'League', params: {uid: this.$store.state.currentLeague.id}}"> {{ this.$store.state.currentLeague.name }}</router-link>
      </h2>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    getTeam(uid) {
      this.$store.dispatch("setCurrentTeam", {
        uid,
      });
    },
  },
  computed: {
    fullPath: function () {
      return (
        window.location.origin + "/login#" + this.$route.fullPath + "/join"
      );
    },
  },
  created() {
    this.getTeam(this.$route.params.uid);
  },
  beforeRouteUpdate(to, from, next) {
    this.getContent(to.params.uid);
    next();
  },
};
</script>
