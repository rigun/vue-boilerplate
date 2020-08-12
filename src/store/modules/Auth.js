import {
    postData
} from '@/store/config/method'
const initialState = () => ({
    user: {},
    data: {last_page: 0, data: [], total: 0},
    request: {
        page: 1,
        show: 9,
        sortBy: "created_at",
        sorting: "DESC",
        search: null
    },
    token: null,
    appkey: null,
    msg: 'Jaringan Bermasalah',
    status: 0
})
const state = initialState
function makeid() {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < 20; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
 
const getters = {
    getMsg: state => state.msg,
    getStatus: state => state.status,
    getToken: state => state.token,
    getAppkey: state => state.appkey,
    getUser: state => state.user,
    getRole: state => state.user.role,
    getId: state => state.user.id
}

const actions = {
    async loginUser({
        commit, rootState
    }, data) {
        try {
            var response = await postData('login',data);
            if(response.data.status == 0){
                commit('SET_RESPONSE', response.data);
                return
            }
            commit('SET_TOKEN', response.data)
            rootState.isLoggedIn = true
        } catch (err) {
            if(err.response.status == 401){
                commit('SET_RESPONSE', err.response.data);
            }else{
                commit('SET_FAILED')
            }
        }
    },
    async logoutUser({
        commit
    }, data) {
        try {
            var response = await postData('logout',data);
            commit('SET_RESPONSE', response.data);
        } catch (err) {
            commit('SET_FAILED')
        }
    }
}

const mutations = {
    SET_FAILED(state) {
        state.msg = 'Jaringan Bermasalah'
        state.status = 0
    },
    SET_RESPONSE(state, response) {
        state.msg = response.msg
        state.status = response.status
    },
    SET_USER(state, response) {
        state.msg = response.msg
        state.status = response.status
        state.user = response.data
    },
    SET_TOKEN(state, response) {
        state.msg = response.msg
        state.status = response.status
        state.user = response.user;
        state.token = response.access_token
        var key = makeid()
        state.appkey = key
        localStorage.setItem('appkey',key)
    },
    resetState (state) {
        const initial = initialState()
        Object.keys(initial).forEach(key => { state[key] = initial[key] })
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}