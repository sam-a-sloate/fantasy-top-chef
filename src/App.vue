<template>
  <v-app>
    <div v-if="showNav">
      <v-navigation-drawer v-model="sidebar" app>
        <v-list>
          <v-list-item
            v-for="item in menuItems"
            :key="item.title"
            :to="item.path"
          >
            <v-list-item-content>{{ item.title }}</v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-app-bar app>
        <v-toolbar-title>
          <router-link to="/" style="cursor: pointer">
            {{ appTitle }}
          </router-link>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items class="hidden-xs-only">
          <v-btn
            text
            v-for="item in menuItems"
            :key="item.title"
            :to="item.path"
          >
            <v-icon left dark>{{ item.icon }}</v-icon>
            {{ item.title }}
          </v-btn>
        </v-toolbar-items>
      </v-app-bar>

      <v-main>
        <router-view></router-view>
      </v-main>
    </div>
    <div v-else>
      <v-main>
        <router-view></router-view>
      </v-main>
    </div>
  </v-app>
</template>
<script>
import { mapState } from "vuex";

export default {
  name: "App",

  data: () => ({
      appTitle: 'Fantasy Top Chef',
      sidebar: false,
      menuItems: [
          { title: 'Home', path: '/home' },
          { title: 'Cast', path: '/cast' },
          { title: 'Login', path: '/login'},
          { title: 'Logout', path: '/logout'}
     ]
  }),
  computed: {
    ...mapState(["userProfile"]),
    showNav() {
      return Object.keys(this.userProfile).length > 0;
    },
  },
};
</script>
