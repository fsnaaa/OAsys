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
            baseURL: this.baseURL,
            withCredentials: true, 
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                // "Origin":"http://39.108.167.127:8844/"
                "Origin":"https://localhost:44315/"
            }
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
    //发送网络请求 
    //options:普通请求内容 url methods 参数
    //headers:特殊头部配置
    request2(options,headers){
        //创建axios对象
        const axiosObj = axios.create();
        //合并用户请求的配置和公共配置
        options = {...options,...this.getBaseConfig()};
        console.log(options)
        //合并普通配置和上传需求的头部配置
        const keys=Object.keys(headers);
        keys.forEach(key=>{
            options["headers"][key]=headers[key];
        })

        this.interceptors(axiosObj);
        return axiosObj(options);
    }
}
export default new HttpRequest(baseUrl);