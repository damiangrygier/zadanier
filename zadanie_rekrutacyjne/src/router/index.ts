import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import AboutMeView from '../views/AboutMeView.vue'
import ProductsView from '../views/ProductsView.vue'
import AddProductFormView from '../views/AddProductFormView.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/O-mnie',
    name: 'O-mnie',
    component: AboutMeView
  },
  {
    path: '/products',
    name: 'productsPage',
    component: ProductsView
  },
  {
    path: '/addProduct',
    name: 'addProduct',
    component: AddProductFormView
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
