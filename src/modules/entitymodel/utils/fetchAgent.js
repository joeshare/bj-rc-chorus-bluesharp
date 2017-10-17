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
 * 获取实体
 * @param arg
 * @param cb
 */
function getEntityInfo(entityId,cb){
    _.ajax({
        url:'/api/entitymodel/getentityinfo',
        method:'POST',
        data:{entityId},
        success:function(res){
            cb&&cb(res)
        },
        error(res){
            cb&&cb(res);
        }
    })
};

/**
 * 获取实体列表
 * @param arg
 * @param cb
 */
function getEntityList(arg,cb){
    _fetch('/api/entitymodel/getentitylist',arg,cb)
};

/**
 * 模糊查询实体信息
 * @param arg
 * @param cb
 */
function getAllEntities(arg,cb){
    _.ajax({
        url:'/api/entitymodel/getallentities',
        method:'POST',
        data:arg,
        success:function(res){
            cb&&cb(res)
        },
        error(res){
            cb&&cb(res);
        }
    })
};
/**
 *  获取实体类型
 * @param arg
 * @param cb
 */
function getEntityTypeList(arg,cb){
    _fetch('/api/entitymodel/getentitytypelist',arg,cb)
};

/**
 * 获取数据类型
 * @param arg
 * @param cb
 */
function getDataTypeList(arg,cb){
    _fetch('/api/entitymodel/getdatatypelist',arg,cb)
};

/**
 * 创建实体
 * @param arg
 * @param cb
 */
function createEntity(arg,cb){
    _fetch('/api/entitymodel/createentity',arg,cb)
};
/**
 * 修改实体
 * @param arg
 * @param cb
 */
function saveEntityInfo(arg,cb){
    _fetch('/api/entitymodel/saveentityinfo',arg,cb)
}
export default {
    saveEntityInfo,
    createEntity,
    getDataTypeList,
    getEntityTypeList,
    getAllEntities,
    getEntityList,
    getEntityInfo
}

