import client from './index'
import store from '@/store'

const getDataWithParams = (url,request) => client.get(url, {params: request})
const getData = (url) => client.get(url)
const postData = (url,data) => client.post(url,data)
const patchData = (url,data) => client.patch(url,data)
const destroyData = (url) => client.delete(url)
const uploadData = (url,data) => client.post(url, data, {"Content-Type": "multipart/form-data",  onUploadProgress: progressEvent => {
    let percentCompleted = Math.floor((progressEvent.loaded * 100) / progressEvent.total);
    store.dispatch('setLoading',percentCompleted)
}})
const downloadFile = (url) => client.get(url, { responseType: 'blob'})

export {
    getDataWithParams,
    getData,
    postData,
    patchData,
    destroyData,
    uploadData,
    downloadFile
}
