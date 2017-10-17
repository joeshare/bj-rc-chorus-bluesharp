/**
 * Created by AnThen on 2017-8-9.
 */
import {setUpdateStatus,getUpdateStatus,
    testHitInArray,getCanvasScale,getMidpoint,angle,getPosByRad,
    distance,
    circleRadius,getWayPoints,
    getCanvasModel,
    testHit} from '../utils/chartDataUtil.js'
const FONT_COLOR='RGBA(102,102,102,1)';
const FONT_COLOR2='RGBA(102,102,102,0.1)';
const STROKE_COLOR1='RGBA(230,70,70,1)';
const STROKE_COLOR2='RGBA(130, 38, 38,1)';
const FILL_COLOR1='RGBA(230,70,70,0.7)';
const FILL_COLOR2='RGBA(199,60,60,0.8)';

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
function _getTextVertex(midpoint,rad,offsetR){
    return getPosByRad(midpoint,rad,offsetR||15)
}
function _eachText({labelCode1s,star,end,rad,ctx,node}){
    let posArr=getWayPoints(star,end,labelCode1s.length+1);
    $.isArray(labelCode1s)&&labelCode1s.forEach((labelCode,i)=>{
        let fillText=getTextByLabelCode([].concat(node.properties,node.statisticses),labelCode);
        let strLen=_.strLength(`${fillText}`)
        if(strLen>8){
            fillText=` ${fillText.substr(0,5)}...`;
        }
        let tempRad=rad-Math.PI/2;
        let textVertex=_getTextVertex(posArr[i+1],tempRad)
        ctx.save();
        ctx.translate(textVertex.x,textVertex.y);
        ctx.rotate(rad);
        ctx.fillText(fillText,0,0);
        ctx.restore();
    })
}
function text({ctx,star,end,node}){
    ctx.save();
    ctx.beginPath();
    ctx.fillStyle=FONT_COLOR;
    ctx.font="normal small-caps 8px";//"normal bolder 10px icon";
    ctx.textBaseline="middle"
    ctx.textAlign="center";
    let rad=angle(star.x,star.y,end.x,end.y);
    let labelCode1s=node.labelCode;
    _eachText({labelCode1s,star,end,rad,ctx,node})
    ctx.restore();
}
function line(ctx,s,e){
    let pos=getMidpoint(s.x,s.y,e.x,e.y);
    let _dis=distance(s.x,s.y,e.x,e.y)
    let radius=_dis/2;
    let rad=angle(s.x,s.y,e.x,e.y);
    let tempRad=rad-Math.PI/2;
    let newStartVer=_getTextVertex(s,tempRad,3)
    let newEndVer=_getTextVertex(e,tempRad,3)

    ctx.save();
    ctx.beginPath();
    ctx.strokeStyle = FONT_COLOR2;
    ctx.lineWidth = 4;
    ctx.moveTo(newStartVer.x,newStartVer.y);
    ctx.lineTo(newEndVer.x,newEndVer.y);
    ctx.stroke();
    ctx.restore();


    ctx.save();
    ctx.beginPath();
    ctx.moveTo(newStartVer.x,newStartVer.y);
    ctx.lineTo(newEndVer.x,newEndVer.y);
    ctx.stroke();
    ctx.restore();
}
function arrow(ctx,s,e){
    let rad=angle(s.x,s.y,e.x,e.y);
    let _dis=distance(s.x,s.y,e.x,e.y)
    let arrowVer=getPosByRad(s,rad,_dis-circleRadius-8);
    //先移动位置在旋转
    let tempRad=rad-Math.PI/2;
    let newEndVer=_getTextVertex(arrowVer,tempRad,3)
    ctx.save();
    ctx.translate(newEndVer.x,newEndVer.y);
    ctx.rotate(rad+Math.PI/2);
    ctx.moveTo(0,-7);
    ctx.lineTo(4,7);
    ctx.lineTo(-4,7);
    ctx.fillStyle =FONT_COLOR;
    ctx.closePath();
    ctx.fill();
    ctx.restore();

}
function drawLine(ctx){
    ctx.save();
    ctx.beginPath();
    ctx.globalCompositeOperation='source-over';
    ctx.strokeStyle = FONT_COLOR;
    ctx.lineWidth = 1;
    let nodes=this.nodes;
    for(let id in nodes){
        let n=nodes[id];
        if(!n.isVertex){
            let star=this.nodes[n.fromVertexId];
            let end=this.nodes[n.endVertexId]
            if(!star||!end){
                return;
            }
            line(ctx,star,end);
            let node=n;
            text({ctx,star,end,node});
            arrow(ctx,star,end)
        }

    }
    ctx.stroke();
    ctx.restore();
}
function _getEdges(nodes){
    let edges=[];
    for(let id in nodes){
        if(!nodes[id].isVertex){
            edges.push(nodes[id])
        }

    }
    return edges;

}
exports.createEdge=({nodeMaps,canvas,view})=>{
    var brush=new createjs.Brush({
        id:'brushEdge',
        name:'brushEdge',
        x:0,
        y:0,
        canvas,
        nodes:nodeMaps,
        view,
        labelCode:'id',
        strokeStyle:'#fff',
        fillStyle:'#fff',
        draw:drawLine,
        visible:true,
        disabled:false,
        cursor:'pointer',
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
                let nodes=this.nodes;
                let edges=_getEdges(nodes);
                console.log('edges',edges,[x,y])
                for(let edge of edges){
                    let startVer=nodes[edge.fromVertexId]
                    let endVer=nodes[edge.endVertexId]
                    if(!startVer||!endVer){
                        continue;
                    }
                    let canvasModel=getCanvasModel();
                    let testCtx=canvasModel.getHitCtx();
                    let bHit=testHit(e.stageX,e.stageY,testCtx,(ctx)=>{
                        line(ctx,startVer,endVer);
                        text({ctx,star:startVer,end:endVer,node:edge})
                        arrow(ctx,startVer,endVer)
                    },canvasModel.hitCan)
                    console.log('bHit',bHit,edge)
                    if(bHit&&edge){
                       this.view.propertyPanelShow(true)
                       this.view.setPropertyPanelData(edge,'edge')
                       break
                    }
                }
            }
        }
    });
    return brush;
}

