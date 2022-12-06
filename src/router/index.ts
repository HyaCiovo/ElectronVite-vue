import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/canvas",
      name: "canvas",
      component: () => import("../views/Canvas.vue"),
    },
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/data-exchange",
      name: "data-exchange",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/DataExchange.vue"),
    },
    {
      path: "/showape",
      name: "showape",
      component: () => import("../views/ShowApe.vue"),
    },
    {
      path: "/partner",
      name: "partner",
      component: () => import("../views/PartnerPage.vue"),
    },
    {
      path: "/news",
      name: "news",
      component: () => import("../views/NewsPage.vue"),
    },
    {
      path: "/help",
      name: "help",
      component: () => import("../views/HelpPage.vue"),
    },
    {
      path: "/about",
      name: "about",
      component: () => import("../views/AboutPage.vue"),
    },
  ],
});

export default router;
