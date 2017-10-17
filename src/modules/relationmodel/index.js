/**
 * Created by AnThen on 2017-5-3.
 */
/**
 * Created by AnThen on 2017-3-3.
 */
import adSelect from 'adminUI/components/admin-select'
import adRadio from 'adminUI/components/admin-radio'
import adInput from 'adminUI/components/admin-input'
import paginator from 'adminUI/components/admin-paginator'
import adModal from 'adminUI/components/admin-modal'
import adToast from 'adminUI/components/admin-toast/index'
import navBar  from '../../admin-ui-extend/components/admin-navbar.vue';
import fetchAgent  from './utils/fetchAgent';
import dataUtils  from './utils/data';
import createModal  from './components/createModel/index.vue';
import modifyModal  from './components/modifyModal/index.vue';
import MessageBox from 'adminUI/components/admin-message-box/index';
import adInputEdit from '../../admin-ui-extend/components/admin-input-edit.vue'
import CONSTANT from 'Utils/constant';
export default {
    name: 'chorus-relation-model',
    components: {
        adSelect,
        adRadio,
        adInput,
        adModal,
        navBar,
        createModal,
        modifyModal,
        paginator,
        adInputEdit
    },
    data () {
        let _this =this;
        return {
            showCreateFormBtnDisabled:false,
            propertyDatatypeOptions:[],
            navlist:[{id:1,text:'数据模型管理',url:''},{id:2,text:'关系模型',url:''}],
            datalist:[],
            pageSize:CONSTANT.pageSize,
            totalCount: 0,
            currentPage: 1,
            createFormShow: false,
            modifyFormShow:false,
            currentRelationId:"",
            relationName:''
        }
    },
    computed: {

    },
    methods: {
        //分页相应事件
        togglePage(indexPage){
            this.fetchData(indexPage)
        },
        //刷新列表数据
        refreshList(){
            this.fetchData(1);
        },
        //查询列表数据
        fetchData(curPage){
            let _this=this;
            fetchAgent.getRelationList({
                pageNum:curPage,
                pageSize:this.pageSize,
                projectCode:_.currentProjectCode.get(),
                relationName:this.relationName
            },(res)=>{
                if(res.code =='0'){
                    _this.datalist = res.data.list;
                    _this.totalCount= res.data.total;
                    _this.currentPage= curPage;
                }
            })

        },
        showDateTime (time) {
            return time?_.date2String(new Date(time), "yyyy-MM-dd hh:mm:ss"):'';
        },
        showCreateForm(){
            this.createFormShow=true;
        },
        createCloseEvent(){
            this.createFormShow=false;
        },
        showModifyForm(entry){
            this.modifyFormShow=true;
            this.currentRelationId=`${entry.id}`;
        },
        modifyCloseEvent(){
            this.modifyFormShow=false;
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
        this.fetchData(1);
        fetchAgent.getDataTypeList({},function(res){
            if(res.code==0){
                _this.propertyDatatypeOptions=dataUtils.datatype2Options(res.data)
            }
        })
    }
}