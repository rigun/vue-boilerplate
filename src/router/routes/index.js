import dashboardRoute from './dashboardRoute'
import defaultRoute from './defaultRoute'

function loadView(view) {
    return () => import( /* webpackChunkName: "view-[request]" */ `@/views/${view}.vue`)
}
const routerFilter = async () => {
    const dashboardChild = await dashboardRoute;
    return [
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
        ...defaultRoute        
      ]
}

export default routerFilter()