<template>
  <div class="item" v-if="item!=null&&Object.keys(item).length>0">
    <div class="date">
        {{getDayNum(item.Date)}}
    </div>
    <div :class="['status',statusColor]">
        {{item.Status}}
    </div>
  </div>
</template>

<script>
export default {
    props:{
        item:{
            type:Object,
            default(){
                return {}
            }
        }
    },
    computed:{
        statusColor(){
            if(!this.item||!this.item.Status)
                return "";
            else if(this.item.Status=="休假")
                return "holiday"
            else if(this.item.Status=="正常")
                return "OK"
            else if(this.item.Status=="旷工")
                return "error"
            else if(this.item.Status.indexOf("迟到")>=0||this.item.Status.indexOf("早退")>=0)
                return "except"
        }
    },
    methods:{
        getDayNum(d){
            if(!d){
                return "";
            }
            let t=new Date(d);
            return t.getDate();
        }
    }

}
</script>

<style lang="less" scoped>
.item{
    margin: 0px;
    padding: 0px;
    display: flex;
    justify-content: space-evenly;
    text-align: center;
    height: 80px;
    line-height: 80px;
    width: 100%;
    .date{
        width: 30%;
        font-size: 28px;
        font-weight: bolder;
        margin: 0px;
        padding: 0px;
    }
    .status{
        margin: 0px;
        padding: 0px;
        width: 70%;
        color: white;
    }
}

.holiday{
    background-color:#969696;
}
.OK{
    background-color:#4fbd91;
}
.error{
    background-color:#c5221f;
}
.except{
    background-color:#ffb417;
}
</style>