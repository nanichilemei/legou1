import axios from "axios"
import Vue from "vue"
import { Toast } from 'vant';

Vue.use(Toast);
// 创建axios实例对象
const instance = axios.create({
  baseURL: "http://shop.bufantec.com",
  timeout: 5000
})
var toast;

//请求拦截器
instance.interceptors.request.use(function (config) {
  // 请求显示加载
  toast = Toast.loading({
    message: '加载中...',
    duration:0,
    forbidClick: true,
  });
  if(config.method.toLowerCase() == 'get'){
    config.params = config.data
  }
  return config;
}, function (error) {
 
  return Promise.reject(error);
});

// 响应拦截器
instance.interceptors.response.use(function (response) {
  // 响应加载关闭
  toast.clear();
  return response;
}, function (error) {
  toast.clear();
  return Promise.reject(error);
});

export default instance