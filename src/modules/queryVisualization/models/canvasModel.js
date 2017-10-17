/**
 * Created by AnThen on 2017-8-9.
 */
import {setUpdateStatus,getUpdateStatus} from '../utils/chartDataUtil.js'
function model(){
    this.canvas=null;
    this.stage=null;
    this.container=null;
    this.isStop=true;
    this.data=[];
    let _this=this;

    function clearCanvas(){
        _this.ctx&&_this.canvas&& _this.ctx.clearRect(0,0,_this.canvas.width,_this.canvas.height);
    }
    function clearData(){
        if(_this.container){
            _this.container.removeAllChildren();
        }
        if(_.isArray(_this.data)){
            while(_this.data.length){
                _this.data.split(0,1)
            }
        }


    }

    function cloneObj(obj) {
        var nObj = {};
        if (!obj) {
            return null;
        }
        for(var k in obj){
            nObj[k] = obj[k];
        }
        return nObj;
    }
    function tick(event) {
        if (getUpdateStatus()) {
            setUpdateStatus(false)
            _this.stage.update(event);
        }
    }
    this.load=(data)=> {
        clearData();
        clearCanvas();
        if($.isArray(data)&&data.length){
            data.forEach((d,i)=>{
                _this.container&&_this.container.addChild(d)
            })
        }
        this.setChildrenDisabled(this.chidlrenDisabled)
        this.stage&&this.stage.update();
    }
    this.addChild=(kid)=>{
        _this.container.addChild(kid)
    };
    this.setScale=(scale)=>{
        //this.stage.scaleX=this.stage.scaleY=scale;
        //this.stage.scaleX=this.stage.scaleY=scale;
        this.stage.setTransform(0,0,scale,scale)
        this.hitCtx.scale(scale,scale);
    };
    this.setTranslate=(x,y)=>{
        //this.stage.scaleX=this.stage.scaleY=scale;
        //this.stage.scaleX=this.stage.scaleY=scale;
        this.stage.setTransform(x,y)
    };
    this.setTransform=({x,y,scaleX,scaleY})=>{
        this.stage.setTransform(x,y,scaleX,scaleY)
        this.hitCtx.setTransform(scaleX,0,0,scaleY,x,y);
    };
    this.setChildrenDisabled=(f)=>{
        _this.container&&$.isArray(_this.container.children)&&_this.container.children.forEach((c,i)=>{
            c.disabled=f;
        })
    };
    /**
     * 设置节点数据
     * @param data
     */
    this.resetChildrenData=(data)=>{
        $.isArray(this.container.children)&&this.container.children.every(kid=>{
            kid.nodes=data;
            return true;
        })
    }
    /**
     * 设置鼠标样式
     * @param cursor
     */
    this.setChildrenCursor=(cursor)=>{
       $.isArray(this.container.children)&&this.container.children.forEach(kid=>{
            kid.cursor=cursor;
        })
    };
    this.childrenDisabled=(b)=>{
        $.isArray(this.container.children)&&this.container.children.forEach(kid=>{
              kid.disabled=b;
        })
    };
    /**
     * 舞台更新
     */
    this.stageUpdate=()=>{this.stage.update(); }
    this.getHitCtx=()=>{
      return this.hitCtx;
    };
    this.setHitCanWH=(w,h)=>{
        this.hitCan.width= w;
        this.hitCan.height=h;
    }
    this.init=(data,view)=>{
        console.log(this)
        //examples.showDistractor();
        // create stage and point it to the canvas:
        clearData();
        console.log("-------------0")
        this.canvas=null;
        this.view=view
        this.canvas = document.getElementById("chorus-query-visualization-canvas");
        this.hitCan=document.createElement("canvas");
        this.hitCan.width= this.canvas.width;
        this.hitCan.height=this.canvas.height;
        console.log('this.init',this.canvas);
        this.ctx=this.canvas.getContext("2d");
        this.hitCtx=this.hitCan.getContext("2d");
        this.stage=null;
        this.stage = new createjs.Stage(this.canvas);
        this.stage.enableMouseOver(10);
        this.stage.mouseMoveOutside = false; // keep tracking the mouse even when it leaves the canvas
        this.container = null;
        this.container = new createjs.Container();
        this.stage.addChild(this.container);
        this.data=data;
        this.chidlrenDisabled=false;
        this.load(this.data);
        createjs.Ticker.removeAllEventListeners("tick");
        createjs.Ticker.addEventListener("tick", tick);
    }
}
exports.canvasModel=new model();