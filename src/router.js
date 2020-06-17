import Vue from "vue";
import Router from "vue-router";
import HelloWorld from "./components/HelloWorld.vue";
import Main from "./components/Main.vue";
import Table from "./components/Table.vue";
import Dropdown from "./components/Dropdown.vue";
import vSelect from "vue-select";
Vue.component("v-select", vSelect);
Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/helloworld",
      name: "helloworld",
      component: HelloWorld,
    },
    {
      path: "/",
      name: "main",
      component: Main,
    },
    {
      path: "/table",
      name: "table",
      component: Table,
    },
    {
      path: "/dropdown",
      name: "dropdown",
      component: Dropdown,
    },
  ],
});
