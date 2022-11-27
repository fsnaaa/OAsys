import HttpRequest from "./request"


//根据部门编号查询部门员工信息
export function GetDeptUserAttendance(params){
    return HttpRequest.request({
        url:"user.ashx?type=searchDept",
        method:"get",
        params
    })
}

//上传文件
export function uploadExcel(data,option){
    return HttpRequest.request2({
        url:"attManager.ashx?type=upload",
        method:"post",
        data
    },option)
}