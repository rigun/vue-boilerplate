import { routerFilter } from '@/plugins/helper'
// import masterRoute from './dashboard/masterRoute'

function loadDashboard(view) {
    return () => import( /* webpackChunkName: "dashboard-[request]" */ `@/components/dashboard/${view}.vue`)
}

const routes = [
    {
        path: '',
        name: 'Dashboard',
        meta: {
          requiresAuth: true,
          roleVerif: false,
          role: []
        },
        component: loadDashboard('main'),
    },
    // ...masterRoute,
]

export default routerFilter(routes)