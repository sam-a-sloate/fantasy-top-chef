<template>
  <v-card :loading="loading" class="mx-auto my-12" max-width="300">
    <div v-bind:class="{ notPresent: !present, selectedCard: turn }">
      <template slot="progress">
        <v-progress-linear
          color="deep-purple"
          height="10"
          indeterminate
        ></v-progress-linear>
      </template>

      <v-img
        height="300"
        width="300"
        compact
        src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
      ></v-img>

      <v-card-title>{{ teamName }}</v-card-title>

      <v-divider />
      <v-row dense>
        <v-col
          v-for="chef in team.roster"
          :key="chef"
          cols="3"
          class="d-flex child-flex pt-4"
        >
          <CastPic :id="$store.state.cast[chef].id" size="tiny" />
        </v-col>
      </v-row>
    </div>
  </v-card>
</template>

<script>
import CastPic from "@/components/CastPic";
export default {
  data: () => ({
    loading: false,
    selection: 1,
  }),

  props: {
    teamName: {
      type: String,
    },
    present: {
      type: Boolean,
    },
    turn: {
      type: Boolean,
    },
    team: {
      type: Object,
      default: () => {},
    },
  },

  methods: {
    reserve() {
      this.loading = true;
      setTimeout(() => (this.loading = false), 2000);
    },
  },
  components: {
    CastPic,
  },
};
</script>

<style scoped>
.notPresent {
  filter: grayscale(100%);
  -moz-filter: grayscale(100%);
  -ms-filter: grayscale(100%);
  -o-filter: grayscale(100%);
  -webkit-filter: grayscale(100%);
}
.selectedCard {
    border: 6px solid green !important
}
</style>
