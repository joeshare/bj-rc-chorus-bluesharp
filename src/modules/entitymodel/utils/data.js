/**
 * Created by AnThen on 2017-4-10.
 */

/**
 * 清空数据
 * @param recoder
 */
function emptyEntityModelRecoder(recoder){
    for(let key in recoder){
        let val= recoder[key];
        if($.isArray(val)){
            while(val.length){
                val.splice(0,1)
            }
        }else if(key.indexOf('Warnings')>-1){
            recoder[key]=null;
        }else{
            recoder[key]="";
        }

    }
}

function entityType2Options(arr){
    let result=[];
    arr.forEach(o=>{
        result.push({
            value: o.entityTypeCode,
            text: o.entityTypeName,
            tips: o.entityTypeDesc
        })
    })
    return result;
}
function datatype2Options(arr){
    let result=[];
    arr.forEach(o=>{
        result.push({
            value: o.typeCode,
            text: o.typeName
        })
    })
    return result;
}
function getSubmitData(data){
    let res=$.extend(true,{},data);
    res.propertyList=JSON.stringify(res.propertyList);
    res['projectCode']=_.currentProjectCode.get();
    return res;
}

function setPropertyListData(list){
    list.forEach(o=>{
        if(o.isPrimaryKey==1){
            let v=o.primaryKeyRadios[0].value;
            o.isPrimaryKeyRadioValue=v;
        }
    })
}
export default {
    emptyEntityModelRecoder,
    entityType2Options,
    datatype2Options,
    getSubmitData,
    setPropertyListData

}

