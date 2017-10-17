<template>
<div class="chorus-grid">
        <table class="admin-table admin-striped">
            <thead>
            <tr>
                <th>用户名</th>
                <!--<th>电话</th>-->
                <th>类型</th>
                <th style="text-align: left;">角色</th>
                <!--<th>项目名称</th>-->
            </tr>
            </thead>
            <tbody>
            <tr v-if="data.length==0">
                <td  :colspan="3" style="height: 30px;line-height: 30px;text-align: center">暂无数据</td>
            </tr>
            <tr v-for="entry in data" v-else >
                <td :title="entry.name">{{entry.name}}</td>
                <!--<td :title="entry.mobile">{{entry.mobile}}</td>-->
                <!-- <td></td>-->
                <td :title="entry.userType">{{entry.userType}}</td>
                <td :title="entry.userType">
                    <span v-for="rols in entry.roles">{{rols.name.split("_")[1]}}</br></span>
                   </td>
                <!--<td>{{entry['projectName']}}</td>-->
            </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
import AdInput from 'adminUI/components/admin-input';
import {queryMemberList as queryMockMemberList} from '../../mock';
export default {
    data(){
       return {
          data:[],
           navlist:[{id:1,text:'项目管理',url:''},{id:2,text:'项目管理',url:''}],
       }
    },
    created() {
    },
    props: {
        projectId: {
            type: String,
            default: ''
        }
    },
    watch: {
        projectId (v) {
            this.fetchData(v);
        }
    },
    methods:{
       fetchData(id){
           let _this =this;
           _.ajax({
               url:'/api/projectmanagement/memberinfo',
               method:'POST',
               data:{
                   projectId:id
               },
               success:function(res){
                   if(res.code=="0"){
                       _this.data=res.data;

                   }else{
                       _this.data=[];
                   }
               },
               error:function(res){

               }
           })
       }
    }
}
</script>
<style lang="scss"></style>