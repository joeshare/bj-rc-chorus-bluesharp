<template>
 <div style="height: 100%;">
   <container>
     <div slot="header">
         <div style="display: block;height: 22px;">
             <div class="ion-navicon" @click="changemenu()" style="cursor: pointer; font-size: 24px;
    position: absolute;
    color: rgb(253, 251, 251);  padding: 0px 4px; top: 6px;
    left: 5px;
    z-index: 10;"></div>
             <div class="logo" style="float: left; margin-left: 20px;">Bluesharp  一站式数据服务平台</div>
             <div class="admin" style="float: right; ">
                 当前项目：
                 <ad-sug-input  style="margin-right: 20px;"
                               v-model="projectobj"
                               :associations="projectSelectOptions"
                               :small="true"
                               placeholder=""
                               @click="sugclick"
                               @toggle-select="sugSelectClick"
                               @input="sugChangeInput"
                 ></ad-sug-input>
                 {{userInfo.name}} <div style="display:inline-block;width:50px;font-size:13px;margin-left:10px;cursor:pointer; line-height: 25px;" @click="logout()">退出</div></div>
         </div>
     </div>
     <div slot="sidebar">
         <nav-menu :menu-items="menus" @admin-menu-select="getUrl"></nav-menu>
     </div>
     <div slot="content">
      <Pannel class="chorus-main">
        <router-view class="page"></router-view>
      </Pannel>
     </div>
   </container>
 </div>
</template>
<style>
body {
  font-family: Helvetica, sans-serif;
}

@keyframes menuactionshow
{
    from {min-width: 200px;width:15%;
    }
    to {min-width: 1px;width:1px; overflow: hidden;}
}

@-webkit-keyframes menuactionshow
{
    from {min-width: 200px;width:15%;
    }
    to {min-width: 1px;width:1px; overflow: hidden;}
}
.showmenus {
   /* animation: menuactionshow 0.3s;*/
    min-width:1px !important; width:1px !important; overflow: hidden;
}
.admin-page-sidebar div{min-width:200px;}

.menusbutton{
    background-color: #fff;
}

.admin-page-sidebar{ overflow-y: auto; overflow-x: hidden;}
</style>

<script>
  import Container from "./admin-ui/components/admin-page-container.vue"
  import Pannel from "./admin-ui/components/admin-pannel.vue"
  import adSelect from './admin-ui/components/admin-select'
  import AdSugInput from './admin-ui-extend/components/admin-input-custom.vue';
  import navMenu from 'adminUI/components/admin-menu';
  export default {
    data(){
      return {
        userInfo:{},
          projectobj:"",
          projectSelectOptions: [],
          projectSelectOptionsInit: [],
          menus:[]
      }
    },
    methods:{
      setCurrentProjectInfo(prom){
          _.currentProjectCode.set(prom.projectCode)
          _.currentProjectId.set(prom.projectId)
          _.currentProjectOwner.set(prom.userName)
          _.currentProjectInfo.set(prom)
      },
      logout(){
            _.ajax({
                url:'/api/logout',
                method:'POST',
                complete:function(){
                   //window.location.href='/login.html';
                }
            });
            window.location.href='/login.html';
      },
      changemenu(){

            if($('.admin-page-sidebar').hasClass('showmenus')){
                $('.admin-page-sidebar').removeClass('showmenus');

            }else {
                $('.admin-page-sidebar').addClass('showmenus');

            }
             _.appResize();
      },
        sugclick(){
            var showobj =[];
            this.projectSelectOptionsInit.forEach((substr,i)=>{
                if(i<11)
            {
                showobj.push(substr);
            }
            });
            this.projectSelectOptions=JSON.parse(JSON.stringify(showobj));
        },
        sugChangeInput(v)
        {
             var subobj =  this.projectSelectOptionsInit.filter((fliter)=>
            {
                return  fliter.text.indexOf(v)>-1
            });
            var showobj =[];
            subobj.forEach((substr,i)=>{
                if(i<11)
                {
                    showobj.push(substr);
                }
            });
            this.projectSelectOptions=JSON.parse(JSON.stringify(showobj));
        },
        sugSelectClick(rec){
            let _this = this;
             _this.setCurrentProjectInfo(rec.value);
            _this.projectobj =rec.value;
                _.ajax({
                    url:'/api/projectmanagement/changeproject',
                    method:'POST',
                    data:rec.value,
                    success:function(res){
                        if(res&&res.code==0){
                            window.location.href="#/projectmanagement"+'?'+Math.random()*10000;;
                        }


                        _this.creatmenu(true,rec);
                    }
                });
        },
        getUrl (item) {
            item.url&&this.$router.push(item.url)
        },
        creatmenu(isasync,item)
        {
            console.log('creatmenu')
            var postobje={};
            if(item)
            {postobje ={valueobje:JSON.stringify(item)};

            }
            let _this = this;
            _.ajax({
                url:'/api/getMenus',
                async: isasync,
                method:'post',
                data:postobje,
                success:function(res){
                    if(res&&!res.code){
                        _this.menus = res.data.menus;
                    }
                }
            })
        }
    },
    created() {
        this.menus = _.navMenus.get();

          let _this=this;
           //用户信息
          _.ajax({
            url:'/api/getUserInfo',
            method:'POST',
            success:function(res){
               if(res&&res.code==0){
                  _this.userInfo=res.data;
                  _.currentUserInfo.set(res.data)
               }
            }
          });

        _.ajax({
            url:'/api/projectmanagement/selectlist',
            method:'POST',
            async:false,
            data:{
                pageNum:1,
                pageSize:100
            },
            success:function(res){
                if(res.code=="0"){

                    let currentArry = [];
                    let initArray=[];
                    res.data.list.forEach((prom,i)=>{

                        var interobj ={
                            value:prom,
                            text: prom.projectName
                        };
                    if(prom.active)
                    {
                        _this.setCurrentProjectInfo(prom);
                        _this.projectobj=prom.projectName;
                    }

                   if(i<11)
                    {
                        currentArry.push(interobj);
                    }
                    initArray.push(interobj);
                    console.log('initArray',initArray)
                });
                _this.projectSelectOptions=currentArry;
                _this.projectSelectOptionsInit=initArray;
                }
            },
            error:function(res){

            }
        })


    },
    components:{Container,Pannel,adSelect,AdSugInput,navMenu}
  }
</script>