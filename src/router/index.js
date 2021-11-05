import Vue from 'vue'
import VueRouter from 'vue-router'
import Carrousel from '@/components/Carrousel';
import Table from '@/components/Table';

Vue.use(VueRouter)

const routes = [
  {
    path: '/Carrousel',
    name: 'Carrousel',
    component: Carrousel
  },
  {
    path: '/Table',
    name: 'Table',
    component: Table
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})

export default router
