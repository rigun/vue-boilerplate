function loadMaster(view) {
    return () => import( /* webpackChunkName: "master-[request]" */ `@/components/dashboard/master/${view}.vue`)
}

const routes = [
    {
        path: 'master-data',
        name: 'StudyPlace',
        meta: {
          requiresAuth: true,
          roleVerif: true,
          role: ['superadmin','admin']
        },
        component: loadMaster('Master'),
    }
]

export default routes