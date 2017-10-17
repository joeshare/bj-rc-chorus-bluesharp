/**
 * Created by AnThen on 2017-2-28.
 */
import VueRouter from "vue-router";
const routes = [
    {
        path:'/projectmanagement',component:resolve => require(["../modules/projectManagement/index.vue"], resolve)
    },
    {
        'path':'/entitymodel',component:resolve => require(["../modules/entitymodel/index.vue"], resolve)
    },
    {
        'path':'/relationmodel',component:resolve => require(["../modules/relationmodel/index.vue"], resolve)
    },
    {
        'path':'/tagmodel',component:resolve => require(["../modules/tagManagement/index.vue"], resolve)
    },
    {
        'path':'/queryvisualization/desc/:type/:Id',component:resolve => require(["../modules/queryVisualization/index.vue"], resolve)
    },
    {
        'path':'/queryvisuallist',component:resolve => require(["../modules/queryVisualizationlist/index.vue"], resolve)
    },
    {
        'path':'/queryvisualization/guide',component:resolve => require(["../modules/queryvisualization/guide/index.vue"], resolve)
    }
];


function getRouterArr(){
    let main=[];
    let sub=[];
    routes.forEach(o=>{
        let path=o.path;
        if(/^(\/[^\/]+){2,}$/.test(path)){
            sub.push(path)
        }else{
            main.push(path)
        }

    })
    return {
        main,
        sub
    };
}
function getDefaultProjectInfo(){
    let defaultProjectInfo=window.localStorage.getItem('defaultProjectInfo')
    let changeproject=null;
    try{
        changeproject=JSON.parse(defaultProjectInfo);
    }catch(e){
        // console.log('route beforeEach defaultProjectInfo error')
    }
    return changeproject;
}
const routerPathMap=getRouterArr();
const routerMainPathArr=routerPathMap.main;
const routerSubPathArr=routerPathMap.sub;

const router = new VueRouter({
    routes
});
router.beforeEach((to, from, next)=>{
    let path=to.path,
        pathArr=[],
    //路由是否正确
        isRouterRight=false,
    //是否有子路由
        hasSubRouter=false;
    path.replace(/^(\/[^\/\:]+){2,}$/, function(r){

        console.log('-----------pg--');
        pathArr=r.split("/");
        hasSubRouter=true;
        return r;
    })

    console.log('pathArrpathArr',pathArr);
    if(pathArr&&pathArr.length>0){
        path="/"+pathArr[1];
    }
    let data={};
    //console.log('_.isFirsEntryRouteHook',_.isFirsEntryRouteHook)
    if(_.isFirsEntryRouteHook){
        try{
            let dfaultProjectInfo=getDefaultProjectInfo();
            if(dfaultProjectInfo){
                data={valueobje:JSON.stringify({value:dfaultProjectInfo,
                    text:dfaultProjectInfo.projectName})}
            }
        }catch (e){
            console.log('valueobje JSON error')
        }
        _.isFirsEntryRouteHook=false;
    }
    if(hasSubRouter){
        for(let spath of routerSubPathArr){
            //目前最多的是2级路由
            let tmpArr= [];
            spath.replace(/^(\/[^\/]+){2,}$/, function(r){
                tmpArr=r.split("/");
                return r;
            })
            let tmpStr_clone = JSON.parse(JSON.stringify(tmpArr));
            let tmpStr= tmpStr_clone.splice(0,3).join("/");

            let pathArr_clone  = JSON.parse(JSON.stringify(pathArr));
            let pathArrStr= pathArr_clone.splice(0,3).join("/");
 
            if(tmpStr==pathArrStr&&tmpArr.length==pathArr.length){
                isRouterRight=true;
                break;
            }
        }
    }else{
        isRouterRight=routerMainPathArr.indexOf(path)>-1;
    }

    let _this = this;
    _.ajax({
        url:'/api/getMenus',
        async: false,
        method:'post',
        success:function(res){
            var hash="/projectmanagement";
            if(res&&!res.code){
               _.navMenus.set(res.data.menus)
               //this.$parent.menus=res.data.menus;
                console.log('isRouterRight',isRouterRight)
               if(!isRouterRight){
                    return next({path:hash});
              }else if(res.data.resource_codes.indexOf(path)>-1){
                   hash=to.path;
              }
            }
            //window.location.hash=hash;
            next();
        },
        error:function(){
            window.location.hash="/";
            next();
        }
    })
})


module.exports = router;