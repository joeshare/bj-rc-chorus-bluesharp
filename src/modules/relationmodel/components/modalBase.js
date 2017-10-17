/**
 * Created by AnThen on 2017-5-3.
 */
/**
 * Created by AnThen on 2017-3-3.
 */
import adSelect from 'adminUI/components/admin-select'
import adRadio from 'adminUI/components/admin-radio'
import adInput from 'adminUI/components/admin-input'
import adModal from 'adminUI/components/admin-modal'
import adSelectTips from '../../../admin-ui-extend/components/admin-select-tips.vue'
import adInputEdit from '../../../admin-ui-extend/components/admin-input-edit.vue'
import adRadioEdit from '../../../admin-ui-extend/components/admin-radio-edit.vue'
import Toast from 'adminUI/components/admin-toast/index';
import dataUtils  from '../utils/data';
import validateUtils  from '../utils/validate.js';
import MessageBox from 'adminUI/components/admin-message-box/index';
import AdSugInput from '../../../admin-ui-extend/components/admin-input-custom.vue';
import CONSTANT from 'Utils/constant'
export default {
    name: 'model-base',
    components: {
        AdSugInput,
        adSelect,
        adRadio,
        adInput,
        adModal,
        adSelectTips,
        adInputEdit,
        adRadioEdit,
        Toast
    },
    data () {
        let _this =this;
        return {
            datalist:[],
            startAssociations:[],
            endAssociations:[],
            disabled:true,
            currentCacheStartEntityName:"",
            currentCacheEndEntityName:"",
            currentCacheStartEntityId:"",
            currentCacheEndEntityId:"",
            defaultRecorder:{
                relationCode:"",
                relationCodeWarnings:null,
                relationName:"",
                relationNameWarnings:null,
                relationDesc:"",
                relationDescWarnings:null,
                startEntityName:"",
                startEntityNameWarnings:null,
                endEntityName:"",
                endEntityNameWarnings:null,
                relationStart:"",
                relationEnd:"",
                propertyList:[]
                //{"propertyName","propertyCode", "propertyDatatype"，"propertyLength，"propertyDesc"，"isPrimaryKey"，"status"，"securityLevel" }
            },
            defaultPropertyListRecorder:{
                "propertyName":"",
                "propertyNameWarnings":null,
                "propertyCode":"",
                "propertyCodeWarnings":null,
                "propertyType":this.propertyDatatypeOptions.length?this.propertyDatatypeOptions[0].value:"",
                "propertyTypeWarnings":null,
                "propertyLength":"",
                "propertyDesc":"",
                "isPrimaryKey":"",
                "isPrimaryKeyWarnings":null,
                isPrimaryKeyRadioValue:'',
                primaryKeyRadios:this.getPrimaryKeyRadios(),
                "status":"",
                "securityLevel":"A",
                "securityLevelWarnings":null
            },
            //实体数据
            relationModelRecorder:$.extend(true,{}, this.defaultRecorder),
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
    methods: {
        /**
         * 验证实体基本信息
         * @returns {boolean}
         */
        validateRelationBaseInfo(){
            this.clearwarnings();
            var codeRes=validateUtils.relationCode(this.relationModelRecorder.relationCode);
            if(!codeRes.success){
                this.relationModelRecorder.relationCodeWarnings=[codeRes.msg];
            }
            var nameRes=validateUtils.relationName(this.relationModelRecorder.relationName);
            if(!nameRes.success){
                this.relationModelRecorder.relationNameWarnings=[nameRes.msg];
            }
            let start=true,end=true;
            if( this.relationModelRecorder.relationStart==""||this.relationModelRecorder.relationStart==null){
                this.relationModelRecorder.startEntityNameWarnings=['必填项']
                start=false;
            }
            if( this.relationModelRecorder.relationEnd==""||this.relationModelRecorder.relationEnd==null){
                this.relationModelRecorder.endEntityNameWarnings=['必填项']
                end=false;
            }
            return codeRes.success&&nameRes.success&&start&&end;
        },
        clearRelationPropertyWarnings(){
            this.relationModelRecorder.propertyList.forEach((colm)=>{
                for(let k in colm){
                    if(k.indexOf('Warnings')>-1){
                        colm[k]=null;
                    }
                }
            });
        },
        /**
         * 验证实体属性信息
         * @returns {boolean}
         */
        validateRelationPropertyInfo(){
            this.clearRelationPropertyWarnings();
            let b1=true,b2=true;
            //{"propertyName","propertyCode", "propertyType"，"propertyLength，"propertyDesc"，"isPrimaryKey"，"status"，"securityLevel" }
            this.relationModelRecorder.propertyList.forEach((o,i)=>{
                for(let key in o){
                    let fun= validateUtils[key];
                    if(fun){
                        let res=fun(o[key]);
                        if(!res.success){
                            o[`${key}Warnings`]=[res.msg];
                            b1=false;
                        }
                    }

                }
            })
            b2=validateUtils.propertyListCodeRepeat(this.relationModelRecorder.propertyList);
            if(b2.success){
                this.relationModelRecorder.propertyList[b2.index].propertyCodeWarnings=['字段内容重复'];
            }
            return b1&&!b2.success;
        },
        /**
         * 清空告警
         */
        clearwarnings(){
            for(let key in this.relationModelRecorder){
                if(key.indexOf('Warnings')>-1){
                    this.relationModelRecorder[key]=null;
                }
            }
        },
        deleteField(rec){
            let index=  this.relationModelRecorder.propertyList.indexOf(rec);
            if(index>-1){
                this.relationModelRecorder.propertyList.splice(index,1);
            }
            console.log('deleteField hasPrimaryKey',this.hasPrimaryKey())
            if(!this.hasPrimaryKey()){
                let newRec=this.relationModelRecorder.propertyList[0];
                if(newRec){
                    let radiosRec=newRec.primaryKeyRadios[0];
                    newRec.isPrimaryKeyRadioValue=radiosRec.value;
                    newRec.isPrimaryKey=1;
                }
                console.log(this.relationModelRecorder.propertyList)
            }
        },
        hasPrimaryKey(){
            let flag=  false;
            flag=  !this.relationModelRecorder.propertyList.every(pro=>{
                return !(pro.isPrimaryKey==1)
            })
            return flag;
        },
        insertNewField (type) {
            let newlist={
                "propertyName":"",
                    "propertyNameWarnings":null,
                    "propertyCode":"",
                    "propertyCodeWarnings":null,
                    "propertyType":this.propertyDatatypeOptions.length?this.propertyDatatypeOptions[0].value:"",
                    "propertyTypeWarnings":null,
                    "propertyLength":"",
                    "propertyDesc":"",
                    "isPrimaryKey":0,
                    "isPrimaryKeyWarnings":null,
                    isPrimaryKeyRadioValue:'',
                    primaryKeyRadios:this.getPrimaryKeyRadios(),
                    "status":"",
                    "securityLevel":"A",
                    "securityLevelWarnings":null
            };
            this.relationModelRecorder.propertyList.push(newlist)
        },
        getPrimaryKeyRadios(){
            let value=_.uuid(64)+new Date().getTime();
            let text='是';
            return [{ text, value }];
        },
        clickPrimaryKeyRadio(recoder){
            console.log('clickPrimaryKeyRadio',recoder)
            this.relationModelRecorder.propertyList.forEach((o,i)=>{
                let v=o.primaryKeyRadios[0].value
                o.isPrimaryKey=recoder.value==v?1:0;
                o.isPrimaryKeyRadioValue=recoder.value==v?v:"";
                console.log(o)
            })
        },
        message(txt){
            Toast( {message: txt,
                duration: 2000})
        },
        messageAlert(msg,handler){
            MessageBox({
                message:msg,
                type: 'alert',
                confirm () {
                    handler&&handler();
                }
            })
        }

    }

}