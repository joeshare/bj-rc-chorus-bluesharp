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
    mixins: [modalBase],
    name: 'chorus-entity-model',
    components: {
        adSelect,
        adRadio,
        adInput,
        adModal,
        adSelectTips,
        adInputEdit,
        adRadioEdit,
        Toast
    },
    props: {
        entityId:{
            type: String,
            required: true
        },
        open: {
            type: Boolean,
            default: false
        },
        entityTypeOptions:{
            type: Array,
            required: true
        },
        propertyDatatypeOptions:{
            type: Array,
            required: true
        }
    },
    watch: {
        open (v) {
            console.log('open',v)
            if(v==true){
              this.getEntityInfo()
            }
            console.log('open1',v)
            console.log('this.modifyFormShow',this.modifyFormShow)
            if(this.modifyFormShow != v){
                console.log('open2',v)
                this.modifyFormShow = v;
            };

        }
    },
    data () {
        let _this =this;
        return {
            datalist:[],
            disabled:true,
            modifyFormShow:false,
            modifyFormStep: 1,
            modifyFormButtonsStep1: [
                {
                    name: 'cancel',
                    text: '取消',
                    buttonClass: 'ad-auxiliary admin-small',
                    handler: function () {
                        this.modifyFormStep = 1;
                        this.showCreateFormBtnDisabled=false;
                    }.bind(this)
                },
                {
                    name: 'next',
                    text: '下一步',
                    buttonClass: 'admin-small',
                    handler: function () {
                        var flag=this.validateEntityBaseInfo();
                        console.log('flag',flag)
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
        getEntityInfo(){
            let _this=this;
            this.entityModelRecorder=$.extend(true,{}, this.defaultRecorder,this.entityRecorder),
            fetchAgent.getEntityInfo(this.entityId,(res)=>{
                console.log(res)
                let propertyList=[];
                if(res.code==0){
                    if(res.data.propertyList&&res.data.propertyList.length){
                        res.data.propertyList.forEach((o)=>{
                            let disabled=true;
                            propertyList.push($.extend(true,{disabled},_this.defaultPropertyListRecorder,o));
                            console.log(o)
                        })
                        console.log(propertyList)
                        _this.entityModelRecorder=$.extend(true,{}, this.defaultRecorder,res.data);
                        dataUtils.setPropertyListData(propertyList);
                        _this.entityModelRecorder.propertyList=propertyList;
                        console.log(_this.entityModelRecorder.propertyList)
                    }

                }

            });
        },
        close(b){
            this.modifyFormShow = false;
            this.modifyFormStep=1;
            this.$emit('close', b)
        },
        showDateTime (time) {
            return time?_.date2String(new Date(time), "yyyy-MM-dd hh:mm:ss"):'';
        },
        showEntityTypeTxt(v){
            let txt=v;
            this.entityTypeOptions.every(o=>{
                txt=o.text;
                return !(o.value==v);
            })
            return txt;
        },
        saveEntity(){
            this.setModifyFormButtonsStep2("empty")
            let arg=dataUtils.getSubmitData(this.entityModelRecorder);
            let _this=this;
            arg['id']=this.entityId;
            fetchAgent.saveEntityInfo(arg,(res)=>{
                _this.setModifyFormButtonsStep2("init")
                if(res.code==0){
                    Toast( {message: '操作成功！',
                        duration: 2000})
                    _this.close(true);
                }else if(res.code==1001){
                    _this.entityModelRecorder.entityCodeWarnings=[res.msg];
                }else{
                    _this.createFormShow=false;
                    _this.messageAlert("操作失败")

                }
                _this.createFormStep = 1;
            })
        },
        createBtnHandler(){
            if(!this.entityModelRecorder.propertyList.length){
                this.messageAlert('至少需要条记录')
            }else if(this.validateEntityPropertyInfo()){
                this.saveEntity()

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
        }
    },
    created() {
    }
}