import Mock from "mockjs"

//链接的处理函数
function param2Obj (url) {
    const search = url.split('?')[1]
    if (!search) {
      return {}
    }
    return JSON.parse(
      '{"' +
      decodeURIComponent(search)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"') +
      '"}'
    )
  }
  
//生成模拟用户数据
let list=[];
for(let i=1;i<=200;i++){
    list.push(
        Mock.mock({
            id:Mock.Random.guid(),
            name:Mock.Random.cname(),
            'age|18-30':1,
            sex:Mock.Random.integer(0,1),
            birth:Mock.Random.date(),
            address:Mock.Random.county(true)
        })
    )
}

//拦截用户数据
//拦截axios查询请求
Mock.mock(/user\/userQuery/,function(params){
    //解析处理链接
    let {pageIndex,key}= param2Obj(params.url);
    
    //根据查询条件获取需要查询的用户
    let mockData=list.filter(item=>{
       return item.name.indexOf(key)>=0||item.address.indexOf(key)>=0;
    })

    //要每页10条
    //开始的序号 (页码-1)*10+1
    let start =(pageIndex-1)*10+1;
    //结束的序号 页码*10
    let end=pageIndex*10;
    //筛选出用户和序号 获取每页的条数范围
    let result= mockData.filter((item,index)=>{
        index=index+1;
        return index>=start&&index<=end;
    })

    //定义一个对象 并返回
    const queryResult={
        code:0,
        message:"",
        data:result,//需要返回的数据
        total:mockData.length//需要返回的数组长度
    }

    return queryResult;
})

//拦截axios新增请求
Mock.mock(/user\/userAdd/,"post",function(addData){
    //JSON.parse 将字符串转化为对象
    //JSON.stringify 将对象转化为字符串
    let add=JSON.parse(addData.body);
    add.id=Mock.Random.guid();
    list.unshift(add); 
})

//拦截axios修改请求
Mock.mock(/user\/updateUser/,"post",function(updateData){
    let update=JSON.parse(updateData.body);
    let user=list.find(u=>u.id==update.id);

    //将修改的信息重新赋值给对应用户数据
    user.name=update.name;
    user.age=update.age;
    user.sex=update.sex;
    user.birth=update.birth;
    user.address=update.address;
})

//拦截axios删除请求
Mock.mock(/user\/removeUser/,"post",function(removeData){
    //根据用户id 找到用户的序号
    let num=list.findIndex(u=>u.id==removeData.body);
    //根据序号删除在数组中移除该用户信息
    list.splice(num,1);
    
})


//菜单数据
//普通员工0
//系统管理员1
//部门经理2
//公共部分3
const menus=[
        {
        path: "/home",
        name: "home",
        label: "首页",
        icon: "s-home",
        url:"home/Home",
        index: "1",
        sign:3
        },
        {
        path: "/user",
        name: "user",
        label: "用户管理",
        url:"user/User",
        icon: "user",
        index: "2",
        sign:1
        },
        {
        path: "/dept",
        name: "dept",
        label: "部门管理",
        url:"dept/Dept",
        icon: "tickets",
        index: "3",
        sign:1
        },
        {
        path: "/setting",
        name: "setting",
        label: "考勤设置",
        url:"setting/Setting",
        icon: "setting",
        index: "33",
        sign:1
        },
        {
        path: "/approver",
        name: "approver",
        label: "请假审批",
        url:"approver/Approver",
        icon: "edit",
        index: "11",
        sign:2
        },
        {
        path: "/attManager",
        name: "attManager",
        label: "考勤管理",
        url:"attManager/AttManager",
        icon: "time",
        index: "44",
        sign:2
        },
        {
        path: "/apply",
        name: "apply",
        label: "请假申请",
        url:"apply/Apply",
        icon: "message",
        index: "7",
        sign:0
        },
        {
        label: "我的考勤",
        icon: "star-on",
        name: "myAttendance",
        path: "/other",
        index: "4",
        sign:0,
        children: [
            {
            path: "/attendanceList",
            name: "attendanceList",
            label: "考勤列表",
            url:"attendanceList/AttendanceList",
            index: "5",
            },
            {
            path: "/calender",
            name: "calender",
            label: "考勤日历",
            url:"calender/Calender",
            index: "6",
            },
        ],
        },
  ];
//拦截登录验证请求
Mock.mock(/user\/userLogin/,"post",function(loginData){
    //解析对象
    let {loginName,loginPwd}=JSON.parse(loginData.body);
    //console.log(loginName+"  "+loginPws);
    let signMenus=[];
    //判断密码是否正确 并返回对象
    if(loginName=="admin"&&loginPwd=="123456"){
        //管理员1
        signMenus=menus.filter(m=>m.sign==1||m.sign==3);
    }
    else if(loginName=="rose"&&loginPwd=="123456"){
        //部门经理2
        signMenus=menus.filter(m=>m.sign==2||m.sign==3);
    }
    else if(loginName=="lisa"&&loginPwd=="123456"){
        //普通员工0
        signMenus=menus.filter(m=>m.sign==0||m.sign==3);
    }
    else{
        return{
            code:0,
            menus:null,
            message:"账号或密码错误",
            token:null,
        }
    }
    return{
        code:200,
        menus:signMenus,
        message:"登录成功",
        token:Mock.Random.guid(),
    }
})


//生成模拟用户数据
let deptList=[];
for(let i=1;i<=12;i++){
    deptList.push(
        Mock.mock({
            id:Mock.Random.guid(),
            num: i,//序号 
            deptName:Mock.Random.ctitle(2, 5)+"部", //部门名称
            governor:Mock.Random.cname(),//主管
        })
    )
}

//拦截部门数据
//拦截axios查询请求
Mock.mock(/dept\/searchDept/,function(params){
    //解析处理链接
    let {pageIndex,key,selectGovernor}= param2Obj(params.url);
    
    //根据查询条件获取需要查询的用户
    let mockData=deptList.filter(item=>{
       return item.deptName.indexOf(key)>=0&&item.governor.indexOf(selectGovernor)>=0;
    })

    //要每页10条
    //开始的序号 (页码-1)*10+1
    let start =(pageIndex-1)*10+1;
    //结束的序号 页码*10
    let end=pageIndex*10;
    //筛选出用户和序号 获取每页的条数范围
    let result= mockData.filter((item,index)=>{
        index=index+1;
        return index>=start&&index<=end;
    })

    //定义一个对象 并返回
    const queryResult={
        code:0,
        message:"",
        data:result,//需要返回的数据
        total:mockData.length//需要返回的数组长度
    }

    return queryResult;
})

//拦截axios新增请求
Mock.mock(/dept\/addDept/,"post",function(addData){
    //JSON.parse 将字符串转化为对象
    //JSON.stringify 将对象转化为字符串
    let deptAdd=JSON.parse(addData.body);
    const deptObj={
        id:Mock.Random.guid(),
        num:deptList.length+1,
        deptName:deptAdd.deptName,
        governor:deptAdd.governor
    }
    deptList.unshift(deptObj); 
})

//拦截axios修改请求
Mock.mock(/dept\/updateDept/,"post",function(updateData){
    let update=JSON.parse(updateData.body);
    let dept=deptList.find(u=>u.id==update.id);

    //将修改的信息重新赋值给对应用户数据
    dept.deptName=update.deptName;
    dept.governor=update.governor;
})

//拦截axios删除请求
Mock.mock(/dept\/removeDept/,"post",function(removeData){
    //根据用户id 找到用户的序号
    let num=deptList.findIndex(u=>u.id==removeData.body);
    //根据序号删除在数组中移除该用户信息
    deptList.splice(num,1);
    
})


