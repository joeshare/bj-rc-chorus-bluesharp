/**
 * Created by AnThen on 2017-8-8.
 */
let relativePointArr=[];
let _canvasScale=1;
let _canvasUpdateStatus;
let _canvasModel=null;
const CIRCLE_RADIUS=25;

exports.circleRadius=CIRCLE_RADIUS;
let _testHit=(x,y,ctx)=>{
    console.log('_testHit',x,y)
    var hit=false;
    try {
        hit= ctx.getImageData(x,y, 1, 1).data[3] > 1;
    } catch (e) {
        console.log(e)
    }
    return hit;
};
function testHit(x,y,ctx,draw,hitCan){
    draw(ctx);
    var hit = _testHit(x,y,ctx);
    ctx.clearRect(0, 0, hitCan.width+1,  hitCan.height+1);
    return  hit;
}
/**
 * 根据原点坐标及弧度 获取新坐标点
 * @param orPos 原点坐标 {x,y}
 * @param rad 弧度
 * @param radius 半径
 * @returns {{}}
 */
function _getPosByRad(orPos, rad, radius) {
    var x = radius * Math.cos(rad) + orPos.x,
        y = radius * Math.sin(rad) + orPos.y;
    return {
        x: x,
        y: y
    };
}
/**
 * 获取指定点的夹角弧度
 * @param originalX  原点x
 * @param originalY 原点y
 * @param pointX 某点x
 * @param pointY 某点y
 * @returns {number} 弧度
 */
function _angle(originalX, originalY, pointX, pointY) {
    var diff_x = pointX - originalX,
        diff_y = pointY - originalY,
//返回角度,不是弧度 （Math.atan(diff_y/diff_x) 获取的是弧度）
        rad=Math.atan(diff_y/diff_x);
    if((diff_x <0&&diff_y >=0)||(diff_x <0&&diff_y <0)){
        rad+=Math.PI;
    }else if(diff_x >=0&&diff_y <0){
        rad+=2*Math.PI;
    }
    return rad;
}
/**
 *  获取中间点
 * @param x1
 * @param y1
 * @param x2
 * @param y2
 * @returns {{x: number, y: number}}
 * @private
 */
function _getMidpoint(x1,y1,x2,y2){
    return {
        x:x2/2+x1/2,
        y:y2/2+y1/2
    };
}
/**
 * 获取两点距离
 * @param bx
 * @param by
 * @param ex
 * @param ey
 * @returns {number}
 */
function _distance(bx, by, ex, ey) {
    var _x = Math.abs(bx - ex);
    var _y = Math.abs(by - ey);
    var sum = Math.pow(_x, 2) + Math.pow(_y, 2);
    return Math.sqrt(sum);
}
function _getWayPoints(pt1,pt0,pointNum) {
    var waypoints = [];
    var dx = pt1.x - pt0.x;
    var dy = pt1.y - pt0.y;
    var num=pointNum||100
    for (var j = 0; j <  num; j++) {
        var x = pt0.x + dx * j / num;
        var y = pt0.y + dy * j / num;
        waypoints.push({
            x: x,
            y: y
        });
    }
    return waypoints;
}
function _randomInArray(array){
    let i=Math.floor(Math.random() * array.length);
    let rec=array[i];
    array.splice(i,1)
   return rec;
}

exports.getMidpoint=_getMidpoint;
exports.angle=_angle;
exports.getPosByRad=_getPosByRad;
exports.distance=_distance;
exports.getWayPoints=_getWayPoints;
exports.testHit=testHit;
/**
 *  获取10个新坐标点
 * @param orPos
 * @param rad
 * @param radius
 * @returns {Array}
 * @private
 */
function _getPosArrByRad(orPos,rad,radius){
    let i=5;
    let arr=[];
    while(i--){
       let r=rad+i*2*Math.PI/5;
       let p= _getPosByRad(orPos,r,radius);
        arr.push(p)
    }
    return arr;
}

/**
 * 随机点坐标
 * @param w
 * @param h
 * @returns {{}}
 * @private
 */
function _randomPoint ({w, h,r}) {
    const x = parseInt(Math.random() * (w-2*r)+r)
    const y = parseInt(Math.random() * (h-2*r)+r)
    return {x, y}
}

// 生成相关随机点（已指定点位相对点生成新点）
function _randomRelativePoint (prev, radius) {
    //直径长度
    const dia = radius * 2
    const xGap = Math.random() * (dia * 2)
    //随机生成的x坐标是在指定点x 左右2r 的范围内 随机出现
    // |-----r----|-----r-----x-----r----|-----r----- |
    const x = parseInt(xGap + prev.x - dia)
    // 随机产生正负
    const sign = Math.random() - 0.5 > 0 ? 1 : -1
    //根据新的x坐标算出新的y坐标
    const yGap = parseInt(Math.sqrt(dia * dia - (prev.x - x) * (prev.x - x)))
    const y = yGap * sign + prev.y
    return {x, y}
}

// 判断两个区域是否重叠
function _testOverlay (pointA, pointB, radius) {
    const x = Math.abs(pointA.x - pointB.x)
    const y = Math.abs(pointA.y - pointB.y)
    const distance = Math.sqrt((x * x) + (y * y))
    if (distance >= radius * 2) {
        return false
    } else {
        return true
    }
}
/**
 * 判断是否点中目标全
 * @param arr 所有点数组
 * @param point 测试点坐标
 * @param radius 半径
 * @returns {object}
 */
exports.testHitInArray=(arr,point,radius)=>{
   let resPointer=null;
    for(let key of Object.keys(arr)){
        let pointA=arr[key];
        if(_testOverlay(pointA,point,radius)){
            resPointer=pointA;
           break;
        }
    }

   return resPointer;
}
// 判断新生成的点是否有效
function _testAvailable (pointArr, newPoint, radius, size) {
    if (newPoint.x < 0 || newPoint.x > size.w || newPoint.y < 0 || newPoint.y > size.h) {
        return false
    }
    let arr = Array.from(pointArr)
    let aval = true
    while(arr.length > 0) {
        let lastPoint = arr.pop()
        if (_testOverlay(lastPoint, newPoint, radius)) {
            aval = false
            break;
        }
    }
    return aval
}

const MAX_REPEAT=50;
exports.getCircleArr=(canvas,radius,scale)=>{
    let pointArr=[];
    let relativePointArr=[];
    const size = {w: canvas.clientWidth*scale, h: canvas.clientHeight*scale,r:radius}
    let count = 0
    let relativeFlag = 0
    //max 可重复最大次数 如果不能重复，说明没有地方放置小球了
    while(count <= MAX_REPEAT) {
        let newPoint
        //相对位置标记
        if (relativeFlag) {
            if (relativePointArr.length > 0) {
                let lastPoint = relativePointArr.pop()
                //获取新的坐标点（相对随机）
                newPoint = _randomRelativePoint(lastPoint, radius, size)
            } else {
                relativeFlag = 0
                count = 0
            }
        } else {//相对位置生成与随机位置生成交替进行 （广度+随机的体现）
            newPoint = _randomPoint(size)
        }
        //新点没有和以前的有重叠就加入队列
        if (newPoint && _testAvailable(pointArr, newPoint, radius, size)) {
            pointArr.push(newPoint)
            relativePointArr.push(newPoint)
            //只要将节点放到队列里，就重新开始计数
            count = 0
            relativeFlag = !relativeFlag
        } else if (newPoint) {
            count += 1
        }


    };
    return pointArr;
}
function _getTextByLabelCode(arr,code){
    let text=""
    arr.every(a=>{
        if(a.code==code){
            text=a.value;
            return false;
        }
        return true;
    })
    return text;
}
/**
 * 设置中心点坐标
 * @param nodeMaps
 * @param vertexs
 */
exports.setCenterVertexPosition=(nodeMaps,vertexs)=>{
    let i=0;
    for(let id in nodeMaps){
        let node=nodeMaps[id];
        if(node.centerVertex){
            $.extend(node,vertexs[i])
            i++;
        }
    }

}
/**
 * 设置二级节点坐标
 * @param nodeMaps
 */
exports.setSubVertexPosition=(nodeMaps)=>{
    let arrP1=[];
    let arrP2=[];
    for(let id in nodeMaps){
        let node=nodeMaps[id];
        if(node.centerVertex){
            let baseRad=Math.random()*2*Math.PI;
            arrP1=  _getPosArrByRad(node,baseRad,CIRCLE_RADIUS*10.5)
            baseRad+=9*Math.PI/5;
            arrP2=  _getPosArrByRad(node,baseRad,CIRCLE_RADIUS*8)
            let sum=[].concat(arrP1,arrP2);
            if($.isArray(node.subVertexs)){
                node.subVertexs.forEach((subId,i)=>{
                   $.extend( nodeMaps[subId],_randomInArray(sum))
                })
            }
        }
    }

}
function _isCenterVertexInArr(arr,id){
   return !arr.every(point=>{
        let pointId=_getTextByLabelCode([].concat(point.properties,point.statisticses),'id')
        if(pointId==id&&point.centerVertex){
            return false;
        }
        return true;
    })
}
exports.chartData2NodeMap=(data)=>{
    let centerVertexs=[];
    let subVertexs=[];
    let isArrEdgeOutputs=$.isArray(data.edgeOutputs);
    let edges=isArrEdgeOutputs?JSON.parse(JSON.stringify(data.edgeOutputs)):[]
    let maps={};
    if($.isArray(data.vertexOutputs)){
        data.vertexOutputs.forEach(point=>{
            let id=_getTextByLabelCode([].concat(point.properties,point.statisticses),'id')
            maps[id]=point;
            maps[id]['subVertexs']=[];
            maps[id]['isVertex']=true;
            maps[id]['labelCode']=["id"];
            maps[id]['id']=id;
            let edgesLen=edges.length;
            while(edgesLen){
                --edgesLen
                let last=edges[edgesLen];
                //如果开始点是指定点ID
                if(`${last.fromVertexId}`==`${id}`){
                    //不是主定点
                    if(!_isCenterVertexInArr(data.vertexOutputs,last.endVertexId)){
                        maps[id]['subVertexs'].push(`${last.endVertexId}`);
                    }
                    edges.pop();
                }
            }
        })
    }
    isArrEdgeOutputs&&data.edgeOutputs.forEach(point=>{
        let id=_getTextByLabelCode([].concat(point.properties,point.statisticses),'id')
        maps[id]=point;
        maps[id]['isVertex']=false;
        maps[id]['id']=id;
        maps[id]['labelCode']=["id"];
    })
    return maps;
}
exports.getCenterVertexs=(modeMap)=>{
    let arr=[];
   for(let id of Object.keys(modeMap)){
       let node=modeMap[id];
       node.centerVertex&&arr.push(node)
   }
    return arr;
}
/**
 *
 * @param area 画布面积
 * @param num 主点数量
 * @returns {number}
 */
function getEdgeLengthBy(area,num){
    return Math.floor(Math.sqrt(area*0.4/num/Math.PI))
}
/**
 * 获取指点区域半径
 * @param num 主点数量
 * @param canvasDom 画布数量
 */
exports.getCenterPointAreaRadiusByNum=(num,canvasDom)=>{
    //圆点的最大半径
    let maxNodeRadius=CIRCLE_RADIUS;
    let maxPointAreaRadius=maxNodeRadius*11.5
    let cavW=canvasDom.width;
    let cavH=canvasDom.height;
    let area=cavW*cavH*0.4;
    //Math.PI * rid * rid
    let tempMaxPointAreaRadius=Math.floor(Math.sqrt(area/num/Math.PI))
     return (tempMaxPointAreaRadius<maxPointAreaRadius)?maxPointAreaRadius:tempMaxPointAreaRadius


}

exports.getPositionsByNum=(num,canvasDom)=>{
    //圆点的最大半径
    let maxNodeRadius=50;
    let maxEdgeLength=maxNodeRadius*9.5
    let minEdgeLength=maxNodeRadius*8;
    let cavW=canvasDom.width;
    let cavH=canvasDom.Height;
    let area=cavW*cavH*0.4;
    //Math.PI * rid * rid
    let tempMaxEdgeLength=Math.floor(Math.sqrt(area/num/Math.PI))
    let nodeRadius=(tempMaxEdgeLength<maxEdgeLength)?maxEdgeLength:tempMaxEdgeLength


}
exports.setUpdateStatus=(v)=>{
    _canvasUpdateStatus=v;
}
exports.getUpdateStatus=()=>{ return _canvasUpdateStatus}
exports.setCanvasScale=(v)=>{ _canvasScale=v}
exports.getCanvasScale=()=>{ return _canvasScale}
exports.getCanvasModel=()=>{ return _canvasModel;}
exports.setCanvasModel=(v)=>{ _canvasModel=v}
