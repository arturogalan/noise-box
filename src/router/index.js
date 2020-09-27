import Vue from 'vue'
import VueRouter from 'vue-router'
import App from '@/App'
// import GuitarAmp from '@/views/GuitarAmp'
// import Stylophone from '@/views/Stylophone'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'main',
    redirect: {name: 'mainMenu'},
    component: App,
    children: [
      {
        path: '',
        name: 'mainMenu',
        component: () => import(
          /* webpackChunkName: "mainMenu" */ '../views/MainMenu.vue'),
      },
    ],
  },
  {
    path: '/amp',
    name: 'guitarAmp',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "guitarAmp" */ '../views/GuitarAmp.vue'),
  },
  {
    path: '/stylophone',
    name: 'stylophone',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "stylophone" */ '../views/Stylophone.vue'),
  },
]

const router = new VueRouter({
  mode: 'history',
  routes,
})

export default router
