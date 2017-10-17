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
import navBar  from '../../admin-ui-extend/components/admin-navbar.vue';
import adSelectTips from '../../admin-ui-extend/components/admin-select-tips.vue'
import adInputEdit from '../../admin-ui-extend/components/admin-input-edit.vue'
import adRadioEdit from '../../admin-ui-extend/components/admin-radio-edit.vue'
import adminDatepicker from 'adminUI/components/admin-datepicker'
import anchorBar from './anchorBar/index.vue'
import entityA from './entityA/index.vue'
import relation from './relation/index.vue'
import entityB from './entityB/index.vue'
import condition from './condition/index.vue'
import MessageBox from 'adminUI/components/admin-message-box/index'
import Chart from './chart/index.vue'
import {saverule,getrule,fetchChartData} from './utils/fetchtAgent.js'
import {chartData2NodeMap,setUpdateStatus} from './utils/chartDataUtil.js'
import {canvasModel} from './models/canvasModel.js'
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
        Chart,
        adminDatepicker,
        anchorBar,
        entityA,
        relation,
        entityB,
        condition
    },
    data () {
        let _this =this;
        console.log('44444444444444')
        console.log(0o11)
        return {
            chartData: [],
            navlist: [{id: 'dataGraphVisualization', text: '数据图可视化', url: ''}, {
                id: 'queryVisualization',
                text: '查询可视化',
                url: ''
            }],
            date: '',
            currentHitData:{},
            queryentity: {
                "size": 5,
                "add_size_regx":"^[1-9]\\d*$",
                "add_size_warnings":null,
                "project": "",
                "vertexInputA": {
                    "vertexCode": "",
                    "add_vertexOption_select":null,
                    "add_vertexOption":[],
                    "add_nameOption":[],
                    "properties": [],
                    "ruleType": "and"
                },
                "edgeInput": {
                    "edgeCode": "",
                    "add_edgeOption_select":null,
                    "add_edgeOption":[],
                    "add_nameOption":[],
                    "properties": [],
                    "ruleType": "and"
                },
                "vertexInputB": {
                    "vertexCode": "",
                    "add_vertexOption_select":null,
                    "add_vertexOption":[],
                    "add_nameOption":[],
                    "properties": [],
                    "ruleType": "and"
                }
            },
            isSnapshoot:false,
            modalDisplay: false,
            modalButtons:[{
                text: '取消',
                buttonClass:'ad-auxiliary admin-small',
                name: 'cancel'
            }, {
                text: '确定',
                name: 'ok',
                buttonClass:'admin-small',
                handler(){
                    let ruleconent = JSON.stringify(_this.queryentity);

                    if(_this.validateForm()){
                        saverule({ruleName:_this.rulename,ruleDesc:_this.ruledesc,projectCode:
                        _.currentProjectInfo.get().projectCode,ruleContent:ruleconent},function (res) {
                            if(res.code=="0"){
                                Toast({
                                    message:'保存成功！'
                                },100)
                            }
                            else{
                                Toast({
                                    message:'保存失败！'
                                },100)
                            }

                        })
                    }
                    return !_this.validateForm();
                }
            } ],
            rulename:'',
            ruledesc:'',
            rulenameWarnings:null
        }
    },
    computed: {
    },
    watch: {
        "$route": "initdatas"
    },
    mounted(){

        this.fetchChartData()
    },
    methods: {
        initdatas(){
            let projectInfo = _.currentProjectInfo.get();
            if(!projectInfo){
                MessageBox({
                    message:'当前没有项目，是否现在创建项目？',
                    type: 'confirm',
                    confirm () {
                        window.location.href="#/projectmanagement"+'?'+Math.random()*10000;;
                    }
                })
                return false;
            }
            let _this  =this;
            setTimeout(function () {
            if(_this.$route.params.type=='snapshoot'){
                _this.isSnapshoot = true;
                getrule({id:_this.$route.params.Id},function (res) {
                    _this.queryentity = JSON.parse(res.data.ruleContent);
                    _this.dosubmit();
                })
            }
            else{
                _this.isSnapshoot = false;
                _this.queryentity ={
                    "size": 5,
                    "add_size_regx":"^[1-9]\\d*$",
                    "add_size_warnings":null,
                    "project": "",
                    "vertexInputA": {
                        "vertexCode": "",
                        "add_vertexOption_select":null,
                        "add_vertexOption":[],
                        "add_nameOption":[],
                        "properties": [],
                        "ruleType": "and"
                    },
                    "edgeInput": {
                        "edgeCode": "",
                        "add_edgeOption_select":null,
                        "add_edgeOption":[],
                        "add_nameOption":[],
                        "properties": [],
                        "ruleType": "and"
                    },
                    "vertexInputB": {
                        "vertexCode": "",
                        "add_vertexOption_select":null,
                        "add_vertexOption":[],
                        "add_nameOption":[],
                        "properties": [],
                        "ruleType": "and"
                    }
                };
                _this.$refs.refentitya.initdata();
                }
            },50);
        },
        validateDone (res) {
            console.log('event validate done: ' + res)
        },
        saverule(){
            if(!this.isSnapshoot) {
                if (this.validateData()) {
                    this.rulename = "";
                    this.ruledesc = "";
                    this.modalDisplay = true;
                }
                else {
                    Toast({
                        message: '验证不通过，请检查查询条件！'
                    }, 100)
                }
            }
        },
        validateForm(){
            if(/.+/.test(this.rulename))
            {
                return true;
            }
            else{
                this.rulenameWarnings =["规则名称必填"];
                return false;
            } 
        },
        dosubmit(){
            if(!this.isSnapshoot) {
                if (this.validateData()) {
                    this.fetchChartData(this.clearData());
                    document.querySelector('.chorus-main').scrollTop = document.querySelector("#query-visualization-dataChart").offsetTop - 150;
                }
                else {
                    Toast({
                        message: '验证不通过，请检查查询条件！'
                    }, 100)
                }
            }
        },
       fetchChartData(reqJson){
           console.log('-----req-',reqJson)
           let _this=this;
           fetchChartData(reqJson,(res)=>{

               console.log('------------99701',res);
               //res = mock.getChart();
               //TODO::
               if(res.code==0){
                   _this.chartData=chartData2NodeMap(res.data)
                   console.log(_this.chartData)

               }
           })
       },
       validateData(){
           let returnbool = {val:true};
           let regx = new RegExp(this.queryentity.add_size_regx);
           if(!regx.test(this.queryentity.size)||this.queryentity.size>99){
               this.queryentity.add_size_warnings = ["请输入1-100数字"];
               returnbool.val = false;
           }
           else{
               this.queryentity.add_size_warnings =null;
           }
            //vertexInputA
           this.validateData_check(this.queryentity.vertexInputA,returnbool);
           //edgeInput
           this.validateData_check(this.queryentity.edgeInput,returnbool);
           //vertexInputB
           this.validateData_check(this.queryentity.vertexInputB,returnbool);

           return returnbool.val;
       },
        validateData_check(datas,returnbool){
            datas.properties.forEach((m)=>{
                m.add_values.forEach((md)=>{
                    let regx = new RegExp(md.regx);
                    if(!regx.test(md.value)){
                        md.warnings = md.warningstr;
                        returnbool.val = false;
                    }
                    else{
                        md.warnings = null;
                    }
                })

                if(m.add_values.length==2){
                    if(/\d+/.test(m.add_values[0].value)){
                        if(m.add_values[0].value>m.add_values[1].value){
                            m.add_values[0].warnings =["开始值不能大于结束值"];
                            returnbool.val = false;
                        }

                    }else{
                        if(new Date(m.add_values[0].value).getTime()>new Date(m.add_values[1].value).getTime()){
                            m.add_values[0].warnings =["开始时间不能大于结束时间"];
                            returnbool.val = false;
                        }
                    }
                }
            });
        },
       clearData_delete(datas){
           for(let data in datas){
               if(typeof datas[data]=='object'||typeof datas[data]=='array'){
                   this.clearData_delete(datas[data]);
               }
               if(data.indexOf("add_")>-1){
                   delete datas[data];
               }
           }
       },
        clearData_inset(datas){
            datas.properties.forEach((m,index)=>{
                m.add_values.forEach((val)=>{
                    m.values.push(val.value);
                });
                if(m.add_values.length==0){
                     datas.properties.splice(index,1);
                }
            });
        },
       clearData(){
           //TODO::
           if(!_.currentProjectInfo.get()){
              return;
           }
            let outData = JSON.parse(JSON.stringify(this.queryentity));
            let projectInfo = _.currentProjectInfo.get();
            if(projectInfo){
               outData.project = projectInfo.projectCode;
               this.clearData_inset( outData.vertexInputA);
               this.clearData_inset( outData.edgeInput);
               this.clearData_inset( outData.vertexInputB);
               this.clearData_delete(outData);
               return outData;
            }
       }
    },
    created() {
        this.initdatas();
    }
}