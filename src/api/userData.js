import HttpRequest from "./request"

//根据条件查询用户数据
export function searchUser(params){
    return HttpRequest.request({
        url:"user.ashx?type=select",
        method:"get",
        params
    })
}

//获取部门主管所有数据
export function GetAllManager(){
    return HttpRequest.request({
        url:"user.ashx?type=Manager",
        method:"get",
    })
}

//根据用户编号获取用户信息
export function GetUserInfo(params){
    return HttpRequest.request({
        url:"user.ashx?type=info",
        method:"get",
        params
    })
}

//新增用户数据
export function addUser(data){
    return HttpRequest.request({
        url:"user.ashx?type=add",
        method:"post",
        data
    })
}

//修改用户数据
export function updateUser(data){
    return HttpRequest.request({
        url:"user.ashx?type=update",
        method:"post",
        data
    })
}

//删除用户数据
export function removeUser(data){
    return HttpRequest.request({
        url:"user.ashx?type=remove",
        method:"post",
        data
    })
}

//登录验证
export function userLogin(data){
    return HttpRequest.request({
        url:"user.ashx?type=login",
        method:"post",
        data
    })
}

//根据编号修改密码
export function updatePsw(data){
    return HttpRequest.request({
        url:"user.ashx?type=updatePsw",
        method:"post",
        data
    })
}

