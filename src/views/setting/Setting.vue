<template>
  <div class="search">
    <div class="search-setting">
      <el-select clearable v-model="year" placeholder="请选择年份">
        <el-option
          v-for="y in yearArr"
          :key="y"
          :value="y"
          :label="y + '年'"
        ></el-option>
      </el-select>
      <el-select clearable v-model="month" placeholder="请选择月份">
        <el-option
          v-for="m in 12"
          :key="m"
          :value="m"
          :label="m + '月'"
        ></el-option>
      </el-select>
      <el-button class="btn" type="success" @click="searchClick">显示</el-button>
      <el-button class="btn" type="danger" @click="SaveClick"
        >保存</el-button
      >
    </div>
    <el-table :data="settingList" stripe style="width: 100%" height="90%">
      <el-table-column prop="Date" label="日期">
        <template slot-scope="scope">
          {{date(scope.row.Date,"yyyy-mm-dd")}}
        </template>
      </el-table-column>
      <el-table-column label="星期"> 
        <template slot-scope="scope">
          {{weekProcessing(scope.row.Date)}}
        </template>
      </el-table-column>
      <el-table-column prop="Status" label="状态">
        <template slot-scope="scope">
          <el-select v-model="scope.row.Status">
            <el-option :value="0" label="默认"></el-option>
            <el-option :value="1" label="休假"></el-option>
            <el-option :value="2" label="上班"></el-option>
          </el-select>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { searchSettingInfo,SaveSettingInfo } from "api/settingData";
import { dateProcessing } from "utils/dateTool";
export default {
  data() {
    return {
      yearArr: [1986, 2020, 2021, 2022, 2023, 2024, 2025],
      year: (new Date()).getFullYear(),
      month: (new Date()).getMonth() + 1,
      settingList: [],
    };
  },
  mounted() {
    //加载时查询当前时间数据
    this.querySetting();
  },
  methods: {
    //显示
    searchClick() {
      this.querySetting();
    },
    //保存
    SaveClick() {
      SaveSettingInfo({ year: this.year, month: this.month ,date:JSON.stringify(this.settingList)}).then(res=>{
          console.log(res.data.message);
          this.$message(res.data.message);
      }).catch(err=>{
        //保存失败提示
        this.$message.error(err.data.message);
      })
    },
    //查询
    querySetting() {
      searchSettingInfo({ year: this.year, month: this.month }).then((res) => {
        console.log(res);
        this.settingList = res.data.data;
      });
    },
    //星期处理
    weekProcessing(time){
      let dateList = ['星期日','星期一','星期二','星期三','星期四','星期五','星期六',]
      return dateList[new Date(time).getDay()];
    },
    //日期处理
    date(time,type){
       return dateProcessing(time,type)
    }
  },
};
</script>

<style lang="less" scoped>
.search{
  height: 90%;
}
.search-setting{
  width: 60%;
  margin: 0px auto;
  margin-bottom: 20px;
  .el-select{
    margin-right: 15px;
    width: 30%;
  }
}
</style>
