import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "@/views/AboutView.vue"),
  },
  {
    path: "/user",
    name: "user",
    component: () =>
      import(/* webpackChunkName: "user" */ "@/views/UserView.vue"),
  },
  {
    path: "/toggle",
    name: "toggle",
    component: () =>
      import(
        /* webpackChunkName: "toggleItems" */ "@/views/ToggleItemsView.vue"
      ),
  },
  {
    path: "/blog",
    name: "blog",
    component: () =>
      import(/* webpackChunkName: "blog" */ "@/views/AppBlogView.vue"),
    children: [
      {
        name: "post",
        path: "/:id",
        component: () =>
          import(/* webpackChunkName: "post" */ "@/views/AppPostView.vue"),
      },
    ],
  },
  {
    path: "/tutorials",
    name: "tutorials",
    component: () =>
      import(
        /* webpackChunkName: "tutorialsList" */ "@/views/TutorialsListView.vue"
      ),
  },
  {
    path: "/tutorials/:id",
    name: "tutorial-details",
    component: () =>
      import(
        /* webpackChunkName: "tutorialDetails" */ "@/views/TutorialDetailsView.vue"
      ),
  },
  {
    path: "/tutorials/add",
    name: "add-tutorial",
    component: () =>
      import(
        /* webpackChunkName: "addTutorial" */ "@/views/AddTutorialView.vue"
      ),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
