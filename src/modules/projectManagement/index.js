/**
 * Created by AnThen on 2017-3-3.
 */
import AdInput from 'adminUI/components/admin-input';
import AdModal from 'adminUI/components/admin-modal';
import MemberList from './components/memberInfo/index.vue';
import ResourceList from './components/resourceConfig/index.vue';
import ExternalList from './components/externalResource/index.vue';
import AdPaginator from 'adminUI/components/admin-paginator.vue';
import {queryTableData as queryMockTableData } from  './mock.js';
import Toast from 'adminUI/components/admin-toast/index';
import {tabs, activeTabId} from  './tabs.js';
import navBar  from '../../admin-ui-extend/components/admin-navbar.vue';
import CONSTANT  from 'Utils/constant';
import MessageBox from 'adminUI/components/admin-message-box/index';
const hasReg=/^\s+$/;
export default {
    components: {
        AdInput,
        AdModal,
        MemberList,
        ResourceList,
        ExternalList,
        AdPaginator,
        navBar,
        Toast,
        'adTabs':resolve => require(['adminUI/components/admin-tabs'], resolve)
    },
    data () {
        let columns=[
            {code:'name',text:'项目名称'},
            {code:'code',text:'项目编码'},
            {code:'describe',text:'项目描述'},
            {code:'responsible',text:'项目负责人/电话'},
            {code:'createTime',text:'创建时间'}
        ];
        let _this=this;
        return {
            navlist:[{id:1,text:'项目管理',url:''},{id:2,text:'项目管理',url:''}],
            data:[],
            totalCount: 0,
            pageSize:CONSTANT.pageSize,
            currentPage: 1,
            resFlag:true,
            validateResult:true,
            tabs,
            activeTabId,
            columns,
            modalTitle:'创建项目',
            modalType:'add',
            warnings: '必填项',
            triggerValue: false,
            projectCodeWarnings:null,
            projectNameWarnings:null,
            projectDescWarnings:null,
            currentRecoder:{
                "createTime": "",//没有
                "createUserId": "",
                "createUser": "",//没有
                "managerTelephone": "",
                "projectCode": "",
                "projectDesc": "",
                "projectId":0,
                "projectManagerId": "",
                "projectName": "",
                "updateTime": "",
                "userName":"",
                "updateUserId": ""
            },
            modalDisplay: false,
            alertDisplay: false,
            infoDisplay: false,
            projectname:'',
            projectcode:'',
            projectdesc:'',
            modalButtons:[{
                text: '取消',
                buttonClass:'ad-auxiliary admin-small',
                name: 'cancel'
            }, {
                text: '确定',
                name: 'ok',
                buttonClass:'admin-small',
                handler(){
                    //return true 表示不关闭弹窗
                    if(_this.validateForm())
                    {
                        var submitobj ={
                            "createUserId": "",
                            "projectCode":_this.projectcode,
                            "projectDesc": _this.projectdesc,
                            "projectName": _this.projectname
                        };

                        _.ajax({
                            url:'/api/projectmanagement/addinfo',
                            method:'POST',
                            data:submitobj,
                            success:function(res){
                                if(res.code&&res.code=="0"){
                                    Toast({
                                        message: '创建成功'
                                    })

                                    _this.fetchData(1);
                                }else{
                                    if(res.msg)
                                    {
                                        Toast({
                                            message: res.msg
                                        })
                                    }
                                    _this.fetchData(1);
                                }

                                //项目下拉框
                                _.ajax({
                                    url:'/api/projectmanagement/selectlist',
                                    method:'POST',
                                    data:{
                                        pageNum:1,
                                        pageSize:100
                                    },
                                    success:function(res){
                                        if(res.code=="0"){
                                            _this.$parent.$parent.$parent.projectSelectOptions=[];
                                            _this.$parent.$parent.$parent.projectSelectOptionsInit=[];
                                            res.data.list.forEach((prom,i)=>{
                                                var interobj ={
                                                    value:prom,
                                                    text: prom.projectName
                                                };

                                               /* if(prom.active&&_this.$parent.$parent.$parent.projectobj.length==0)
                                                {
                                                    _this.$parent.$parent.$parent.projectobj=prom.projectName;
                                                    _.currentProjectCode.set(prom.projectCode)
                                                }*/
                                                
                                                if(i<10)
                                                {
                                                    _this.$parent.$parent.$parent.projectSelectOptions.push(interobj);
                                                }

                                                _this.$parent.$parent.$parent.projectSelectOptionsInit.push(interobj);
                                            });
                                        }
                                    },
                                    error:function(res){
                                    }
                                })
                            },
                            error:function(res){

                            }
                        })
                    }
                    return !_this.validateForm();
                }
            } ],
            infoModalButtons:[{
                text: '取消',
                buttonClass:'ad-auxiliary admin-small',
                name: 'cancel'
            }]
        }
    },
    created() {

        this.fetchData(1);
    },
    computed:{
        validateName() {
            let _this = this;
            return [{
                validator(v) {
                    return !/^\s+$/.test(v) && v !== ''
                },
                warning: '名称为必填'

            }]
        },
        validateCode() {
            let _this = this;
            return [{
                validator(v) {
                    return !hasReg.test(v) && v !== ''
                },
                warning: '编码为必填'
            }]
        }
    },
    methods: {
        togglePage(indexPage){
            //打印出当前页数
            this.fetchData(indexPage)
        },
        clearCurrentRecoder(){
            for(var k in this.currentRecoder){
                this.currentRecoder[k]="";
            }
        },
        validateProjectName(v){
            this.projectNameWarnings=null;
            var f=!hasReg.test(v) && v !== '';
            if(!f){
                this.projectNameWarnings=['名称是必填项'];
            }else if(!/^[a-zA-Z]\w*$/.test(v)){
                f=false;//
                this.projectNameWarnings=['必须是字母、数字、_，且以字母开头'];
            }else if(v.length>40){
                f=false;
                this.projectNameWarnings=['字符长度不能超过40'];
            }
            return f;
        },
        validateProjectCode(v){
            this.projectCodeWarnings=null;
            var f=!hasReg.test(v) && v !== '';
            if(!f){
                this.projectCodeWarnings=['编码是必填项'];
            }else if(!/^[a-z]\w*$/.test(v)){
                f=false;
                this.projectCodeWarnings=['必须是以小写字母、数字、_，且以字母开头'];
            }else if(v.length>40){
                f=false;
                this.projectCodeWarnings=['字符长度不能超过40'];
            }
            return f;
        },
        validateProjectDesc(v){
            this.projectDescWarnings=null;
            var f=true;
            if(v&&v.length>120){
                f=false;
                this.projectDescWarnings=['字符长度不能超过120'];
            }
            return f;
        },
        //验证通过返回true;
        validateForm(){
            this.projectNameWarnings= this.projectCodeWarnings=null;
            var f1=true,f2=true,f3=true;
            var projectName= this.projectname;
            var projectCode=this.projectcode;
            f1=this.validateProjectName(projectName);
            f2=this.validateProjectCode(projectCode);
            f3=this.validateProjectDesc(this.projectdesc);
            return f1&&f2&&f3;
        },
        createProjectModal () {
           // this.clearCurrentRecoder();
            this.modalTitle='创建项目';
            this.modalType='add';
            this.modalDisplay=true;
            this.projectcode = "";
                this.projectdesc = "";
            this.projectname = "";
        },
        fetchProjectModal (rec) {
            this.modalTitle='项目详情';
            this.modalType='info';
            $.extend(this.currentRecoder,rec);
           // console.log(this.currentRecoder)
            this.infoDisplay=true;

            ///api/projectmanagement/baseinfo
        },
        createAction(){
        },
        fetchInfo(rec){
        },
        fetchData(curPage){
            let _this=this;
                _.ajax({
                    url:'/api/projectmanagement/list',
                    method:'POST',
                    data:{
                        pageNum:curPage,
                        pageSize:_this.pageSize
                    },
                    success:function(res){
                        if(res.code=="0"){
                            _this.data=res.data.list
                            _this.data.forEach((ec)=>{
                                ec.createTime =  _.date2String(new Date(ec.createTime),'yyyy-MM-dd hh:mm:ss');
                            })
                            _this.totalCount=res.data.total;
                            _this.currentPage=curPage;
                        }else{
                            _this.data=[];
                        }
                    },
                    error:function(res){

                    }
                })
        },
        validateDone(res){
            if (!res) {
                this.resFlag=res;
            }

        },
        inputProjectName(v){
            this.projectname=v;
            this.validateProjectName(v);

        },
        inputProjectCode(v){
            this.projectcode=v;
            this.validateProjectCode(v);
        },
        inputProjectDesc(v){
            this.projectdesc=v;
            this.validateProjectDesc(v)
        }

    }

}
