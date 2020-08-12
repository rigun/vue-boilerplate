function loadView(view) {
    return () => import( /* webpackChunkName: "view-[request]" */ `@/views/${view}.vue`)
}
const defaultRoute = [
    {
        path: '',
        name: 'Login',
        meta: {
            requiresAuth: false,
            beforelogin: true,
            roleVerif: false,
            role: []
        },
        component: loadView('Login')
      },
      {
        path: '/logoutuser',
        name: 'logoutComponent',
        meta: {
            requiresAuth: true,
            roleVerif: false,
            role: []
        },
        component: loadView('Logout')
      },
      {
        path: '*',
        name: 'NotFound',
        meta: {
            requiresAuth: true,
            roleVerif: false,
            role: []
        },
        component: loadView('NotFound')
      }
]

export default defaultRoute