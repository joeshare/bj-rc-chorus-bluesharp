/**
 * Created by AnThen on 2017-3-3.
 */
import AdInput from '../../admin-ui-extend/components/admin-input-edit.vue';
import adSelect from 'adminUI/components/admin-select.vue';
import AdModal from 'adminUI/components/admin-modal.vue';
import Paginator from 'adminUI/components/admin-paginator.vue';
import Toast from 'adminUI/components/admin-toast/index';
import navBar  from '../../admin-ui-extend/components/admin-navbar.vue';
import Tree  from '../../admin-ui-extend/components/admin-tree.vue';
import MessageBox from 'adminUI/components/admin-message-box/index';
import adSpinner from 'adminUI/components/admin-spinner'

import {tabs, activeTabId} from  './tabs.js';
const hasReg=/^\s+$/;
import CONSTANT from  'Utils/constant';

export default {
    components: {
        AdInput,
        AdModal,
        Paginator,
        adSelect,
        Toast,
        navBar,
        Tree,
        adSpinner
    },
    data () {
        let _this=this;
        return {
            navlist:[{id:1,text:'数据模型管理',url:''},{id:2,text:'标签模型',url:'#/impromptuquery'}],
            datahsy:[],
            totalCounthsy: 0,
            pageSizehsy: CONSTANT.pageSize,
            currentPagehsy: 1,
            createClassType:0,//0根分类 1子分类
            currentClass:null,
            currentTag:{name: "",tagCode: "",tagDec: "",tagName: ""},
            treedata:[],
            treetitle:'',
            treedesc:'无项目情况下标签不可用',
            showrootcreate:true,
            rootname:"",
            ajaxsending:false,
            showloading:false,
            modalDisplay: false,
            modalTitle:'创建根分类',
            modalButtons:[{
                text: '取消',
                buttonClass:'ad-auxiliary admin-small',
                name: 'cancel'
            }, {
                text: '确定',
                name: 'ok',
                buttonClass:'admin-small admin-buttom-ok',
                handler(){
                    //return true 表示不关闭弹窗

                    if(_this.validaterootname())
                    {
                        let projectInfo=_.currentProjectInfo.get();
                        if(!_this.ajaxsending){
                            $('.admin-buttom-ok').addClass('chorus-btn-disabled');
                            _this.ajaxsending=true;
                            _.ajax({
                                url:'/api/tagmodel/addtagclass',
                                method:'POST',
                                data:{
                                    projectCode: projectInfo.projectCode,
                                    parentCode:_this.currentClass?_this.currentClass.id: projectInfo.projectCode,
                                    tagClassifyName: _this.rootname,
                                    isRootTag: !_this.createClassType?0:1
                                },
                                success:function(res){
                                    _this.ajaxsending=false;
                                    if(res.code=="0"){
                                        _this.modalDisplay = false;
                                        _this.initTree();
                                    }
                                    else{
                                        Toast({
                                            message: '添加失败！',
                                            duration: 1500,
                                            iconClass: 'ion-alert',
                                            iconColor: '#e5af51'
                                        })
                                    }
                                }
                            })
                        }

                    }
                    return true;
                }
            } ],
            rootnameWarnings:null,
            tagname:"",
            tagdesc:"",
            tagDisplay: false,
            tagTitle:'添加标签',
            tagButtons:[{
                text: '取消',
                buttonClass:'ad-auxiliary admin-small',
                name: 'cancel'
            }, {
                text: '确定',
                name: 'ok',
                buttonClass:'admin-small admin-buttom-ok',
                handler(e){

                    //return true 表示不关闭弹窗
                    if(_this.validateTagName())
                    {
                        let projectInfo=_.currentProjectInfo.get();
                        if(!_this.ajaxsending) {
                            $('.admin-buttom-ok').addClass('chorus-btn-disabled');
                            _this.ajaxsending = true;
                            _.ajax({
                                url: '/api/tagmodel/addtag',
                                method: 'POST',
                                data: {
                                    projectCode: projectInfo.projectCode,
                                    parentCode: _this.currentClass ? _this.currentClass.id : '0',
                                    tagName: _this.tagname,
                                    tagDec: _this.tagdesc
                                },
                                success: function (res) {
                                    _this.ajaxsending = false;
                                    if (res.code == "0") {
                                        _this.tagDisplay = false;
                                        _this.initTree();
                                    }
                                    else {
                                        Toast({
                                            message: '添加失败！',
                                            duration: 1500,
                                            iconClass: 'ion-alert',
                                            iconColor: '#e5af51'
                                        })
                                    }
                                }
                            })
                        }
                    }
                    return true;
                }
            } ],
            tagnameWarnings:null,
            tagdescWarnings:null,

            tagvaluename:"",
            tagvaluelist:["测试一个","测二","测三"],
            tagvalueDisplay: false,
            tagvalueTitle:'添加标签项',
            tagvalueButtons:[{
                text: '取消',
                buttonClass:'ad-auxiliary admin-small',
                name: 'cancel'
            }, {
                text: '确定',
                name: 'ok',
                buttonClass:'admin-small admin-buttom-ok',
                handler(e){


                    //return true 表示不关闭弹窗
                    if(_this.tagvaluelist.length>0)
                    {

                        let projectInfo=_.currentProjectInfo.get();
                        if(!_this.ajaxsending) {
                            $('.admin-buttom-ok').addClass('chorus-btn-disabled');
                            _this.ajaxsending = true;
                            _.ajax({
                                url: '/api/tagmodel/addtagvalue',
                                method: 'POST',
                                data: {
                                    "projectCode":projectInfo.projectCode,
                                    "tagCode": _this.currentTag.id,
                                    "tagValue": JSON.stringify(_this.tagvaluelist)
                                },
                                success: function (res) {
                                    _this.ajaxsending = false;
                                    if (res.code == "0") {
                                        _this.tagvalueDisplay = false;
                                        _this.fetchDatahsy(1);
                                    }
                                    else {
                                        Toast({
                                            message: '添加失败！',
                                            duration: 1500,
                                            iconClass: 'ion-alert',
                                            iconColor: '#e5af51'
                                        })
                                    }
                                }
                            })
                        }

                    }
                    else{
                        _this.tagnamevalueWarnings=['请添加标签项后按回车。'];
                    }
                    return true;
                }
            } ],
            tagnamevalueWarnings:null
        }
    },
    created() {
        this.initTree();
        // this.fetchDatahsy(1);
    },

    methods: {
        //历史分页相应事件
        togglePagehsy(indexPage){
            this.fetchDatahsy(indexPage)
        },
        //加载树
        initTree(){
            let _this=this;
            let projectInfo=_.currentProjectInfo.get();

            if(!projectInfo){
                this.showrootcreate=false;
                MessageBox({
                    message:'当前没有项目，是否现在创建项目？',
                    type: 'confirm',
                    confirm () {
                        window.location.href="#/projectmanagement"+'?'+Math.random()*10000;;
                    }
                })
                return false;
            }
            _this.treetitle ="请稍后。。"
            _this.treedesc ="标签树加载中"
            _this.treedata = [];
            _.ajax({
                url:'/api/tagmodel/taglist',
                method:'POST',
                data:{
                    projectCode: projectInfo.projectCode
                },
                success:function(res){
                    _this.treetitle ="创建根分类"
                    _this.treedesc ="目前无根分类，请先创建根分类"
                    if(res.code=="0"&&res.data){
                        _this.treedata = res.data;
                       // _this.$nextTick(()=>{
                            _this.transformdata(_this.treedata);
                       // })

                        var recurFunc = (data) =>{
                            data.forEach(function (i) {
                                if (i.id == _this.currentTag.id) {
                                    i.clickNode = true;
                                } else {
                                    i.clickNode = false;
                                }
                                if (i.children) {
                                    recurFunc(i.children);
                                }
                            })
                        }
                        recurFunc(_this.treedata);
                    }
                }
            })
           // this.transformdata(this.treedata);
        },
        //历史查询列表数据
        fetchDatahsy(curPage){
            let _this=this;
            let projectInfo=_.currentProjectInfo.get();
              _.ajax({
             url:'/api/tagmodel/gettagvalue',
             method:'POST',
             data:{
                projectCode:projectInfo.projectCode,
                tagCode:this.currentTag.id,
                pageNum:curPage,
                pageSize:this.pageSizehsy
             },
             success:function(res){
                 if(res.code=="0"){

                     _this.datahsy = res.data.list;
                     _this.totalCounthsy =res.data.total;
                     _this.currentPagehsy = curPage;
                 }
             }
             })
        },
        nodeClick:function(m){
            this.currentTag =m;

            this.fetchDatahsy(1);
        },
        // 点击展开收起
        expandClick:function(m){
          /*  console.log(JSON.parse(JSON.stringify(m)));
            // 点击异步加载
            if(m.isExpand) {
                // 动态加载子节点, 模拟ajax请求数据
                // 请注意 id 不能重复哦。
                if(m.hasOwnProperty("children")){

                    m.loadNode = 1; // 正在加载节点
                    setTimeout(()=>{

                        m.loadNode = 2; // 节点加载完毕
                        m.isFolder = !m.isFolder;
                        var node = JSON.parse(JSON.stringify(m));
                        // 动态加载子节点, 模拟ajax请求数据
                        // 请注意 id 不能重复哦。
                        if(node.hasOwnProperty("children")){
                            node.children.push({
                                id:+new Date(),
                                name:"动态加载节点1",
                                path:"",
                                clickNode:false,
                                isFolder:false,
                                isExpand:false,
                                loadNode:0,
                                children:[{
                                    id:+new Date()+1,
                                    name:"动态加载末节点",
                                    path:"",
                                    clickNode:false,
                                    isFolder:false,
                                    isExpand:false,
                                    loadNode:0
                                }]
                            });

                            m.children = node.children;
                        }

                    },1000)

                }
            }*/

        },
        seletedClick:function (m,option) {
            this.currentClass = m;
            console.log('thisclass',this.currentClass)
            if(option.value==2)
            {
                this.createTag();
            }
            else{
                this.createRootTree('sub');

            }
        },
        createRootTree:function (type) {
            // this.clearCurrentRecoder();
            if(type=='sub')
            {
                this.createClassType =1;
                this.modalTitle='添加子分类';
            }
            else {
                this.createClassType =0;
                this.modalTitle='创建根分类';
            }
            this.modalDisplay=true;
            this.rootname = "";
            this.rootnameWarnings=null;
            $('.admin-buttom-ok').removeClass('chorus-btn-disabled');
        },
        createTag:function () {
            this.tagDisplay=true;
            this.tagname = "";
            this.tagdesc = "";
            this.tagnameWarnings =null;
            $('.admin-buttom-ok').removeClass('chorus-btn-disabled');

        },
        //前端删除标签值
        deleteTagvalue:function (m) {
            let newlist = [];
            this.tagvaluelist.forEach((un)=>{
                if(m!=un){
                    newlist.push(un);
                }
            })
            this.tagvaluelist =newlist;
        },
        //真实删除标签值
        dropTagvalue:function (m) {
            let _this=this;
            MessageBox({
                message:'是否要删除此标签项？',
                type: 'confirm',
                confirm () {
                    let projectInfo=_.currentProjectInfo.get();
                    _.ajax({
                        url:'/api/tagmodel/droptagvalue',
                        method:'POST',
                        data:{
                            projectCode:projectInfo.projectCode,
                            tagValueCode:m.tagValueCode
                        },
                        success:function(res){
                            if(res.code=="0"){
                                //_this.transformdata(res.data.list.treedata);
                                _this.fetchDatahsy(1)
                            }
                            else{
                                Toast({
                                    message: '删除失败！',
                                    duration: 1500,
                                    iconClass: 'ion-alert',
                                    iconColor: '#e5af51'
                                })
                            }
                        }
                    })
                    //handler&&handler();
                }
            })



        },
        //添加标签值，回车处理
        addTagvalue:function (value,event) {
            this.tagnamevalueWarnings=null;
            value = value.trim();
            if(event.keyCode==13){
                if(this.validateTagValueName(value))
                {
                    this.deleteTagvalue(value);
                    this.tagvaluelist.unshift(value);
                    this.tagvaluename ="";
                }
            }
        },
        clearTagWarn(){
            this.tagnameWarnings =null;
        },
        clearClassWarn(){
            this.rootnameWarnings=null;
        }
        ,
        //验证分类名称
        validaterootname(){

            var rootname = this.rootname;
            var f=!hasReg.test(rootname) && rootname !== '';
            if(!f){
                this.rootnameWarnings=['请输入分类名称'];
            }else if(!/^([a-zA-Z]|_|[\u2E80-\u9FFF])+([a-zA-Z]|-|_|[\u2E80-\u9FFF]|[0-9])*$/.test(rootname)){
                f=false;
                this.rootnameWarnings=['必须是以中文字母数字、中划线和下划线组成,字母、下划线或中文开头,且不能为空或空格符'];
            }else{

                let strClass = '';
                if(this.createClassType==0)
                {
                    this.treedata.forEach((treenode)=>{
                        strClass+=treenode.tagClassifyName+','
                    })
                }
                else {
                    if(this.currentClass.subTagClassifyList)
                    {
                        this.currentClass.subTagClassifyList.forEach((m)=>{
                            strClass+=m.tagClassifyName+','
                        })
                    }
                }
                if(strClass.indexOf(rootname+',')>-1)
                {
                    f=false;
                    this.rootnameWarnings=['此分类已存在'];
                }
            }


            return f;
        },
        //验证标签值
        validateTagValueName(v){

            var f=!hasReg.test(v) && v !== '';
            if(!f){
                this.tagnamevalueWarnings=['标签项不能为空'];
            }else if(!/^([a-zA-Z]|-|_|[\u2E80-\u9FFF]|[0-9])+$/.test(v)){
                f=false;
                this.tagnamevalueWarnings=['必须是以中文字母数字、中划线和下划线组成，且不能为空或空格符'];
            }
            return f;
        },
        //验证标签
        validateTagName(){

            var tagname = this.tagname;
            var f=!hasReg.test(tagname) && tagname !== '';
            if(!f){
                this.tagnameWarnings=['请输入标签名称'];
            }else if(!/^([a-zA-Z]|_|[\u2E80-\u9FFF])+([a-zA-Z]|-|_|[\u2E80-\u9FFF]|[0-9])*$/.test(tagname)){
                f=false;
                this.tagnameWarnings=['必须是以中文字母数字、中划线和下划线组成，字母、下划线或中文开头,且不能为空或空格符'];
            }else {


                let strTagarray = "";
                if (this.currentClass.tagList) {
                    this.currentClass.tagList.forEach((m)=> {
                        strTagarray += m.tagName + ','
                    })
                }

                if (strTagarray.indexOf(tagname + ',') > -1) {
                    f = false;
                    this.tagnameWarnings = ['此标签已存在'];
                }
            }
            return f;
        },
        //新建标签项目按钮
        createtagvlaue:function () {
            this.tagvalueDisplay=true;
            this.tagvaluename = "";
            this.tagvaluelist = [];
            $('.admin-buttom-ok').removeClass('chorus-btn-disabled');
        },
        //数据格式转换成通用组件格式
        transformdata:function (datalist) {
            if(datalist.length>0){
                datalist.forEach((m)=>{
                    if(!m.subTagClassifyList&&!m.tagList){
                        if(m.tagClassifyCode)
                        {
                            m.id= m.tagClassifyCode;
                            m.name = m.tagClassifyName;
                            m.children=[];
                        }
                        else {
                            m.id= m.tagCode;
                            m.name = m.tagName;
                        }
                    }else if(m.tagList&&m.subTagClassifyList)
                    {
                        m.id= m.tagClassifyCode;
                        m.name = m.tagClassifyName;
                        m.children=m.subTagClassifyList.concat(m.tagList);
                        this.transformdata(m.children);
                    }
                    else if(m.tagList&&!m.subTagClassifyList){
                        m.id= m.tagClassifyCode;
                        m.name = m.tagClassifyName;
                        m.children=m.tagList;
                        this.transformdata(m.children);
                    }else if(m.subTagClassifyList){
                        m.id= m.tagClassifyCode;
                        m.name = m.tagClassifyName;
                        m.children=m.subTagClassifyList;
                        this.transformdata(m.children);
                    }
                })
            }
            else{
                datalist=[];
            }
        }
    }
}