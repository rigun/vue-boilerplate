import Vue from 'vue'
import Vuex from 'vuex'
import modules from './modules'
import VuexPersistence from 'vuex-persist';
import localForage from 'localforage';
const authStorage = new VuexPersistence({
    key: 'appName',
    storage: localForage,
    reducer: state => ({ auth: state.auth }),
    asyncStorage: true
})
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoggedIn: !!localStorage.getItem('appkey'),
    snackbar: {
      type: "success",
      text: "message",
      withclose: true,
      show: false
    },
    loading: 0,
    collapse: false

  },
  getters: {
    getLoading: state => state.loading,
    getisLoggedIn: state => state.isLoggedIn,
    getSnackbar: state => state.snackbar,
    getCollapse: state => state.collapse
  },
  actions: {
    setLoading({commit}, value){
      commit('SET_LOADING', value);
    },
    showSnackbar({commit}, {
        type = "success",
        text = "message",
        withclose = true,
        show = true
      }){
        var value ={
          type: type,
          text: text,
          withclose: withclose,
          show: show
        }
      commit('SET_SNACKBAR', value);
    },
    hideSnackbar({commit}){
        commit('HIDE_SNACKBAR');
    },
    async logoutStorage({commit,state}){
      localStorage.clear();
      state.isLoggedIn = false
      const initial = modules
      Object.keys(initial).forEach(key =>  commit(`${key}/resetState`))
    }
  },
  mutations: {
    SET_LOADING(state, value) {
      state.loading = value;
    },
    SET_SNACKBAR(state, value) {
      state.snackbar = value;
    },
    HIDE_SNACKBAR(state) {
      state.snackbar.show = false;
    },
    SET_COLLAPSE(state) {
      state.collapse = !state.collapse;
    },
    RESET_COLLAPSE(state) {
      state.collapse = false;
    },
  },
  modules,
  plugins: [authStorage.plugin]
})