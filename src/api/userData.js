import HttpRequest from "./request"

//查询用户数据
export function searchUser(params){
    return HttpRequest.request({
        url:"/user/userQuery",
        method:"get",
        params
    })
}

//新增用户数据
export function addUser(data){
    return HttpRequest.request({
        url:"/user/userAdd",
        method:"post",
        data
    })
}

//修改用户数据
export function updateUser(data){
    return HttpRequest.request({
        url:"/user/updateUser",
        method:"post",
        data
    })
}

//删除用户数据
export function removeUser(data){
    return HttpRequest.request({
        url:"/user/removeUser",
        method:"post",
        data
    })
}