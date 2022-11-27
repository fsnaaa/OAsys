import HttpRequest from "./request"

//根据条件查询考勤列表
export function GetAttendanceList(params){
    return HttpRequest.request({
        url:"attendanceInfo.ashx?type=list",
        method:"get",
        params
    })
}

//修改用户数据
export function GetAttendanceCalendar(data){
    return HttpRequest.request({
        url:"attendanceInfo.ashx?type=calendar",
        method:"post",
        data
    })
}