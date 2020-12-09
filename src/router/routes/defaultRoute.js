function loadView(view) {
    return () => import( /* webpackChunkName: "default-[request]" */ `@/views/${view}.vue`)
}
const defaultRoute = [
    {
      path: '/login',
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
      path: '/logout',
      name: 'logoutComponent',
      meta: {
          requiresAuth: true,
          roleVerif: false,
          role: []
      },
      component: loadView('Logout')
    },
]

export default defaultRoute