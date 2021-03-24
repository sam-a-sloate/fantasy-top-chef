<template>
  <v-container>
    <v-row class="text-center">
      <v-col class="mb-7">
        <h1 class="display-2 font-weight-bold mb-3">
          Welcome to Fantasy Top Chef
        </h1>
        <p class="subheading font-weight-regular">
          For fans of top chef who need to add extra excitement to the viewing
        </p>
        <v-btn
          @click="$router.push('create/league')"
          color="secondary"
          depressed
          elevation="14"
          x-large
          >Create a new League</v-btn
        >
      </v-col>

      <v-container v-if="loaded">
        <v-col class="mb-5" cols="12">
          <p v-if="noTeams" class="subheading font-weight-regular">
            You have no Teams! Consider joining a league or creating your own
          </p>
          <v-simple-table v-else dark>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-center">Team</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="team in teams" :key="team.name">
                  <td>
                    <router-link
                      :to="{
                        name: 'Team',
                        params: { uid: team.id },
                      }"
                    >
                      {{ team.name }}
                    </router-link>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
          <v-row justify="center"> </v-row>
        </v-col>
      </v-container>
    </v-row>
  </v-container>
</template>

<script>
// @ is an alias to /src
import { mapState } from "vuex";

export default {
  name: "Home",
  data() {
    return {
      loaded: false,
    };
  },
  methods: {
    async getOwnedTeams() {
      await this.$store.dispatch("setOwnedTeams");
    },
  },
  computed: {
    ...mapState(["teams"]),
    noTeams() {
      console.log(this.teams);
      return this.teams.length == 0;
    },
  },
  created() {
    this.getOwnedTeams().then(() => (this.loaded = true));
  },
};
</script>
