import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import FS from './components/FinalSelection.vue';
import RG from './components/ReportGeneration.vue';
import REG from './components/Registration.vue';


Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },

      { path: '/selectionView', component: FS, name:'fs' },
      { path: '/reportsView', component: RG, name:'rg' },
      { path: '/regView', component: REG, name:'reg' },
      
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})

router.beforeResolve((to, from, next) => {
  // If this isn't an initial page load.
  if (to.name) {
      // Start the route progress bar.
      NProgress.start()
  }
  next()
})

router.afterEach((to, from) => {
  // Complete the animation of the route progress bar.
  NProgress.done()
})



export default router
