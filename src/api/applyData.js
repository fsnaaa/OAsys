import HttpRequest from "./request"

//根据条件查询考勤信息  
export function searchApproveList(params){
    return HttpRequest.request({
        url:"apply.ashx?type=select",
        method:"get",
        params
    })
}

//新增请假
export function addApprove(data){
    return HttpRequest.request({
        url:"apply.ashx?type=add",
        method:"post",
        data
    })
}

//根据请假编号获取请假信息
export function GetApproveInfo(params){
    return HttpRequest.request({
        url:"apply.ashx?type=look",
        method:"get",
        params
    })
}

//修改请假信息
export function updateApprove(data){
    return HttpRequest.request({
        url:"apply.ashx?type=update",
        method:"post",
        data
    })
}

//删除用户数据
export function removeApprove(data){
    return HttpRequest.request({
        url:"apply.ashx?type=remove",
        method:"post",
        data
    })
}

