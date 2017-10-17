/**
 * Created by AnThen on 2017-8-8.
 */
exports.fetchChartData=(data,cb)=>{
    _.ajax({
        url:'/api/queryvisualization/querydatachart',
        method:'POST',
        data,
        success:function(res){
            cb&&cb(res)
        },
        error:function(res){
            cb&&cb(res)
        }
    })

}
//实体
exports.queryentityselect=(data,cb)=>{
    _.ajax({
        url:'/api/queryvisualization/queryentityselect',
        method:'POST',
        data,
        success:function(res){
            cb&&cb(res)
        },
        error:function(res){
            cb&&cb(res)
        }
    })

}

//关系
exports.queryrelationselect=(data,cb)=>{
    _.ajax({
        url:'/api/queryvisualization/queryrelationselect',
        method:'POST',
        data,
        success:function(res){
            cb&&cb(res)
        },
        error:function(res){
            cb&&cb(res)
        }
    })

}
//属性
exports.propertyselectlist=(data,cb)=>{
    _.ajax({
        url:'/api/queryvisualization/propertyselectlist',
        method:'POST',
        data,
        success:function(res){
            cb&&cb(res)
        },
        error:function(res){
            cb&&cb(res)
        }
    })

}

//操作符
exports.operatorlistbytype=(data,cb)=>{
    _.ajax({
        url:'/api/queryvisualization/operatorlistbytype',
        method:'POST',
        data,
        success:function(res){
            cb&&cb(res)
        },
        error:function(res){
            cb&&cb(res)
        }
    })

}

//保存规则
exports.saverule=(data,cb)=>{
    _.ajax({
        url:'/api/queryvisualization/save',
        method:'POST',
        data,
        success:function(res){
            cb&&cb(res)
        },
        error:function(res){
            cb&&cb(res)
        }
    })

}

//读取规则
exports.getrule=(data,cb)=>{
    _.ajax({
        url:'/api/queryvisualization/getsnap',
        method:'POST',
        data,
        success:function(res){
            cb&&cb(res)
        },
        error:function(res){
            cb&&cb(res)
        }
    })

}