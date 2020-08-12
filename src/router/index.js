import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store/index'
import routes from './routes'

const waitForStorageToBeReady = (to, from, next) => {
  if (to.matched.some(route => route.meta.requiresAuth) && !store.getters['getisLoggedIn']) {
    next({
      name: 'Login'
    })
    return
  }
  if (to.matched.some(route => route.meta.beforelogin) && store.getters['getisLoggedIn']) {
    next({
      name: 'Dashboard'
    })
    return
  }
  next()
}
const setRouter = async (routes) => {
  const data = await routes
  Vue.use(VueRouter)
  const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: data
  })
  router.beforeEach(waitForStorageToBeReady)
  return router
}
export default setRouter(routes)