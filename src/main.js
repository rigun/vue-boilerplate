import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import './style/main.scss'
import { i18n } from './i18n'
import { Trans } from '@/plugins/translation'

Vue.prototype.$transRoute = Trans.i18nRoute.bind()

const runVue = async (r) => {
  const router = await r
  Vue.config.productionTip = false
  new Vue({
    router,
    store,
    i18n,
    render: h => h(App)
  }).$mount('#app')
}
runVue(router)
