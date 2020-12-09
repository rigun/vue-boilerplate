import axios from "axios";
import store from "@/store";
import router from '@/router'
/**
 * Create a new Axios client instance
 * @see https://github.com/mzabriskie/axios#creating-an-instance
 */

const options = {
    baseURL: process.env.VUE_APP_BASE_URL,
    timeout: 30000,
    headers: {
        "Content-Type": "application/json",
    }
};
const client = axios.create(options);

const waitForStorageToBeReady = async (config) => {
    await store.restored
    var token = store.getters['auth/getToken'];
    if (token) {
        config.headers['Authorization'] = 'Bearer ' + token;
    }
    return config;
}

// Add a request interceptor
client.interceptors.request.use(
    config => waitForStorageToBeReady(config),
    requestError => {
        return Promise.reject(requestError);
    }
);

// Add a response interceptor
client.interceptors.response.use(
    response => response,
    error => {
        if(error.response.status == 403){
            store.dispatch('logoutStorage')
            router.push({name: 'Login'})
        }
        return Promise.reject(error);
    }
);

export default client;