import HttpRequest from "./request"

//根据条件查询部门数据
export function searchDept(params){
    return HttpRequest.request({
        url:"dept.ashx?type=queryDept",
        method:"get",
        params
    })
}

//查询部门所有数据
export function searchDeptAllList(){
    return HttpRequest.request({
        url:"dept.ashx?type=getAll",
        method:"get",
    })
}

//根据用户编号获取部门信息
export function GetDeptInfo(params){
    return HttpRequest.request({
        url:"dept.ashx?type=info",
        method:"get",
        params
    })
}

//新增部门数据
export function addDept(data){
    return HttpRequest.request({
        url:"dept.ashx?type=addDept",
        method:"post",
        data
    })
}

//修改部门数据
export function updateDept(data){
    return HttpRequest.request({
        url:"dept.ashx?type=updateDept",
        method:"post",
        data
    })
}

//删除部门数据
export function removeDept(data){
    return HttpRequest.request({
        url:"dept.ashx?type=removeDept",
        method:"post",
        data
    })
}
