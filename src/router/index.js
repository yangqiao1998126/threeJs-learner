import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
  path: '/',
  name: 'index',
  component: () => import('../views/index.vue')
},
  {
    path:'/three1',
    name:'three1',
    component:() => import('../views/three1/three1')
  },
  {
    path:'/three2',
    name:'three2',
    component:() => import('../views/three1/three2')
  },
  {
    path:'/dataV',
    name:'dataV',
    component:() => import('../views/dataV/dataV')
  },
]
const router = new VueRouter({
  mode: "hash",
  routes
})

export default router
