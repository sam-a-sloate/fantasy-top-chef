<template>
  <v-img
    :src="getUrl"
    :lazy-src="getUrl"
    aspect-ratio="1"
    :max-height="height"
    :max-width="height"
    class="grey lighten-2 rounded-circle"
  />
</template>

<script>
const sizes = {
  tiny: 75,
  small: 100,
  medium: 150,
  large: 250,
};
export default {
  name: "CastPicture",
  props: {
    id: {
      type: String,
      default: "",
    },
    size: {
      type: String,
      validator: function (value) {
        if (value) {
          return ["tiny", "small", "medium", "large"].indexOf(value) !== -1;
        }
      },
      default: "medium",
    },
  },
  computed: {
    height: function () {
      return sizes[this.size];
    },
    getUrl: function() {
      return `https://www.bravotv.com/sites/bravo/files/styles/cast_head_shot_square_computer/public/2021/02/top-chef-season-18-headshot-${this.id}.jpg`;
    }
  },
};
</script>
