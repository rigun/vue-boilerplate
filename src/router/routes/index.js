import homeRoute from './homeRoute'
import dashboardRoute from './dashboardRoute'
import defaultRoute from './defaultRoute'
import { routerFilter } from '@/plugins/helper'

function loadView(view) {
    return () => import( /* webpackChunkName: "view-[request]" */ `@/views/${view}.vue`)
}
const generateRoutes = async () => {
  const dashboardChild = await dashboardRoute;
  const homeChild = await homeRoute;

  const routes = [
    ...defaultRoute,        
    {
      path: '/dashboard',
      meta: {
        requiresAuth: true,
        roleVerif: false,
        role: []
      },
      component: loadView('Dashboard'),
      children: dashboardChild
    },     
    {
      path: '',
      meta: {
        requiresAuth: false,
        roleVerif: false,
        role: []
      },
      component: loadView('Home'),
      children: homeChild
    },
  ]
  console.log(routes)
  return routerFilter(routes)
}
export default generateRoutes()