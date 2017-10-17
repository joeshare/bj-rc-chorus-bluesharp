/**
 * Created by AnThen on 2017-8-9.
 */
import {setUpdateStatus,getUpdateStatus,circleRadius,
    testHitInArray,getCanvasScale,testHit,getCanvasModel} from '../utils/chartDataUtil.js'
const FONT_COLOR='#fff';
const STROKE_COLOR1='RGBA(230,70,70,1)';
const STROKE_COLOR2='RGBA(130, 38, 38,1)';
const FILL_COLOR1='RGBA(226,119,119,1)';
const FILL_COLOR2='RGBA(199,60,60,1)';
const LINE_WIDTH=2;
function _getVertexs(nodes){
    let arr=[];
    for(let id in nodes){
        if(nodes[id].isVertex){
            arr.push(nodes[id])
        }

    }
    return arr;

}
function drawDashCircle({ctx,point,radius}){
    let labelCode=$.isArray(point.labelCode)?point.labelCode[0]:"";
    ctx.save();
    ctx.setLineDash([10,7]);
    ctx.beginPath();
    ctx.strokeStyle=STROKE_COLOR1;
    ctx.fillStyle=FILL_COLOR1;
    ctx.lineWidth=LINE_WIDTH;
    ctx.arc(point.x, point.y, radius, 0, Math.PI * 2, true)
    ctx.fill();
    ctx.stroke();
    ctx.restore();
    ctx.save();
    ctx.fillStyle=FONT_COLOR;
    ctx.font="normal small-caps 8px";//"normal bolder 10px icon";
    ctx.textBaseline="middle"
    ctx.textAlign="center";
    let fillText=getTextByLabelCode([].concat(point.properties,point.statisticses),labelCode);
    let strLen=_.strLength(`${fillText}`)
    if(strLen>8){
        fillText=` ${fillText.substr(0,5)}...`;
    }
    ctx.fillText(fillText,point.x,point.y);
    ctx.restore();
}
function drawLineCircle({ctx,point,radius}){
    let labelCode=$.isArray(point.labelCode)?point.labelCode[0]:"";
    ctx.save();
    ctx.beginPath();
    ctx.strokeStyle=STROKE_COLOR2;
    ctx.lineWidth=LINE_WIDTH;
    ctx.fillStyle=FILL_COLOR2;
    ctx.arc(point.x, point.y, radius, 0, Math.PI * 2, true)
    ctx.fill();
    ctx.stroke();
    ctx.restore();
    ctx.save();
    ctx.fillStyle=FONT_COLOR;
    ctx.font="normal small-caps 8px";//"normal bolder 10px icon";
    ctx.textBaseline="middle"
    ctx.textAlign="center";
    let fillText=getTextByLabelCode([].concat(point.properties,point.statisticses),labelCode);
    let strLen=_.strLength(`${fillText}`)
    if(strLen>8){
        fillText=` ${fillText.substr(0,5)}...`;
    }
    ctx.fillText(fillText,point.x,point.y);
    ctx.restore();
}
function getCenterNodes(nodes){
    let arr=[];
    for(let id in nodes){
        let n=nodes[id];
        if(n.centerVertex){
            arr.push(n)
        }
    }
    return arr;
}
function getTextByLabelCode(arr,code){
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
// 绘制圆形
/**
 *
 * @param ctx
 * @param centerPositionArr 中心坐标
 * @param radius
 * @param nodes 全部点数据
 */
function drawCircles ({ctx,radius,nodes}) {
    for(let id in nodes){
      let point=  nodes[id]
        if(point.isVertex&&point.centerVertex){
            drawLineCircle({ctx,point,radius})
        }else{
            drawDashCircle({ctx,point,radius})
        }
    }

}
function drawCircleDraw(ctx){
    ctx.save();
    let radius=this.radius;
    let nodes=this.nodes;
    drawCircles({ctx,radius,nodes})
    ctx.restore();
}
exports.createPoint=({nodeMaps,canvas,view})=>{
    var circleBrush=new createjs.Brush({
        id:'brushVertex',
        name:'brushVertex',
        x:0,
        y:0,
        canvas,
        radius:circleRadius,
        nodes:nodeMaps,
        view,
        strokeStyle:'#e64646',
        fillStyle:'#ffe1e1',
        draw:drawCircleDraw,
        visible:true,
        cursor:'pointer',
        disabled:false,
        listeners:{
            'rollover':function(e){
                if(this.disabled){  return; }
            },
            'rollout':function(e){
                if(this.disabled){  return; }
            },
            'click':function(e){
                if(this.disabled){  return; }
                let [x,y]=[e.stageX/getCanvasScale(),e.stageY/getCanvasScale()];
                let nodes=this.nodes
                let vertexs=_getVertexs(nodes)
                for(let point of vertexs){
                    if(!point){  continue; }
                    let canvasModel=getCanvasModel();
                    let testCtx=canvasModel.getHitCtx();

                    let bHit=testHit(e.stageX,e.stageY,testCtx,(ctx)=>{
                        let radius=circleRadius
                        point.centerVertex?drawLineCircle({ctx,point,radius}):drawDashCircle({ctx,point,radius})
                    },canvasModel.hitCan)

                    if(bHit&&point){
                        console.log('click',point)
                        this.view.propertyPanelShow(true)
                        this.view.setPropertyPanelData(point,'vertex')
                        break
                    }
                }
            }
        }
    });
    return circleBrush;
}

