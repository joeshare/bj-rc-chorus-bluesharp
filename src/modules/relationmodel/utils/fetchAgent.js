/**
 * Created by AnThen on 2017-4-10.
 */
function _fetch(url,arg,cb){
    _.ajax({
        url:url,
        method:'POST',
        data:arg,
        success:function(res){
            cb&&cb(res)
        },
        error(res){
            cb&&cb(res);
        }
    })
}
/**
 * 列表
 * @param arg
 * @param cb
 */
function getRelationList(arg,cb){
    _fetch('/api/relationmodel/getrelationlist',arg,cb);
};
/**
 * 获取数据类型
 * @param arg
 * @param cb
 */
function getDataTypeList(arg,cb){
    _fetch('/api/entitymodel/getdatatypelist',arg,cb);
};
/**
 * 创建关系
 * @param arg
 * @param cb
 */
function createRelation(arg,cb){
    _fetch('/api/relationmodel/createrelation',arg,cb);
}
/**
 * 详细信息
 * @param arg
 * @param cb
 */
function getRelationInfo(arg,cb){
    _fetch('/api/relationmodel/getrelationinfo',arg,cb);
}
/**
 * 修改信息
 * @param arg
 * @param cb
 */
function saveRelationInfo(arg,cb){
    _fetch('/api/relationmodel/saverelationinfo',arg,cb);
}
/**
 * 查询实体信息
 * @param arg
 * @param cb
 */
function getAllEntities(arg,cb){

    _fetch('/api/relationmodel/getallentities',arg,cb);
}
export default {
    getDataTypeList,
    getRelationList,
    createRelation,
    getRelationInfo,
    saveRelationInfo,
    getAllEntities

}

