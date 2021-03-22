<template>
  <header>
    <section>
      <div class="col1">
        <router-link to="/">
          <h3>Fantasy Top Chef</h3>
        </router-link>
        <ul class="inline">
          <li>
            <router-link to="/">Home</router-link>
          </li>
          <li>
            <router-link to="/rule">Rules</router-link>
          </li>
          <li><a @click="logout()">logout</a></li>
        </ul>
      </div>
    </section>
  </header>
</template>

<script>
export default {
  methods: {
    logout() {
      this.$store.dispatch('logout')
    }
  }
}
</script>