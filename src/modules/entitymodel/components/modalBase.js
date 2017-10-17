/**
 * Created by AnThen on 2017-5-3.
 */
/**
 * Created by AnThen on 2017-3-3.
 */
import Toast from 'adminUI/components/admin-toast/index';
import dataUtils  from '../utils/data';
import validateUtils  from '../utils/validate.js';
import MessageBox from 'adminUI/components/admin-message-box/index'
import CONSTANT from 'Utils/constant'
export default {
    name: 'model-base',
    data () {
        let _this =this;
        return {
            datalist:[],
            disabled:true,
            modifyFormShow:this.open,
            defaultRecorder:{
                entityCode:"",
                entityCodeWarnings:null,
                entityName:"",
                entityNameWarnings:null,
                entityType:"",
                entityDesc:"",
                entityDescWarnings:null,
                projectCode:"",
                userId:"",
                userName:"",
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
            entityModelRecorder:$.extend(true,{}, this.defaultRecorder,this.entityRecorder),
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
        validateEntityBaseInfo(){
            this.clearwarnings();
            var codeRes=validateUtils.entityCode(this.entityModelRecorder.entityCode);
            if(!codeRes.success){
                this.entityModelRecorder.entityCodeWarnings=[codeRes.msg];
            }
            var nameRes=validateUtils.entityName(this.entityModelRecorder.entityName);
            if(!nameRes.success){
                this.entityModelRecorder.entityNameWarnings=[nameRes.msg];
            }
            return codeRes.success&&nameRes.success;
        },
        clearEntityPropertyWarnings(){
            this.entityModelRecorder.propertyList.forEach((colm)=>{
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
        validateEntityPropertyInfo(){
            this.clearEntityPropertyWarnings();
            let b1=true,b2=true;
            //{"propertyName","propertyCode", "propertyDatatype"，"propertyLength，"propertyDesc"，"isPrimaryKey"，"status"，"securityLevel" }
            this.entityModelRecorder.propertyList.forEach((o,i)=>{
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
            b2=validateUtils.propertyListCodeRepeat(this.entityModelRecorder.propertyList);
            if(b2.success){
                this.entityModelRecorder.propertyList[b2.index].propertyCodeWarnings=['字段内容重复'];
            }
            return b1&&!b2.success;
        },
        /**
         * 清空告警
         */
        clearwarnings(){
            for(let key in this.entityModelRecorder){
                if(key.indexOf('Warnings')>-1){
                    this.entityModelRecorder[key]=null;
                }
            }
        },
        deleteField(rec){
            let index=  this.entityModelRecorder.propertyList.indexOf(rec);
            if(index>-1){
                this.entityModelRecorder.propertyList.splice(index,1);
            }
            console.log('deleteField hasPrimaryKey',this.hasPrimaryKey())
            if(!this.hasPrimaryKey()){
                let newRec=this.entityModelRecorder.propertyList[0];
                if(newRec){
                    let radiosRec=newRec.primaryKeyRadios[0];
                    newRec.isPrimaryKeyRadioValue=radiosRec.value;
                    newRec.isPrimaryKey=1;
                }
                console.log(this.entityModelRecorder.propertyList)
            }
        },
        hasPrimaryKey(){
            let flag=  false;
            flag=  !this.entityModelRecorder.propertyList.every(pro=>{
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
            if(!this.hasPrimaryKey()){
                newlist.isPrimaryKey=1;
                newlist.isPrimaryKeyRadioValue=newlist.primaryKeyRadios[0].value;
            }
            console.log(newlist.isPrimaryKeyRadioValue)
            this.entityModelRecorder.propertyList.push(newlist)
        },
        getPrimaryKeyRadios(){
            let value=_.uuid(64)+new Date().getTime();
            let text='是';
            return [{ text, value }];
        },
        clickPrimaryKeyRadio(recoder){
            console.log('clickPrimaryKeyRadio',recoder)
            this.entityModelRecorder.propertyList.forEach((o,i)=>{
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