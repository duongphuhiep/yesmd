import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";

//The module and the interface share the same name Vuetify => When Typescript want to get the interface of Vuetify, but always get the module of Vuetify
import { Vuetify } from "vuetify"; //https://stackoverflow.com/a/58967068/347051

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    vuetify,
    render: h => h(App),
}).$mount("#app");
