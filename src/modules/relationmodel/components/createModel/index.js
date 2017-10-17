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
import adModal from 'adminUI/components/admin-modal'
import adToast from 'adminUI/components/admin-toast/index'
import adSelectTips from '../../../../admin-ui-extend/components/admin-select-tips.vue'
import adInputEdit from '../../../../admin-ui-extend/components/admin-input-edit.vue'
import adRadioEdit from '../../../../admin-ui-extend/components/admin-radio-edit.vue'
import fetchAgent  from '../../utils/fetchAgent';
import dataUtils  from '../../utils/data';
import validateUtils  from '../../utils/validate.js';
import {alphaNumericUnderline}  from 'Utils/regex';
import MessageBox from 'adminUI/components/admin-message-box/index';
import modalBase from '../modalBase.js';
import CONSTANT from 'Utils/constant'
export default {
    name: 'chorus-relation-model',
    components: {

    },
    mixins: [modalBase],
    props: {
        open: {
            type: Boolean,
            default: false
        },
        propertyDatatypeOptions:{
            type: Array,
            required: true
        }
    },
    watch: {
        open (v) {
            if(v==true){
                this.initForm()
            }
            this.createFormShow = v;
        }
    },
    data () {
        let _this =this;
        return {
            datalist:[],
            startAssociations:[],
            endAssociations:[],
            disabled:true,
            createFormShow:this.open,
            createFormStep: 1,
            createFormButtonsStep1: [
                {
                    name: 'cancel',
                    text: '取消',
                    buttonClass: 'ad-auxiliary admin-small',
                    handler: function () {
                        this.createFormStep = 1;
                        this.showCreateFormBtnDisabled=false;
                    }.bind(this)
                },
                {
                    name: 'next',
                    text: '下一步',
                    buttonClass: 'admin-small',
                    handler: function () {
                        var flag=this.validateRelationBaseInfo();
                        console.log('flag',flag)
                        if(flag){
                            this.createFormStep = 2
                        }
                        return true
                    }.bind(this)
                }
            ],
            createFormButtonsStep2: [
                {
                    name: 'cancel',
                    text: '取消',
                    buttonClass: 'ad-auxiliary admin-small',
                    handler: function () {
                        this.createFormStep = 1;
                    }.bind(this)
                },
                {
                    name: 'prev',
                    text: '上一步',
                    buttonClass: 'admin-small',
                    handler: function () {
                        this.createFormStep = 1
                        return true
                    }.bind(this)
                },
                {
                    name: 'create',
                    text: '生效',
                    buttonClass: 'admin-small',
                    handler: this.createBtnHandler.bind(this)
                }
            ]
        }
    },
    computed: {
        createFormButton(){
            return this['createFormButtonsStep' + this.createFormStep]
        }
    },
    methods: {
        startSugChangeBlur(){
            console.log('this.relationModelRecorder.relationStart',this.relationModelRecorder.relationStart)
            if(this.relationModelRecorder.relationStart==""){//没有通过下列选择,就清空
                this.relationModelRecorder.startEntityName="";
            }
        },
        //suggest 下拉框点击
        startSugSelectClick(rec){
            this.relationModelRecorder.relationStart=rec.value;
            //this.
        },
        endSugChangeBlur(){
            console.log('this.relationModelRecorder.relationEnd',this.relationModelRecorder.relationEnd)
            if(this.relationModelRecorder.relationEnd==""){//没有通过下列选择,就清空
                this.relationModelRecorder.endEntityName="";
            }
        },
        //suggest 下拉框点击
        endSugSelectClick(rec){
            this.relationModelRecorder.relationEnd=rec.value;
            //this.
        },
        //输入是input事件
        startSugChangeInput(entityName){
            let _this=this;
            entityName=$.trim(entityName);
            this.relationModelRecorder.relationStart="";
            this.fetchGetAllEntities(entityName,(arr)=>{
                _this.startAssociations=arr;
                console.log(_this.startAssociations)
                this.$nextTick(()=>{
                    _this.$refs.startSugInputComponent.changeAssociations();
                })

            })
        },
        //输入是input事件
        endSugChangeInput(entityName){
            let _this=this;
            entityName=$.trim(entityName);
            this.relationModelRecorder.relationEnd="";
            this.fetchGetAllEntities(entityName,(arr)=>{
                _this.endAssociations=arr;
                this.$nextTick(()=>{
                    _this.$refs.endSugInputComponent.changeAssociations();
                })

            })
        },
        fetchGetAllEntities(entityName,cb){
            let _this =this;
            let projectCode=_.currentProjectCode.get();
            if(!projectCode){
                return;
            }
            fetchAgent.getAllEntities({entityName,projectCode},(res)=>{
                if(res.code=="0"){
                    var data=res.data;
                    var arr=[];
                    data.forEach((d,i)=>{
                        if(i<10){
                            arr.push({
                                text:d.entityName,
                                value:d.id
                            })
                        }
                    })
                    cb&&cb(arr)
                }
            })
        },
        createRelation(){
            this.setCreateFormButtonsStep2("empty")
            let arg=dataUtils.getSubmitData(this.relationModelRecorder);
            let _this=this;
            fetchAgent.createRelation(arg,(res)=>{
                _this.setCreateFormButtonsStep2("init")
                if(res.code==0){
                    Toast( {message: '操作成功！',
                        duration: 2000})
                    _this.close();
                    _this.$emit('refresh',null);
                }else if(res.code==1001){
                    _this.relationModelRecorder.relationCodeWarnings=[res.msg];
                }else{
                    _this.createFormShow=false;
                    _this.messageAlert("操作失败")
                }
                _this.createFormStep = 1;
            })
        },
        close(){
            let _this=this;
            this.createFormShow = false;
            this.startAssociations=[];
            this.endAssociations=[];
            this.$nextTick(()=>{
                _this.$refs.startSugInputComponent.changeAssociations();
                _this.$refs.endSugInputComponent.changeAssociations();
            })
            this.$emit('close', null)
        },
        initForm(){
            let _this=this;
            this.relationModelRecorder=$.extend(true,{}, this.defaultRecorder)
            console.log('property-datatype-options',this.propertyDatatypeOptions)
            this.createFormStep = 1;
        },
        createBtnHandler(){
            if(!this.relationModelRecorder.propertyList.length){
                this.messageAlert('至少需要条记录')
            }else if(this.validateRelationPropertyInfo()){
                this.createRelation()
            }
            return true;
        },
        emptyBtnHandler(){
            return true;
        },
        setCreateFormButtonsStep2(type){
            if(type=='init'){
                this.createFormButtonsStep2[2].buttonClass='admin-small';
                this.createFormButtonsStep2[2].handler=this.createBtnHandler.bind(this)
            }else{
                this.createFormButtonsStep2[2].buttonClass='admin-small chorus-btn-disabled'
                this.createFormButtonsStep2[2].handler=this.emptyBtnHandler.bind(this)
            }
        }

    },
    created() {

    }
}