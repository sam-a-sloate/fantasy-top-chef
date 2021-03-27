import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import { auth } from "../firebase";
import store from "../store/index";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      requiresAuth: true,
    },
  },
  {
    //Page Containing scoring and rules
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Login.vue"),
  },
  {
    path: "/logout",
    name: "Logout",
    component: {
      beforeRouteEnter(to, from, next) {
        store.dispatch("logout");
        next();
      },
    },
  },
  {
    //Page Containing scoring and rules
    path: "/create/league",
    name: "CreateLeague",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/CreateLeague.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    //Page Containing league information
    path: "/league/:uid",
    name: "League",

    component: () =>
      import(/* webpackChunkName: "about" */ "../views/League.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    //Page Containing scoring and rules
    path: "/league/:uid/join",
    name: "JoinLeague",

    component: () =>
      import(/* webpackChunkName: "about" */ "../views/JoinLeague.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    //Page Containing scoring and rules
    path: "/team/:uid",
    name: "Team",

    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Team.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    //Page Containing scoring and rules
    path: "/league/:league/draft/:team",
    name: "Draft",

    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Draft.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    //Page Containing scoring and rules
    path: "/cast",
    name: "Cast",

    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Cast.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    //Page Containing scoring and rules
    path: "/rule",
    name: "Rules",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Rules.vue"),
    meta: {
      requiresAuth: true,
    },
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((x) => x.meta.requiresAuth);

  if (requiresAuth && !auth.currentUser) {
    next("/login");
  } else {
    next();
  }
});

export default router;
