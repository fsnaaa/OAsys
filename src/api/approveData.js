import HttpRequest from "./request"

//根据条件查询考勤信息  
export function searchApproveList(params){
    return HttpRequest.request({
        url:"approve.ashx?type=select",
        method:"get",
        params
    })
}

//根据请假编号获取请假信息
export function GetApproveInfo(params){
    return HttpRequest.request({
        url:"approve.ashx?type=look",
        method:"get",
        params
    })
}

//修改请假信息
export function updateApprove(data){
    return HttpRequest.request({
        url:"approve.ashx?type=update",
        method:"post",
        data
    })
}
