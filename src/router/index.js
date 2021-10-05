import Vue from 'vue'
import VueRouter from 'vue-router'
import Pagina1 from '../views/Pagina1.vue'
import Pagina2 from '../views/Pagina2.vue'
import Pagina3 from '../views/Pagina3.vue'
import Pagina4 from '../views/Pagina4.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'pagina1',
    component: Pagina1
  },
  {
    path: '/pagina2',
    name: 'pagina2',
    component: Pagina2
  },
  {
    path: '/pagina3',
    name: 'pagina3',
    component: Pagina3
  },
  {
    path: '/pagina4',
    name: 'pagina4',
    component: Pagina4
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
