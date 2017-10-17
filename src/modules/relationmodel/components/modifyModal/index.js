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
    components: {},
    mixins: [modalBase],
    props: {
        relationId:{
            type: String,
            required: true
        },
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
                this.getRelationInfo()
            }
            this.modifyFormShow = v;
        }
    },
    data () {
        let _this =this;
        return {
            modifyFormShow:this.open,
            modifyFormStep: 1,
            modifyFormButtonsStep1: [
                {
                    name: 'cancel',
                    text: '取消',
                    buttonClass: 'ad-auxiliary admin-small',
                    handler: function () {
                        this.modifyFormStep = 1;
                    }.bind(this)
                },
                {
                    name: 'next',
                    text: '下一步',
                    buttonClass: 'admin-small',
                    handler: function () {
                        var flag=this.validateRelationBaseInfo();
                        if(flag){
                            this.modifyFormStep = 2
                        }
                        return true
                    }.bind(this)
                }
            ],
            modifyFormButtonsStep2: [
                {
                    name: 'cancel',
                    text: '取消',
                    buttonClass: 'ad-auxiliary admin-small',
                    handler: function () {
                        this.modifyFormStep = 1;
                    }.bind(this)
                },
                {
                    name: 'prev',
                    text: '上一步',
                    buttonClass: 'admin-small',
                    handler: function () {
                        this.modifyFormStep = 1
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
        modifyFormButton(){
            return this['modifyFormButtonsStep' + this.modifyFormStep]
        }
    },
    methods: {
        saveRelation(){
            this.setModifyFormButtonsStep2("empty")
            let arg=dataUtils.getSubmitData(this.relationModelRecorder);
            arg['id']=this.relationId;
            let _this=this;
            fetchAgent.saveRelationInfo(arg,(res)=>{
                _this.setModifyFormButtonsStep2("init")
                if(res.code==0){
                    Toast( {message: '操作成功！',
                        duration: 2000})
                    _this.close();
                    _this.$emit('refresh',null);
                }else if(res.code==1001){
                    _this.relationModelRecorder.relationCodeWarnings=[res.msg];
                }else{
                    _this.modifyFormShow=false;
                    _this.messageAlert("操作失败")
                }
                _this.modifyFormStep = 1;
            })
        },
        close(){
            let _this=this;
            this.startAssociations=[];
            this.endAssociations=[];
            this.modifyFormStep=1;
            this.modifyFormShow = false;
            this.$emit('close', null)
        },

        createBtnHandler(){
            if(!this.relationModelRecorder.propertyList.length){
                this.messageAlert('至少需要条记录')
            }else if(this.validateRelationPropertyInfo()){
                this.saveRelation()
            }
            return true;
        },
        emptyBtnHandler(){
            return true;
        },
        setModifyFormButtonsStep2(type){
            if(type=='init'){
                this.modifyFormButtonsStep2[2].buttonClass='admin-small';
                this.modifyFormButtonsStep2[2].handler=this.createBtnHandler.bind(this)
            }else{
                this.modifyFormButtonsStep2[2].buttonClass='admin-small chorus-btn-disabled'
                this.modifyFormButtonsStep2[2].handler=this.emptyBtnHandler.bind(this)
            }
        },
        getRelationInfo(){
            let _this=this;
            let relationId=this.relationId;
            this.relationModelRecorder=$.extend(true,{}, this.defaultRecorder),
            fetchAgent.getRelationInfo({relationId},(res)=>{
                console.log(res)
                let propertyList=[];
                if(res.code==0){
                    if(res.data.propertyList&&res.data.propertyList.length){
                        res.data.propertyList.forEach((o)=>{
                            let disabled=true;
                            propertyList.push($.extend(true,{disabled},_this.defaultPropertyListRecorder,o));
                            console.log(o)
                        })
                        _this.relationModelRecorder=$.extend(true,{}, this.defaultRecorder,res.data);
                        dataUtils.setPropertyListData(propertyList);
                        _this.relationModelRecorder.propertyList=propertyList;
                    }

                }

            });
        }

    },
    created() {
    }
}