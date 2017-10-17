/*!
* EaselJS plugin.js
*/

//##############################################################################
// Container.js modify by LLJ
//##############################################################################

this.createjs = this.createjs||{};

(function() {
	"use strict";
	var p =  createjs.Container.prototype;
	p._getObjectsUnderPoint = function(x, y, arr, mouse, activeListener, currentDepth) {
		currentDepth = currentDepth || 0;
		if (!currentDepth && !this._testMask(this, x, y)) { return null; }
		var mtx, ctx = createjs.DisplayObject._hitTestContext;
		activeListener = activeListener || (mouse&&this._hasMouseEventListener());

		// draw children one at a time, and check if we get a hit:
		var children = this.children, l = children.length;
		for (var i=l-1; i>=0; i--) {
			var child = children[i];
			var hitArea = child.hitArea;
			if (!child.visible || (!hitArea && !child.isVisible()) || (mouse && !child.mouseEnabled)) { continue; }
			if (!hitArea && !this._testMask(child, x, y)) { continue; }
			
			// if a child container has a hitArea then we only need to check its hitArea, so we can treat it as a normal DO:
			//TODO::LLJ add child instanceof Container
			//console.log('child instanceof create.BrushBox',child instanceof createjs.BrushBox)
			if (!hitArea && (child instanceof createjs.Container||child instanceof createjs.BrushBox)) {
			
				var result = child._getObjectsUnderPoint(x, y, arr, mouse, activeListener, currentDepth+1);
				if (!arr && result) { return (mouse && !this.mouseChildren) ? this : result; }
			} else {
				if (mouse && !activeListener && !child._hasMouseEventListener()) { continue; }
				
				// TODO: can we pass displayProps forward, to avoid having to calculate this backwards every time? It's kind of a mixed bag. When we're only hunting for DOs with event listeners, it may not make sense.
				var props = child.getConcatenatedDisplayProps(child._props);
				mtx = props.matrix;
				
				if (hitArea) {
					mtx.appendMatrix(hitArea.getMatrix(hitArea._props.matrix));
					props.alpha = hitArea.alpha;
				}
				
				ctx.globalAlpha = props.alpha;
				ctx.setTransform(mtx.a,  mtx.b, mtx.c, mtx.d, mtx.tx-x, mtx.ty-y);
				(hitArea||child).draw(ctx);
				if (!this._testHit(ctx)) { continue; }
				ctx.setTransform(1, 0, 0, 1, 0, 0);
				ctx.clearRect(0, 0, 2, 2);
				if (arr) { arr.push(child); }
				else { return (mouse && !this.mouseChildren) ? this : child; }
			}
		}
		return null;
	};
	
	
}());


//##############################################################################
//BrushBox.js By LLJ
//##############################################################################
this.createjs = this.createjs||{};

(function() {
	function BrushBox(arg) {
		this.Container_constructor();
		this.cfg={};
		this.children=[];
		this.listeners=null;
		this.container=null;
		/**
		 * Specifies an area of the source image to draw. If omitted, the whole image will be drawn.
		 * Note that video sources must have a width / height set to work correctly with `sourceRect`.
		 * @property sourceRect
		 * @type Rectangle
		 * @default null
		 */
		this.sourceRect = null;
		Object.assign(this.cfg,arg);
		Object.assign(this,this.cfg);
		if(this.listeners){
		    for(var evt in this.listeners){
			 this.on(evt,this.listeners[evt])
			}
		    
		}
		
		
		this.findChildByName = function(name) {

		  for (var i=0,l=this.children.length; i<l; i++) {
				var child = this.children[i];
				if(child.name==name){
				 return child;
				}
				
		  }
		  return null;
		};
		
	}
	var p = createjs.extend(BrushBox, createjs.Container);
	p.draw = function(ctx, ignoreCache) {
		    //TODO:: this.DisplayObject_draw is not a function
			if (this.DisplayObject_draw(ctx, ignoreCache)) { return true; }
			//console.log(this.children)
			// this ensures we don't have issues with display list changes that occur during a draw:
			var list = this.children.slice();
			for (var i=0,l=list.length; i<l; i++) {
				var child = list[i];
				if (!child.isVisible()) { continue; }
				
				// draw the child:
				ctx.save();
				child.updateContext(ctx);
				child.draw(ctx);
				ctx.restore();
			}
			return true;
		};
		p.addChild = function(child) {
			if (child == null) { return child; }
			var l = arguments.length;
			if (l > 1) {
				for (var i=0; i<l; i++) { this.addChild(arguments[i]); }
				return arguments[l-1];
			}
			if (child.parent) { child.parent.removeChild(child); }
			child.parent = this;
			child.x=this.groupX+child.groupX;
			child.y=this.groupY+child.groupY;
			this.children.push(child);
			child.dispatchEvent("added");
			return child;
		};
		
   
	p.initialize = BrushBox; // TODO: deprecated.

	
	p.isVisible = function() { return !!this.visible; };
    	
	
	p.clone = function() { console.log('==TODO==') };
	
	
	p.toString = function() {
		return "[BrushBox (name="+  this.name +")]";
	};
	p._getGroupX=function(){ return this._groupX; };
	p._setGroupX=function(v){
	  if(this.children){
	    for(var i=0,len=this.children.length;i<len;i++){
		   var child=this.children[i];
		   child.x=v+child.groupX;
		}
	  }
	  this._groupX=v;
	  
	};
	p._getGroupY=function(){  return this._groupY; };
	p._setGroupY=function(v){
	  
	    if(this.children){
			for(var i=0,len=this.children.length;i<len;i++){
			   var child=this.children[i];
			   child.y=v+child.groupY;
			}
		  }
	   this._groupY=v;
	};
	try {
		Object.defineProperties(p, {
			groupX: { get: p._getGroupX,set:p._setGroupX },
			groupY: { get: p._getGroupY,set:p._setGroupY },
		
		});
	} catch (e) {} // TODO: use Log
	createjs.BrushBox = createjs.promote(BrushBox, "Container");
}());

//##############################################################################
//Brush.js By LLJ
//##############################################################################
this.createjs = this.createjs||{};

(function() {
	function Brush(arg) {
		this.DisplayObject_constructor();
		this.cfg={};
		this.listeners=null;
		this.container=null;
		this.children=[];
		/**
		 * Specifies an area of the source image to draw. If omitted, the whole image will be drawn.
		 * Note that video sources must have a width / height set to work correctly with `sourceRect`.
		 * @property sourceRect
		 * @type Rectangle
		 * @default null
		 */
		this.sourceRect = null;
		Object.assign(this.cfg,arg);
		Object.assign(this,this.cfg);
		if(this.listeners){
		    for(var evt in this.listeners){
			 this.on(evt,this.listeners[evt])
			}
		    
		}
		this.addChild = function(child) {
			if (child == null) { return child; }
			var l = arguments.length;
			if (l > 1) {
				for (var i=0; i<l; i++) { this.addChild(arguments[i]); }
				return arguments[l-1];
			}
			if (child.parent) { child.parent.removeChild(child); }
			child.parent = this;
			this.children.push(child);
			child.dispatchEvent("added");
			return child;
		};
		this.addChildAt = function(child, index) {
			var l = arguments.length;
			var indx = arguments[l-1]; // can't use the same name as the index param or it replaces arguments[1]
			if (indx < 0 || indx > this.children.length) { return arguments[l-2]; }
			if (l > 2) {
				for (var i=0; i<l-1; i++) { this.addChildAt(arguments[i], indx+i); }
				return arguments[l-2];
			}
			if (child.parent) { child.parent.removeChild(child); }
			child.parent = this;
			this.children.splice(index, 0, child);
			child.dispatchEvent("added");
			return child;
		};		
		this.removeChild = function(child) {
			var l = arguments.length;
			if (l > 1) {
				var good = true;
				for (var i=0; i<l; i++) { good = good && this.removeChild(arguments[i]); }
				return good;
			}
			return this.removeChildAt(createjs.indexOf(this.children, child));
		};

		this.removeChildAt = function(index) {
			var l = arguments.length;
			if (l > 1) {
				var a = [];
				for (var i=0; i<l; i++) { a[i] = arguments[i]; }
				a.sort(function(a, b) { return b-a; });
				var good = true;
				for (var i=0; i<l; i++) { good = good && this.removeChildAt(a[i]); }
				return good;
			}
			if (index < 0 || index > this.children.length-1) { return false; }
			var child = this.children[index];
			if (child) { child.parent = null; }
			this.children.splice(index, 1);
			child.dispatchEvent("removed");
			return true;
		};
		
	}
	var p = createjs.extend(Brush, createjs.DisplayObject);
	
	
    // public methods:
	/**
	 * Constructor alias for backwards compatibility. This method will be removed in future versions.
	 * Subclasses should be updated to use {{#crossLink "Utility Methods/extends"}}{{/crossLink}}.
	 * @method initialize
	 * @deprecated in favour of `createjs.promote()`
	 **/
	p.initialize = Brush; // TODO: deprecated.

	/**
	 * Returns true or false indicating whether the display object would be visible if drawn to a canvas.
	 * This does not account for whether it would be visible within the boundaries of the stage.
	 *
	 * NOTE: This method is mainly for internal use, though it may be useful for advanced uses.
	 * @method isVisible
	 * @return {Boolean} Boolean indicating whether the display object would be visible if drawn to a canvas
	 **/
	p.isVisible = function() {
		return !!this.visible;
	};
    /**
	 * Docced in superclass.
	 */
	p.getBounds = function() {
		var rect = this.DisplayObject_getBounds();
		if (rect) { return rect; }
		
		return null;
	};
	
	/**
	 * Returns a clone of the Bitmap instance.
	 * @method clone
	 * @return {Bitmap} a clone of the Bitmap instance.
	 **/
	p.clone = function() {
		var o = new Brush(this.cfg);
		if (this.sourceRect) { o.sourceRect = this.sourceRect.clone(); }
		this._cloneProps(o);
		return o;
	};
	
	/**
	 * Returns a string representation of this object.
	 * @method toString
	 * @return {String} a string representation of the instance.
	 **/
	p.toString = function() {
		return "[Brush (name="+  this.name +")]";
	};
	
	createjs.Brush = createjs.promote(Brush, "DisplayObject");
}());
//##############################################################################
//brushDefault.js By LLJ
//##############################################################################
this.createjs = this.createjs||{};

(function() {

	createjs.brushDefault = {
	   fillStyle:'#f4f4f4',
	   strokeStyle:'#ccc',
	   shadowOffsetX :2,
	   shadowOffsetY :2,
	   shadowColor : 'rgba(100,100,100,0.2)',
	   shadowBlur : 3,
	   font:'normal bolder 10px icon',
       textBaseline:'middle',
       textAlign:'center',
	   lineWidth:1,
	   lineJoin:'miter'
	
	};
}());

//##############################################################################
//bezierCurveTo.js By LLJ
//##############################################################################
this.createjs.brushUtils = this.createjs.brushUtils||{};
(function() {
    function getBezierPoint(start,end,dir){
	    var diffX = start.x - end.x,
            diffY = start.y - end.y;
     
		var pos1={},pos2={},diff=Math.abs(diffY),offsetY=diff/2,arr=[];
		if(diffY<0){
		   pos1.y=start.y+offsetY;
		   pos1.x=start.x;
		   pos2.y=end.y-offsetY;
		   pos2.x=end.x;
		}else{
		   pos1.y=start.y-offsetY;
		   pos1.x=start.x;
		   pos2.y=end.y+offsetY;
		   pos2.x=end.x;
		}
		arr.push({x: start.x, y: start.y});
		arr.push(pos1);
		arr.push(pos2);
		arr.push({x: end.x, y: end.y});
		return arr;
	
	}
	createjs.brushUtils.getBezierPoint = getBezierPoint;
}());

//##############################################################################
//drawCircle.js By LLJ
//##############################################################################

(function() {

	function drawCircle(ctx,arg) {
	   var opt=arg||this;
	   ctx.save(); 
	   ctx.beginPath();
	   ctx.arc(0,0,opt.radius,0*Math.PI,2*Math.PI)
       ctx.fillStyle = opt.fillStyle||createjs.brushDefault.fillStyle;
       ctx.fill();
       ctx.strokeStyle =opt.strokeStyle||createjs.brushDefault.strokeStyle;
       ctx.stroke();
	   ctx.restore(); 
		
	}
	createjs.brushUtils.drawCircle = drawCircle;
}());

//##############################################################################
//drawShadow.js By LLJ
//##############################################################################
(function() {

	function drawShadow(ctx,arg) {
	    var opt=arg||this;
	    ctx.shadowOffsetX = opt.shadowOffsetX||createjs.brushDefault.shadowOffsetX;
		ctx.shadowOffsetY = opt.shadowOffsetY||createjs.brushDefault.shadowOffsetY;
		ctx.shadowColor = opt.shadowColor||createjs.brushDefault.shadowColor;
		ctx.shadowBlur = opt.shadowBlur||createjs.brushDefault.shadowBlur;
    }
	createjs.brushUtils.drawShadow = drawShadow;
}());
//##############################################################################
//drawText.js By LLJ
//##############################################################################

(function() {

	function drawText(ctx,arg){
	    var opt=arg||this;
		ctx.save();
		ctx.fillStyle=opt.fillStyle||createjs.brushDefault.fillStyle;
		ctx.font=opt.font||createjs.brushDefault.font;
		ctx.textBaseline=opt.textBaseline||createjs.brushDefault.textBaseline;
		ctx.textAlign=opt.textAlign||createjs.brushDefault.textAlign;
		ctx.fillText(opt.text,opt.offsetX||0,opt.offsetY||0);
		ctx.restore();
	}
	createjs.brushUtils.drawText = drawText;

}());
//##############################################################################
//drawImg.js By LLJ
//##############################################################################

(function() {

	function drawImg(ctx,arg){
        var opt=arg||this;
		ctx.save(); 
		ctx.scale(1,1);
		ctx.drawImage(opt.image,opt.offsetX||0,opt.offsetY||0);
		ctx.restore(); 
	} 
	createjs.brushUtils.drawImg = drawImg;

}());

//##############################################################################
//drawRect.js By LLJ
//##############################################################################

(function() {

	function drawRect(ctx,arg){
        var opt=arg||this;
		ctx.save(); 
		ctx.fillStyle = opt.fillStyle||createjs.brushDefault.fillStyle;
		ctx.strokeStyle = opt.strokeStyle||createjs.brushDefault.strokeStyle;
		ctx.strokeRect(0,0, opt.width,opt.height);
		ctx.fillRect(0,0, opt.width,opt.height);
		ctx.lineWidth = opt.lineWidth||createjs.brushDefault.lineWidth;
		ctx.stroke();
		ctx.restore(); 
	} 
	createjs.brushUtils.drawRect = drawRect;
}());
//##############################################################################
//drawArrow.js By LLJ
//##############################################################################

(function() {

	function drawArrow(ctx,arg){
        var opt=arg||this;
		ctx.save(); 
		ctx.fillStyle=opt.fillStyle||createjs.brushDefault.fillStyle;
		ctx.lineWidth=opt.lineWidth||createjs.brushDefault.lineWidth;  
		ctx.strokeStyle = opt.strokeStyle||createjs.brushDefault.strokeStyle;
		ctx.beginPath();  
		ctx.moveTo(0,0);  
		ctx.lineTo(10,20);  
		ctx.lineTo(-10,20);  
		ctx.closePath();  
		ctx.fill();  
		ctx.stroke()
		ctx.restore();  
	} 
	createjs.brushUtils.drawArrow = drawArrow;
}());
//##############################################################################
//drawLine.js By LLJ
//##############################################################################

(function() {

	function drawLine(ctx,arg){
        var opt=arg||this;
		ctx.save(); 
		ctx.beginPath();
		ctx.globalCompositeOperation=opt.globalCompositeOperation;
		ctx.strokeStyle = opt.strokeStyle||createjs.brushDefault.strokeStyle;
		ctx.lineWidth = opt.lineWidth||createjs.brushDefault.lineWidth;
		ctx.moveTo(opt.start.x, opt.start.y);
		ctx.lineTo(opt.end.x, opt.end.y);
		ctx.lineJoin =opt.lineJoin||createjs.brushDefault.lineJoin;
		ctx.stroke();
		ctx.restore();  
	} 
	createjs.brushUtils.drawLine = drawLine;

}());
//##############################################################################
//drawBezier.js By LLJ
//##############################################################################

(function() {

	function drawBezier(ctx,arg){
        var opt=arg||this;
		var arr=createjs.brushUtils.getBezierPoint({x:opt.start.x,y:opt.start.y},{x:opt.end.x,y:opt.end.y});
		ctx.save(); 
		ctx.beginPath();
		ctx.globalCompositeOperation=opt.globalCompositeOperation;
		ctx.strokeStyle = opt.strokeStyle||createjs.brushDefault.strokeStyle;
		ctx.lineWidth = opt.lineWidth||createjs.brushDefault.lineWidth;
		ctx.beginPath();
		ctx.moveTo(arr[0].x, arr[0].y);
		ctx.bezierCurveTo(arr[1].x, arr[1].y,arr[2].x, arr[2].y,arr[3].x, arr[3].y);
		ctx.lineJoin =opt.lineJoin||createjs.brushDefault.lineJoin;
		ctx.stroke();
		ctx.restore();  
	} 
	createjs.brushUtils.drawBezier = drawBezier;
}());


