import axios from "axios"
import config from "config/config"

let baseUrl = config.baseURL;

class HttpRequest{
    //构造函数
    constructor(baseUrl){
        this.baseURL = baseUrl;
    }

    //拦截器
    interceptors(instance){
        // 添加请求拦截器
        instance.interceptors.request.use(function (config) {
            // 在发送请求之前做些什么
            return config;
        }, function (error) {
            // 对请求错误做些什么
            return Promise.reject(error);
        });

        // 添加响应拦截器
        instance.interceptors.response.use(function (response) {
            // 对响应数据做点什么
            return response;
        }, function (error) {
            // 对响应错误做点什么
            return Promise.reject(error);
        });
    }
    getBaseConfig() {
        const config = {
            baseUrl: this.baseURL,
            header: {}
        }
      
        return config
    }
    //发送网络请求
    request(options){
        //创建axios对象
        const axiosObj = axios.create();
        options = {...options,...this.getBaseConfig()};
       
        this.interceptors(axiosObj);

        return axiosObj(options);
    }
}
export default new HttpRequest(baseUrl);