import Vue from 'vue'
import BootstrapVue from "bootstrap-vue"
import App from './App.vue'
import Main from './Main.vue'
import head from './head.vue'
import tictac from './tictac.vue'
import VueRouter from './vue-router'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-vue/dist/bootstrap-vue.css"


Vue.use(BootstrapVue);

Vue.use(VueRouter);

const routes = [
	{
		path:'/', component:head
	},
	{
		path:'/congtru', component:App
	},
	{
		path:'/tictac', component:tictac
	}
];

const router = new VueRouter({
	routes,
	mode:'history'
});



new Vue({
  el: '#app',
  router,
  render: h => h(Main)
})
