import { routerFilter } from '@/plugins/helper'
import home from "@/components/page/home.vue"
// function loadPage(view) {
//     return () => import( /* webpackChunkName: "page-[request]" */ `@/components/page/${view}.vue`)
// }
function loadView(view) {
  return () => import( /* webpackChunkName: "view-[request]" */ `@/views/${view}.vue`)
}
const routes = [
    {
        path: '',
        name: 'Landing Page',
        meta: {
          requiresAuth: false,
          roleVerif: false,
          role: []
        },
        component: home,
    },
    // {
    //     path: '/profile',
    //     name: 'Profile',
    //     meta: {
    //       requiresAuth: true,
    //       roleVerif: true,
    //       role: ['user']
    //     },
    //     component: loadUserView('profile'),
    // },
    {
      path: '*',
      name: 'NotFound',
      meta: {
          requiresAuth: false,
          roleVerif: false,
          role: []
      },
      component: loadView('Notfound')
    }
]

export default routerFilter(routes)
