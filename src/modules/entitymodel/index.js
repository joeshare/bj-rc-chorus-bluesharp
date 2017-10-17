/**
 * Created by AnThen on 2017-5-3.
 */
/**
 * Created by AnThen on 2017-3-3.
 */
import adSelect from 'adminUI/components/admin-select'
import Toast from 'adminUI/components/admin-toast/index';
import adRadio from 'adminUI/components/admin-radio'
import adInput from 'adminUI/components/admin-input'
import paginator from 'adminUI/components/admin-paginator'
import adModal from 'adminUI/components/admin-modal'
import adToast from 'adminUI/components/admin-toast/index'
import navBar  from '../../admin-ui-extend/components/admin-navbar.vue';
import adSelectTips from '../../admin-ui-extend/components/admin-select-tips.vue'
import adInputEdit from '../../admin-ui-extend/components/admin-input-edit.vue'
import adRadioEdit from '../../admin-ui-extend/components/admin-radio-edit.vue'
import fetchAgent  from './utils/fetchAgent';
import dataUtils  from './utils/data';
import validateUtils  from './utils/validate.js';
import modifyModal  from './components/modifyModal/index.vue';
import createModal  from './components/createModel/index.vue';
import {alphaNumericUnderline}  from '../../js/utils/regex';
import MessageBox from 'adminUI/components/admin-message-box/index'
import CONSTANT from 'Utils/constant'
export default {
    name: 'chorus-entity-model',
    components: {
        adSelect,
        adRadio,
        adInput,
        adModal,
        navBar,
        adSelectTips,
        adInputEdit,
        adRadioEdit,
        Toast,
        modifyModal,
        createModal,
        paginator
    },
    data () {
        let _this =this;
        return {
            showCreateFormBtnDisabled:false,
            navlist:[{id:1,text:'数据模型管理',url:''},{id:2,text:'实体模型',url:''}],
            tablenameWarnings:'',
            datalist:[],
            pageSize:CONSTANT.pageSize,
            totalCount: 0,
            currentPage: 1,
            createFormShow: false,
            modifyFormShow:false,
            entityDetailInfo:{},
            currentEntityId:"",
            entityTypeOptions:[],
            entityTypeAllOptions:[],
            propertyDatatypeOptions:[],
            entityType:"",
            entityName:"",
            securityLevelOptions: [
                {
                    text: 'A',
                    value: 'A'
                },
                {
                    text: 'B',
                    value: 'B'
                },
                {
                    text: 'C',
                    value: 'C'
                }
            ]
        }
    },
    computed: {
    },
    methods: {
        //分页相应事件
        togglePage(indexPage){
            this.fetchData(indexPage)
        },
        //暂时不用
        keyUpEntityBaseInfo(val,basePro){
            let proVar=basePro.replace(/^e/,'E');
            //this.entityModelRecorder[basePro]=validateUtils[`set${proVar}Length`](val);

        },
        createCloseEvent(type){
            this.createFormShow = false;
            if(type){
                this.entityType="";
                this.entityName="";
                this.fetchData(1);

            }
        },
        //创建实体
        showCreateForm () {
            this.createFormShow = true
        },
        getPrimaryKeyRadios(){
            let value=_.uuid(64)+new Date().getTime();
            let text='是';
            return [{ text, value }];
        },
        showDateTime (time) {
            return time?_.date2String(new Date(time), "yyyy-MM-dd hh:mm:ss"):'';
        },
        showModifyForm(entry){
            this.modifyFormShow=true;
            this.currentEntityId=`${entry.id}`;

        },
        modifyCloseEvent(type){
            this.modifyFormShow=false;
            type&&this.fetchData(1);
            console.log("modifyCloseEvent")
        },
        showEntityTypeTxt(v){
            let txt=v;
            this.entityTypeOptions.every(o=>{
                txt=o.text;
                return !(o.value==v);
            })
            return txt;
        },
        //查询列表数据
        fetchData(curPage){
            let _this=this;
            let entityType=this.entityType==undefined?"":this.entityType;
            console.log('entityType',entityType)
            let entityName=$.trim(this.entityName);
            let projectCode=_.currentProjectCode.get();
            fetchAgent.getEntityList({
               pageNum:curPage,
               pageSize:this.pageSize,
               entityType,
               entityName,
               projectCode
            },(res)=>{
                if(res.code =='0'){
                    _this.datalist = res.data.list;
                    _this.totalCount= res.data.total;
                    _this.currentPage= curPage;
                }
            })

        }
    },
    created() {
        let projectInfo=_.currentProjectInfo.get();
        this.showCreateFormBtnDisabled=false;
        if(!projectInfo){
            this.showCreateFormBtnDisabled=true;
            MessageBox({
                message:'当前没有项目，是否现在创建项目？',
                type: 'confirm',
                confirm () {
                    window.location.href="#/projectmanagement"+'?'+Math.random()*10000;;
                }
            })
            return false;
        }
        var _this=this;
        fetchAgent.getEntityTypeList({},function(res){
            if(res.code==0){
                let arr=dataUtils.entityType2Options(res.data);
                let clone=JSON.parse(JSON.stringify(arr))
                arr.unshift({text:'全部数据'})
                _this.entityTypeOptions=clone;
                _this.entityTypeAllOptions=arr;
                _this.entityType=arr.length?arr[0].value:"";
                console.log(_this.entityType)
                console.log(arr)
                _this.fetchData(1);
            }
        })
        fetchAgent.getDataTypeList({},function(res){
            if(res.code==0){
                _this.propertyDatatypeOptions=dataUtils.datatype2Options(res.data)
            }
        })


    }
}