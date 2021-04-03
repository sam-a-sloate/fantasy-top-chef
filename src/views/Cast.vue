<template>
  <v-container> <FullCast :disabled="{}" :link="true"/> </v-container>
</template>

<script>
import FullCast from "@/components/FullCast";

export default {
  name: "Cast",
  components: {
    FullCast,
  },
};
</script>
