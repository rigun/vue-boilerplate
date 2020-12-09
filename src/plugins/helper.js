import store from "@/store"
import localForage from 'localforage';

const routerFilter = async (routes) => {
    await store.restored;
    const temp = await localForage.getItem("auth")
    let myrole = null
    if(temp){
      myrole = temp.auth.user.role
    }
    const isLoggedIn = store.getters['getisLoggedIn']
    return routes.filter((row) => {
      return (row.meta.requiresAuth == isLoggedIn && ((row.meta.roleVerif && row.meta.role.some(role => role == myrole) || !row.meta.roleVerif))) || !row.meta.requiresAuth
    })
  }

  export {
      routerFilter
  }