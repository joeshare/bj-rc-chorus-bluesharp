<template>
<div class="chorus-grid">
        <table class="admin-table admin-striped">
            <thead>
            <tr>
                <th>资源名称</th>
                <th>资源类型</th>
                <th>资源用途</th>
                <th>资源描述</th>
                <th>创建人</th>
                <th>创建时间</th>
                <th>配置属性</th>
            </tr>
            </thead>
            <tbody>
            <tr v-if="data&&data.length==0">
                <td  :colspan="7" style="height: 30px;line-height: 30px;text-align: center">暂无数据</td>
            </tr>
            <tr v-for="entry in data" v-else >
                <td :title="entry.resourceName">{{entry.resourceName}}</td>
                <td :title="entry.typeName">{{entry.typeName}} </td>
                <td :title="entry.usageName">{{entry.usageName}}</td>
                <td :title="entry.resourceDesc">{{entry.resourceDesc}}</td>
                <td :title="entry.userName">{{entry.userName}}</td>
                <td :title="entry.createTime">{{entry.createTime}}</td>
                <td></td>
            </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
import AdInput from 'adminUI/components/admin-input';
import {externalResource as externalMockResource} from '../../mock';
export default {
    data(){
       return {
          data:[]
       }
    },
    created() {
        //this.fetchData();
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
          ///api/projectmanagement/externalres
           let _this =this;
           _.ajax({
               url:'/api/projectmanagement/externalres',
               method:'POST',
               data:{
                   projectId:v
               },
               success:function(res){

                       var _data=res.aaData;
                   if(_data&&_data.length){
                       _data.forEach((rec,i)=>{
                           rec.createTime=_.date2String(new Date(rec.createTime),'yyyy-MM-dd hh:mm:ss')
                        })
                   }
                       _this.data=_data;

               },
               error:function(res){

               }
           })

       }
    }
}
</script>
<style lang="scss"></style>