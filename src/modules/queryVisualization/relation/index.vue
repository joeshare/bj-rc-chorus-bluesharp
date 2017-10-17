<style lang="scss">
    .queryvisualization-relation{
    margin-top: 10px;;
    font-size:14px;
    .marg-top{margin-top: 10px;}
    .marg-conent{margin-top: 10px;margin-left: 25px;padding-bottom: 20px;
    .select-lable{display: inline-block; float: left;margin-right: 10px; line-height: 25px;}
    .mult-lable{display: inline-block; float: left;margin-right: 10px; line-height: 25px;}
    .mult-and{ cursor: pointer;border: 1px solid #ccc;margin-left: -5px;width:40px;display: inline-block; text-align:center; background-color:#0e9ee2;color:white; padding:3px 6px; }
    .mult-or{ cursor: pointer;border: 1px solid #ccc;margin-left: -5px; width:40px;display: inline-block;text-align:center; padding:3px 6px;}
    .condition{position: relative;clear: both;
    .cond-line{border-left:1px solid #ccc;border-bottom:1px solid #ccc; width: 70px; height: 30px;left: 160px;position: absolute; }
    .cond-lab{ cursor: pointer;top: 20px;left: 140px;position: absolute; border: 1px solid #ccc;width:40px;display: inline-block; text-align:center; background-color:#0e9ee2;color:white; padding:3px 6px; }
    .cond-text{display: inline-block;max-height: 32px;line-height: 32px;vertical-align: super;}
    .cond-marg{margin-left: 230px;margin-top: 16px;}
    .cond-edit{width: 180px;line-height:28px;}
    .showbtn{display: none;line-height:20px; overflow: hidden;}
    }
    .condition:hover{
    .showbtn{display: inline-block;}
    }
    .add-new{position: relative; height: 30px;
    .add-block{border-left: 1px solid #ccc; height: 20px;    position: absolute;left: 160px;}
    .add-batton{font-size: x-large;color: #a7a49f;position: absolute;left: 150px;top: 15px;}
    .add-batton:hover{color: #0e9ee2; cursor: pointer;}
    }
    }
    }
</style>
<template>
    <div class="queryvisualization-relation">
        <div style="color:#9e9c9c;">你想要查看哪些关系进行查询？</div>

        <div class="marg-top"><span class="ion-link" style="color: #0e9ee2;font-size: large;"></span><span style="padding-left: 10px;">关系</span> </div>
        <div class="marg-conent">
            <div>
                <div class="select-lable">选择一个关系模型</div>
                <ad-select :small="true" @select="entityselect" :disabled="$parent.isSnapshoot" placeholder="请选择"  :options="$parent.queryentity.edgeInput.add_edgeOption" v-model="$parent.queryentity.edgeInput.add_edgeOption_select"></ad-select>
            </div>

            <div style="margin-top: 10px;">
                <div class="mult-lable">属性筛选（可选）</div>
                <div style="padding-left: 126px;width:200px;" v-if="$parent.queryentity.edgeInput.ruleType == 'and'" @click="checkmodule">
                    <span class="mult-and">and</span>
                    <span class="mult-or">or</span>
                </div>
                <div style="padding-left: 126px;width:200px;" v-else  @click="checkmodule">
                    <span class="mult-or">and</span>
                    <span class="mult-and">or</span>
                </div>
            </div>

            <div v-for="entity in $parent.queryentity.edgeInput.properties" class="condition" >
                <div class="cond-line"></div>
                <span class="cond-lab">{{$parent.queryentity.edgeInput.ruleType}}</span>
                <ad-select :small="true"  @select="propertyselect($event,entity)" :disabled="$parent.isSnapshoot" style="width:160px;" class="cond-marg" :options="$parent.queryentity.edgeInput.add_nameOption" v-model="entity.add_nameOption_select"></ad-select>
                <ad-select :small="true" @select="oprationselect($event,entity)" :disabled="$parent.isSnapshoot" style="width:100px;" :options="entity.add_ruleoption" v-model="entity.add_ruleoption_select"></ad-select>
                <div  class="cond-text">
                    <div v-for="(valobj,index) in entity.add_values" style="display: inline-block; vertical-align:inherit;">
                        <span v-if="index==1" style="margin-left:10px;">-</span>
                        <ad-input-edit :disabled="$parent.isSnapshoot" v-if="valobj.type!='date'" class="cond-edit" style="margin-left: 10px; line-height: 10px;" :warnings="valobj.warnings" placeholder="" value="" v-model="valobj.value" :small="true"  maxlength="20" icon="ion-ios-search"></ad-input-edit>

                        <admin-datepicker :disabled="$parent.isSnapshoot" v-else label="" :small="true"  :warnings="valobj.warnings" style="margin-left: 10px;line-height: 10px; width:180px;" v-model="valobj.value"  ></admin-datepicker>
                    </div>
                </div>
                <span class="ion-ios-close-empty showbtn"   @click="removeentity(entity)" style="font-size: x-large; margin-left: 5px; cursor: pointer;"></span>
            </div>

            <div class="add-new">
                <div class="add-block"></div>
                <span class="ion-android-add-circle add-batton" @click="addcondition()"></span>
            </div>
        </div>
    </div>
</template>
<script>
    import adSelect from '../../../admin-ui-extend/components/admin-select-object.vue'
    import adInputEdit from '../../../admin-ui-extend/components/admin-input-edit.vue'
    import adminDatepicker from 'adminUI/components/admin-datepicker'
    import {queryentityselect,propertyselectlist,operatorlistbytype,queryrelationselect} from '../utils/fetchtAgent.js'
    export default {
        components: {
            adSelect,
            adInputEdit,
            adminDatepicker
        },
        created() {
           // let _this =this;
            //let projectInfo=_.currentProjectInfo.get();


        },
        data () {
            return {
                hasover:false,
                objectType:{
                    "java.lang.String":{type:'string',regx:"^.+$",warning:['输请入内容']},
                    "java.lang.Integer":{type:'int',regx:"^[0-9]\\d*$",warning:['数字类型不正确']},
                    "java.lang.Long":{type:'long',regx:"^[0-9]\\d*$",warning:['Long类型不正确']},
                    "java.util.Date":{type:'date',regx:"^([1-9]\\d{3})-(([1-9])|1[0-2])-([1-9]|[1-2][0-9]|3[0-1])$",warning:['日期格式不正确']},
                    "java.lang.Double":{type:'double',regx:"^[0-9]+(\\.[0-9]+)$",warning:['Double类型不正确']},
                    "java.lang.Boolean":{type:'bool',regx:"^true|false$",warning:['Bool类型不正确']}
                }
            }
        },
        methods: {
            initrelation(){
                    let _this =this;
                    let temparray = [];
                    queryrelationselect({startEntityId:this.$parent.queryentity.vertexInputA.vertexCode},(res)=>{
                        res.data&&res.data.forEach((m)=>{
                        temparray.push({text:m.relationName,value:m});
                    });
                    if(temparray.length>0){
                        _this.$parent.queryentity.edgeInput.add_edgeOption = temparray;
                        _this.$parent.queryentity.edgeInput.add_edgeOption_select = temparray[0].value;
                        _this.$parent.queryentity.edgeInput.edgeCode = temparray[0].value.dataId;
                        _this.initproperty();
                        _this.$parent.$refs.refeneityb.initeneityb();
                    }else{
                        _this.$parent.queryentity.vertexInputB={
                            "vertexCode": "",
                            "add_vertexOption_select":null,
                            "add_vertexOption":[],
                            "add_nameOption":[],
                            "properties": [],
                            "ruleType": "and"
                        }
                    }
                });
            },
            initproperty(){
                let _this =this;
                let temproperlist=[];
                propertyselectlist({
                    "propertyName":"",
                    "busType":1,
                    "dataId":this.$parent.queryentity.edgeInput.edgeCode
                },(res)=>{
                    res.data.forEach((m)=>{
                    temproperlist.push({text:m.propertyName,value:m});
            });
                _this.$parent.queryentity.edgeInput.add_nameOption =temproperlist;
            });
            },
            checkmodule(){
                if(!this.$parent.isSnapshoot)
                {
                    this.$parent.queryentity.edgeInput.ruleType=this.$parent.queryentity.edgeInput.ruleType=='and'?'or':'and';
                }
            },
            addcondition(){
                if(this.$parent.queryentity.edgeInput.edgeCode&&!this.$parent.isSnapshoot){
                    this.$parent.queryentity.edgeInput.properties.push({
                        "name": "",
                        "values": [],
                        "rule": "",
                        "add_nameOption_select":null,
                        "add_ruleoption":[],
                        "add_ruleoption_select":null,
                        "add_values":[]
                    });
                }
            },
            removeentity(entity){
                if(!this.$parent.isSnapshoot) {
                    let tempprop = this.$parent.queryentity.edgeInput.properties;
                    this.$parent.queryentity.edgeInput.properties = tempprop.filter((m) => {return entity != m}
                );
                }
            },
            entityselect(entity){
                if (this.$parent.queryentity.edgeInput.edgeCode != entity.value.dataId) {
                    this.$parent.queryentity.edgeInput.edgeCode = entity.value.dataId;
                    this.$parent.queryentity.edgeInput.properties = [];
                    this.initproperty();
                    this.$parent.queryentity.vertexInputB = {
                        "vertexCode": "",
                        "add_vertexOption_select": null,
                        "add_vertexOption": [],
                        "add_nameOption": [],
                        "properties": [],
                        "ruleType": "and"
                    }
                    this.$parent.$refs.refeneityb.initeneityb();
                }
            },
            propertyselect(prop,entity){
                entity.name = prop.value.propertyName;
                let temparray = [];
                let _this = this;
                operatorlistbytype({propertyType:prop.value.propertyType},(res)=>{
                    res.data.forEach((m)=>{
                    temparray.push({text:m.operatorName,value:m});
            });
                entity.add_ruleoption = temparray;

                if(temparray.length>0){
                    _this.oprationselect(temparray[0],entity);
                    entity.add_ruleoption_select = temparray[0].value;
                }
            });
            },
            oprationselect(prop,opration){
                console.log('----------',prop);
                let opra = prop.value;
                opration.rule  = opra.operatorCode;
                //opration.add_nameOption_select.propertyType
                let insertobj ={warnings:null,value:'',
                    regx:this.objectType[opration.add_nameOption_select.propertyType].regx,
                    warningstr:this.objectType[opration.add_nameOption_select.propertyType].warning,
                    type:this.objectType[opration.add_nameOption_select.propertyType].type};
                let insertobj2= JSON.parse(JSON.stringify(insertobj));

                insertobj2.regx=this.objectType[opration.add_nameOption_select.propertyType].regx
                opration.add_values=[insertobj];
                switch (opra.webModule){
                    case 'input':
                        break;
                    case 'input2':
                        opration.add_values.push(insertobj2);
                        break;
                    case 'date':
                        opration.add_values.push(insertobj2);
                        break;
                    case 'bool':
                        opration.add_values=[];
                        break;
                }
            }
        }
    }
</script>