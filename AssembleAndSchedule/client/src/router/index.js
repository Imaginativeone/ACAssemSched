import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CasementView from '../views/CasementView'
import PictureWindowView from '../views/PictureWindowView'
import DB1View from '../views/DB1View'
import DB2View from '../views/DB2View'
import DG1View from '../views/DG1View'
import DG2View from '../views/DG2View'
import DG3View from '../views/DG3View'
import GliderOneView from '../views/GliderOneView'
import GliderTwoView from '../views/GliderTwoView'


const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/casement',
    name: 'casement',
    component: CasementView
   },
   {
    path: '/picturewindow',
    name: 'picturewindow',
    component: PictureWindowView
   },
   {
    path: '/db1',
    name: 'db1',
    component: DB1View
   },
   {
    path: '/db2',
    name: 'db2',
    component: DB2View
   },
   {
    path: '/dg1',
    name: 'dg1',
    component: DG1View
   },
   {
    path: '/dg2',
    name: 'dg2',
    component: DG2View
   },
   {
    path: '/dg3',
    name: 'dg3',
    component: DG3View
   },
   {
    path: '/gliderone',
    name: 'gliderone',
    component: GliderOneView
   },
   {
    path: '/glidertwo',
    name: 'glidertwo',
    component: GliderTwoView
   },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
