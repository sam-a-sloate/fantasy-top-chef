<template>
  <v-container>
    <v-row class="text-center">
      <v-container v-if="loaded">
        <template>
          <v-row>
            <v-col
              v-for="(chef, id) in cast"
              :key="id"
              class="d-flex child-flex mb-1"
              cols="auto"
            >
              <a :href="`https://www.bravotv.com/people/${id}`">
                <v-img
                  :src="`https://www.bravotv.com/sites/bravo/files/styles/cast_head_shot_square_computer/public/2021/02/top-chef-season-18-headshot-${chef.id}.jpg`"
                  :lazy-src="`https://www.bravotv.com/sites/bravo/files/styles/cast_head_shot_square_computer/public/2021/02/top-chef-season-18-headshot-${chef.id}.jpg`"
                  aspect-ratio="1"
                  max-height="300"
                  max-width="250"
                  class="grey lighten-2 rounded-circle"
                >
                </v-img>
              </a>
            </v-col>
          </v-row>
        </template>
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
    async getCast() {
      await this.$store.dispatch("setCast");
    },
  },
  computed: {
    ...mapState(["cast"]),
  },
  created() {
    this.getCast().then(() => (this.loaded = true));
  },
};
</script>
