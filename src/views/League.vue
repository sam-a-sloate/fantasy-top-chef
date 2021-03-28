<template>
  <div>
    <div class="col1">
      <h1>Welcome to {{ this.$store.state.currentLeague.name }}</h1>
      <h2>
        This league has a maximum of
        {{ this.$store.state.currentLeague.max }} players
      </h2>
      <h2>
        To invite players send them this link
        <a :href="fullPath"> {{ this.fullPath }}</a>
      </h2>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    getLeague(uid) {
      this.$store.dispatch("setCurrentLeague", {
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
    this.getLeague(this.$route.params.uid);
  },
  beforeRouteUpdate(to, from, next) {
    this.getContent(to.params.uid);
    next();
  },
};
</script>
