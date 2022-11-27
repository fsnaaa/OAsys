<template>
    <el-upload
        class="upload-demo"
        ref="upload"
        action="#"
        :multiple="false"
        :limit="1"
        :on-exceed="handleExceed"
        :on-change="fileChange"
        :auto-upload="false">
        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
        <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
        <div slot="tip" class="el-upload__tip">只能上传Excel文件,且不超过10M</div>
    </el-upload>
</template>

<script>
import { uploadExcel } from "api/attManagerData";
export default {
    data() {
      return {
        fileList: []
      };
    },
    methods: {
      handleExceed(){
        this.$message({
            showClose: true,
            message: '只能选择一个文件',
            type: 'error'
        });
      },
      submitUpload() {
        //this.$refs.upload.submit();
        //非空判断
        if(this.fileList.length<=0){
            this.$message({
                showClose: true,
                message: '请选择需要上传的文件',
                type: 'error'
            });

            return ;
        }

        //将上传的文件转化为FormData类型
        let formData=new FormData();
        formData.append('file',this.fileList[0].raw);
        //console.log(formData);

        //网络请求传参
        uploadExcel(
            formData,
            {'Content-Type':"multipart/form-data"}
        ).then(res=>{
            //console.log(res);
            //this.fileList.splice(this.fileList[0],1);
        })
      },
      fileChange(file,list){
        console.log(file);
        //保存满足要求的文件
        this.fileList=list;
        let rIndex=list.indexOf(file);
        
        let index= file.name.lastIndexOf(".");
        let type= file.name.substring(index+1);

        //验证文件类型 必须是(xls、xlsx)后缀
        if(["xls","xlsx"].indexOf(type)<0){
            this.$message({
                showClose: true,
                message: '只能上传Excel文件',
                type: 'error'
            });

            //删除数组中不满足条件的文件
            this.fileList.splice(rIndex,1);

            return false;
       }

       //验证文件大小
       let size= file.size/1024/1024;
       if(size>10){
            this.$message({
                showClose: true,
                message: '上传Excel文件,不能超过10M',
                type: 'error'
            });

             //删除数组中不满足条件的文件
             this.fileList.splice(rIndex,1);
       }
      }
    }
}
</script>

<style>

</style>