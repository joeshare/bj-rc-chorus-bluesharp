/**
 * Created by AnThen on 2017-5-3.
 */
/**
 * Created by AnThen on 2017-3-3.
 */
import MessageBox from 'adminUI/components/admin-message-box/index'
import {getCenterVertexs,
    getCircleArr,
    getCenterPointAreaRadiusByNum,
    setUpdateStatus,
    setCanvasScale,
    getCanvasScale,
    setCenterVertexPosition,
    setSubVertexPosition,
    setCanvasModel} from '../utils/chartDataUtil.js'
import CONSTANT from 'Utils/constant'
import adminRadio from 'adminUI/components/admin-radio'
import adminCheckbox from 'adminUI/components/admin-checkbox'
import {canvasModel} from '../models/canvasModel.js'
import {createPoint} from '../models/pointModel.js'
import {createEdge} from '../models/edgeModel.js'
function getCanvasPos(canvas,x,y){
    var bbox = canvas.getBoundingClientRect();
    return {
        x:x - bbox.left - (bbox.width - canvas.width) / 2,
        y:y - bbox.top - (bbox.height - canvas.height) / 2
    };
}
let isCanvasMove=false;
let canvasMoveStartPos={};
let stageInitPos={x:0,y:0};
export default {
    name: 'chorus-query-visualization-chart',
    components: {
        adminRadio,
        adminCheckbox
    },
    props: {
        chartData: {
            default: {}
        }
    },
    data () {
        let _this =this;
        return {
            canvasMoveUsable:false,
            entityType:"",
            edgeType:"",
            labelCode:"",
            labelCodes:[],
            propertiesShow:true,
            statisticsShow:true,
            settingShow:true,
            canvasWidth:0,
            canvasHeight:0,
            properties:[],
            statisticses:[],
            settings:[],
            nodesData:{},
            currentHitData:{},
            propertyStyle:{
                width:'288px',
                display:'none',
                height:0
            }
        }
    },
    mounted(){
        canvasModel.init([],this);
        setCanvasModel(canvasModel)
    },
    computed: {

    },
    watch:{
        chartData(v){
            console.log(v)
            this.nodesData=JSON.parse(JSON.stringify(v))
            this.renderCanvas(this.nodesData)
        },
        labelCode(newLabelCode){
            let classType=this.currentHitData.isVertex?this.currentHitData.entityType:this.currentHitData.relationtype;
            console.log('classType',classType,newLabelCode)
            this.changeLabelCode(classType,newLabelCode);
        },
        labelCodes(vals){
            console.log('vals',vals)
            if(vals.length>3){
                MessageBox({
                    message:'Settings 设置不能超过3个',
                    type: 'alert'

                })
                return ;
            }
            let classType=this.currentHitData.isVertex?this.currentHitData.entityType:this.currentHitData.relationtype;
            console.log('classType',classType,vals)
            this.changeLabelCode(classType,vals);
        }
    },
    methods: {
        setPropertyPanelData(hitNode,type){
            this.currentHitData= $.extend(true,{},hitNode,{type})
            this.properties=this.currentHitData.properties;
            this.statisticses=this.currentHitData.statisticses;
             this.settings=this.currentHitData.settings;
            let nodes=this.nodesData[hitNode.id];
            console.log(this.currentHitData,nodes.labelCode)
            if(hitNode.isVertex){
                this.labelCode=nodes.labelCode[0];
                this.entityType=this.currentHitData.entityType
            }else{
                this.labelCodes=nodes.labelCode;
                console.log('this.labelCodes',this.labelCodes)
                this.edgeType=this.currentHitData.edgeType
            }
            console.log(this.currentHitData)

        },
        settingsRadios(settings){
            let arr=[];
            $.isArray(settings)&&settings.forEach(s=>{
                arr.push({
                    value:s.code,
                    text:s.name
                })
            })
          return arr;
        },
        changeLabelCode (classType,labelCode) {
            if(!classType||!labelCode){return}
            for(let key in this.nodesData){
                let data=this.nodesData[key];
                let nodeType="";
                console.log('changeLabelCode',data.entityType,classType)
                if(data.isVertex&&data.entityType==classType){
                    data.labelCode[0]=labelCode;
                }else if(!data.isVertex&&data.relationtype==classType){
                    data.labelCode=labelCode;
                }
            }
            canvasModel.resetChildrenData(this.nodesData);
            setUpdateStatus(true);
        },
        scaleClickBtn(scale){
               console.log(getCanvasScale())
            let tmpScale=getCanvasScale()+scale;
            canvasModel.setScale(tmpScale);
            canvasModel.setTransform({x:stageInitPos.x,y:stageInitPos.y,scaleX:tmpScale,scaleY:tmpScale})
            setCanvasScale(tmpScale);
            //stageInitPos.x/=tmpScale
            //stageInitPos.y/=tmpScale
            canvasModel.stage.update();
        },
        mouseDownHandler(event){
            let canDom=document.getElementById('chorus-query-visualization-canvas');
            let pos= getCanvasPos(canDom,event.clientX,event.clientY)
            canvasMoveStartPos=pos;
            canvasMoveStartPos.x-=stageInitPos.x;
            canvasMoveStartPos.y-=stageInitPos.y;
            canDom.addEventListener('mousemove',this.mouseMoveHandler,false)
            canDom.addEventListener('mouseup',this.mouseUpHandler,false)

        },
        mouseMoveHandler(event){
            let canDom=document.getElementById('chorus-query-visualization-canvas');
            let pos= getCanvasPos(canDom,event.clientX,event.clientY)
            let offsetx=pos.x-canvasMoveStartPos.x
            let offsety=pos.y-canvasMoveStartPos.y
            //stageInitPos.x=canvasModel.stage.x=offsetx;
            //stageInitPos.y=canvasModel.stage.y=offsety;
            //canvasModel.stage.update();
            console.log('offsetx,offsety',offsetx,offsety)
            let scale=getCanvasScale();
            canvasModel.setTransform({x:offsetx,y:offsety,scaleX:scale,scaleY:scale})
           // canvasModel.setTranslate(offsetx,offsety)
            canvasModel.stage.update();
            console.log('mouseMoveHandler',pos, canvasModel.stage.x, canvasModel.stage.y)

        },
        mouseUpHandler(event){
            let canDom=document.getElementById('chorus-query-visualization-canvas');
            let pos= getCanvasPos(canDom,event.clientX,event.clientY)
            let offsetx=pos.x-canvasMoveStartPos.x;
            let offsety=pos.y-canvasMoveStartPos.y;
            stageInitPos.x=offsetx;
            stageInitPos.y=offsety;
            console.log('mouseUpHandler',stageInitPos)
            canDom.removeEventListener('mousemove',this.mouseMoveHandler,false)
            canDom.removeEventListener('mouseup',this.mouseUpHandler,false)
        },
        moveClickBtn(){
            this.propertyPanelShow(false)
            this.canvasMoveUsable=!this.canvasMoveUsable;
            let canDom=document.getElementById('chorus-query-visualization-canvas');
            if(this.canvasMoveUsable){
                console.log(canDom)
                canDom.addEventListener('mousedown',this.mouseDownHandler,false)
                canvasModel.setChildrenCursor("move")
            }else{
                canvasModel.setChildrenCursor("pointer")
                canDom.removeEventListener('mousedown',this.mouseDownHandler,false)
                isCanvasMove=false;
            }
            canvasModel.childrenDisabled(this.canvasMoveUsable);
            canvasModel.stageUpdate()

        },
        renderCanvas(nodeMaps){
            let canvas=canvasModel.canvas;
            console.log('renderCanvas',nodeMaps)
            let centerVertexs=getCenterVertexs(nodeMaps);
            let scale=1;
            let centerAreaRadius=getCenterPointAreaRadiusByNum(centerVertexs.length,canvas)
            let circleArr=getCircleArr(canvas,centerAreaRadius,scale)
            console.log(centerVertexs.length,centerAreaRadius)
            let diff=centerVertexs.length-circleArr.length;
            while(diff>0){
                scale+=0.1;
                circleArr= getCircleArr(canvas,centerAreaRadius,scale)
                diff=centerVertexs.length-circleArr.length;
            }
            console.log('centerAreaRadius,circleArr',circleArr)
            setCanvasScale(1/scale)
            let [x,y,scaleX,scaleY]=[0,0,getCanvasScale(),getCanvasScale()]
            canvasModel.setTransform({x,y,scaleX,scaleY});
            let [view]=[this];
            setCenterVertexPosition(nodeMaps,circleArr)
            setSubVertexPosition(nodeMaps)
            console.log(nodeMaps)
            canvasModel.load([createEdge({nodeMaps,canvas,view}),createPoint({nodeMaps,canvas,view})])
            console.log(canvasModel.container.children)
        },
       subContentShowToggle(type){
          this[type]=!this[type];
       },

       propertyPanelShow(flag){
           let canW,pDisplay="block";
          if(!flag){
              pDisplay='none'
          }
          this.propertyStyle.display=pDisplay;
       }
    },
    created() {
        console.log($('.chorus-main').width())
        this.canvasWidth=$('.chorus-main').width()-10;
        this.canvasHeight=this.canvasWidth*0.7,
        this.propertyStyle.height =`${this.canvasHeight}px`;
    }
}