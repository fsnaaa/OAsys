import HttpRequest from "./request"

//根据条件查询考勤信息  
export function searchSettingInfo(params){
    return HttpRequest.request({
        url:"attendanceSetting.ashx?type=query",
        method:"get",
        params
    })
}

//修改用户数据
export function SaveSettingInfo(data){
    return HttpRequest.request({
        url:"attendanceSetting.ashx?type=setting",
        method:"post",
        data
    })
}