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
  
//生成模拟数据
let list=[];
for(let i=0;i<=200;i++){
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

//拦截axios查询请求
Mock.mock(/user\/userQuery/,function(params){
    //解析处理链接
    let {pageIndex,key}= param2Obj(params.url);
    console.log(pageIndex+" "+key)
    //根据查询条件获取需要查询的用户
    let mockData=list.filter(item=>{
       return item.name.indexOf(key)>=0||item.address.indexOf(key)>=0;
    })

    //开始的序号 (页码-1)*10+1
    let start =(pageIndex-1)*10+1;
    //结束的序号 页码*10
    let end=pageIndex*10;
    //筛选出用户和序号
    let result= mockData.filter((item,index)=>{
        index=index+1;
        return index>=start&&index<=end;
    })

    const queryResult={
        code:0,
        message:"",
        data:result,
        total:mockData.length
    }

    return queryResult;
})

//拦截axios新增请求
Mock.mock(/user\/userAdd/,"post",function(addData){
    let add=JSON.parse(addData.body);
    add.id=Mock.Random.guid();
    list.unshift(add); 
})

//拦截axios修改请求
Mock.mock(/user\/updateUser/,"post",function(updateData){
    let update=JSON.parse(updateData.body);
    let user=list.find(u=>u.id==update.id);

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