import { createRouter, createWebHistory } from "vue-router";
import { createApp } from "vue";

import App from "./App.vue";
import AppWeather from "./components/AppWeather.vue";
import AppBoard from "./components/AppBoard.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      name: "Home",
      path: "/",
      redirect: "/kanban",
      component: App,
      children: [
        {
          name: "Kanban",
          path: "/kanban/",
          component: AppBoard,
        },
        {
          name: "Weather",
          path: "weather",
          component: AppWeather,
        },
      ],
    },
  ],
});

createApp(App).use(router).mount("#app");
