<template>
  <v-container>
    <v-container v-if="loaded">
      <template>
        <v-row>
          <v-col
            v-for="(chef, id) in cast"
            :key="id"
            class="d-flex child-flex"
            cols="auto"
          >
            <!-- TODO Make the cast member a component and figure out why sometimes this does not load! -->
            <a :href="`https://www.bravotv.com/people/${id}`" v-if="link">
              <v-img
                :src="`https://www.bravotv.com/sites/bravo/files/styles/cast_head_shot_square_computer/public/2021/02/top-chef-season-18-headshot-${chef.id}.jpg`"
                :lazy-src="`https://www.bravotv.com/sites/bravo/files/styles/cast_head_shot_square_computer/public/2021/02/top-chef-season-18-headshot-${chef.id}.jpg`"
                aspect-ratio="1"
                max-height="150"
                max-width="150"
                class="grey lighten-2 rounded-circle"
              >
              </v-img>
            </a>

            <button
              v-else-if="clickable"
              :disabled="disabled[id]"
              v-on:click="$emit('choose-chef', id)"
            >
            <div v-bind:class="{disabledImg: disabled[id]}">
              <v-img
                :src="`https://www.bravotv.com/sites/bravo/files/styles/cast_head_shot_square_computer/public/2021/02/top-chef-season-18-headshot-${chef.id}.jpg`"
                :lazy-src="`https://www.bravotv.com/sites/bravo/files/styles/cast_head_shot_square_computer/public/2021/02/top-chef-season-18-headshot-${chef.id}.jpg`"
                aspect-ratio="1"
                max-height="100"
                max-width="100"
                class="grey lighten-2 rounded-circle"
              >
              </v-img>
              </div>
            </button>

            <v-img
              v-else
              :src="`https://www.bravotv.com/sites/bravo/files/styles/cast_head_shot_square_computer/public/2021/02/top-chef-season-18-headshot-${chef.id}.jpg`"
              :lazy-src="`https://www.bravotv.com/sites/bravo/files/styles/cast_head_shot_square_computer/public/2021/02/top-chef-season-18-headshot-${chef.id}.jpg`"
              aspect-ratio="1"
              max-height="150"
              max-width="150"
              class="grey lighten-2 rounded-circle"
            >
            </v-img>
          </v-col>
        </v-row>
      </template>
    </v-container>
  </v-container>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Home",
  data() {
    return {
      loaded: false,
    };
  },
  props: {
    link: {
      type: Boolean,
      default: false,
    },
    clickable: {
      type: Boolean,
      default: false,
    },
    disabled: {
      //Disabled chefs like so {"sam": true}
      type: Object,
      default: () => {},
    },
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

<style scoped>
.disabledImg {
    filter: grayscale(100%);
    -moz-filter: grayscale(100%);
    -ms-filter: grayscale(100%);
    -o-filter: grayscale(100%);
    -webkit-filter: grayscale(100%);
}
</style>