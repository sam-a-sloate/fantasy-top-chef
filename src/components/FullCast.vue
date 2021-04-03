<template>
  <!-- Move to parent -->
  <v-row>
    <v-col
      v-for="(chef, id) in this.cast"
      :key="id"
      class="d-flex child-flex"
      cols="auto"
    >
      <!-- TODO Make the cast member a component and figure out why sometimes this does not load! -->
      <a :href="`https://www.bravotv.com/people/${id}`" v-if="link">
        <CastPic :id="chef.id" :class="{ disabledImg: chef.eliminated }">
        </CastPic>
      </a>

      <button
        v-else-if="clickable"
        :disabled="disabled[id]"
        v-on:click="$emit('choose-chef', id)"
      >
        <div :class="{ disabledImg: disabled[id]}">
          <CastPic :id="chef.id"> </CastPic>
        </div>
      </button>

      <CastPic v-else :id="chef.id" :class="{ disabledImg: disabled[id] }" />
    </v-col>
  </v-row>
</template>

<script>
import CastPic from "@/components/CastPic";
export default {
  name: "FullCast",
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
      return await this.$store.dispatch("setCast");
    },
  },
  computed: {
    cast() {
      return Object.assign({}, this.$store.getters.cast);
    },
  },
  //TODO images not loaded when page is first opened for some reason! Figure this out later
  created() {
    this.getCast();
  },
  components: {
    CastPic,
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
