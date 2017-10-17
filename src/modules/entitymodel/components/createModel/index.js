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
    mixins: [modalBase],
    props: {
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
            if(v==true){
                this.initForm()
            }
            this.createFormShow = v;
        }
    },
    data () {
        let _this =this;
        return {
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
                        var flag=this.validateEntityBaseInfo();
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
                        this.showCreateFormBtnDisabled=false;
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
                    handler: function () {
                        if(!this.entityModelRecorder.propertyList.length){
                            this.messageAlert('至少需要条记录')
                        }else if(this.validateEntityPropertyInfo()){
                            this.createEntity()

                        }
                        return true;

                    }.bind(this)
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
        createEntity(){
            this.setCreateFormButtonsStep2("empty")
            let arg=dataUtils.getSubmitData(this.entityModelRecorder);
            let _this=this;
            fetchAgent.createEntity(arg,(res)=>{
                _this.setCreateFormButtonsStep2("init")
                if(res.code==0){
                    Toast( {message: '操作成功！',
                        duration: 2000})
                    _this.close(true);
                }else if(res.code==1001){
                    _this.createFormStep = 1;
                    _this.entityModelRecorder.entityCodeWarnings=[res.msg];
                }else{
                    _this.createFormShow=false;
                    _this.messageAlert("操作失败")

                }
            })
        },
        close(type){
            this.createFormShow = false;
            this.createFormStep=1;
            console.log("----------")
            this.$emit('close', type)
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

        initForm(){
            let _this=this;
            this.entityModelRecorder=$.extend(true,{}, this.defaultRecorder)
            this.entityModelRecorder.entityType=this.entityTypeOptions.length?_this.entityTypeOptions[0].value:"";
            this.showCreateFormBtnDisabled=true;
            this.createFormStep = 1;
        },
        createBtnHandler(){
            if(!this.entityModelRecorder.propertyList.length){
                this.messageAlert('至少需要条记录')
            }else if(this.validateEntityPropertyInfo()){
                this.createEntity()

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