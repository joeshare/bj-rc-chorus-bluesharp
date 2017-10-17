<template>
<div class="chorus-grid">
        <div style="border-bottom-width: 1px;
                        border-bottom-style: solid;
                        border-bottom-color: rgb(229, 229, 229);
                        height: 48px;
                        line-height: 48px;
                        text-align: left;
                        margin: 0 0 20px 0;">
            已分配资源：CPU：{{baseInfo.resourceCpu}}&nbsp;C&nbsp;&nbsp;&nbsp;&nbsp;内存：{{baseInfo.resourceMemory}}&nbsp;G&nbsp;&nbsp;&nbsp;&nbsp;存储：{{baseInfo.resourceStorage}}&nbsp;G
        </div>
        <table class="admin-table admin-striped">
            <thead>
            <tr>
                <th>容器名称</th>
                <th>容器模版</th>
                <th>容器环境</th>
                <th>容器数量</th>
                <th>容器状态</th>
            </tr>
            </thead>
            <tbody>
            <tr v-if="!data.length||data.length==0">
                <td  :colspan="5" style="height: 30px;line-height: 30px;text-align: center">暂无数据</td>
            </tr>
            <tr v-for="entry in data" v-else >
                <td :title="entry.groupName">{{entry['groupName']}}</td>
                <td :title="entry.cpuMemory">{{entry.cpuMemory}} </td>
                <td :title="entry.environmentInfoListNameVersion">{{entry.environmentInfoListNameVersion}}</td>
                <td :title="entry.instanceSize">{{entry['instanceSize']}}</td>
                <td :title="entry.commonStatus.statusName">{{entry['commonStatus']['statusName']}}</td>
            </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
import AdInput from 'adminUI/components/admin-input';
import {queryResourceConfig as queryMockResourceConfig,queryResCfgBaseInfo as queryMockResCfgBaseInfo} from '../../mock';
export default {
    data(){
       return {
          data:[],
          baseInfo:{
           "resourceCpu":"-",
           "resourceMemory":"-",
           "resourceStorage":"-"
          }

       }
    },
    created() {
            this.fetchData();

    },
    props: {
        projectId: {
            type: Number,
            default: 0
        }
    },
    watch: {
        projectId (v) {
            this.fetchData(v);
        }
    },
    methods:{
       fetchData(v){
           if(!v){
             return;
           }
           let _this =this;

           _.ajax({
               url:'/api/projectmanagement/rescfg',
               method:'POST',
               data:{
                   projectId:v
               },
               success:function(res){
                   if(res.code=="0"){
                       let _data=res.data;
                       _this.data=_data;

                   }else{
                       _this.data=[];
                   }
               },
               error:function(res){

               }
           })

           this.baseInfo={
               "resourceCpu":"-",
               "resourceMemory":"-",
               "resourceStorage":"-"
           };
           _.ajax({
               url:'/api/projectmanagement/getleft',
               method:'POST',
               data:{
                   projectId:v
               },
               success:function(res){
                   if(res.code=="0"){
                       $.extend(_this.baseInfo,res.data);
                   }
               }
           })
       }
    }
}
</script>
<style lang="scss"></style>