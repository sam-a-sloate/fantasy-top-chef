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

        <v-col class="mb-5" cols="12">
        <h2 class="headline font-weight-bold mb-3">My Teams</h2>

        <v-row justify="center">
          
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// @ is an alias to /src
export default {
  name: "Home",
  components: {},
  
};
</script>
