/**
 * Created by LILIJING on 2017-1-23.
 */

//============
//utils js
//============
this.requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();
this.Painter = this.Painter || {};
Painter.log = function (v) {
    // console.log(v)
};

Painter.inherit = function (subClass, superClass) {
    var fn = function () {
    };
    fn.prototype = superClass.prototype;
    return (subClass.prototype = new fn).constructor = subClass;

};
Painter.testHit = function (x, y, ctx) {
    var hit = false;
    try {
        hit = ctx.getImageData(x, y, 1, 1).data[3] > 1;
    } catch (e) {
        console.log(e)
    }
    return hit;
};

Painter.randStr = function (len) {
    var text = "", possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < len; i++) text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
};
Painter.clearArrayByIndex = function (arr, index) {
    var child = arr[index];
    child && arr.splice(index, 1);
};
Painter.clearArrayAll = function (arr) {
    while (arr.length) {
        Painter.clearArrayByIndex(arr, 0);
    }
};
Painter.isEmptyObject = function (e) {
    var t;
    for (t in e)
        return !1;
    return !0
};
Painter.sortAscCompare = function (propertyName) {
    return function (object1, object2) {
        var value1 = object1[propertyName], value2 = object2[propertyName];
        if (value1 < value2) {
            return -1;
        } else if (value1 > value2) {
            return 1;
        } else {
            return 0;
        }
    };
};
Painter.sortDescCompare = function (propertyName) {
    return function (object1, object2) {
        var value1 = object1[propertyName], value2 = object2[propertyName];
        if (value1 < value2) {
            return 1;
        } else if (value1 > value2) {
            return -1;
        }
    };
};
Painter.getTypeBy = function (o) {
    if (o === "null") return "Null";
    if (o === "undefined") return "Undefined";
    if (o !== o) return "NaN";
    return Object.prototype.toString.call(o).toLowerCase().slice(8, -1);
};
Painter.findObjectById = function (id, target) {
    var objs = target || this.cache, type = this.getTypeBy(objs), o = null;
    if (type == 'object') {
        for (var k in objs) {
            var o = objs[k];
            if (o && o.id == id) {
                break;
            } else if (o = this.findObjectById(id, o.children)) {
                break;
            }
        }
    } else if (type == 'array') {
        for (var i = 0, len = objs.length; i < len; i++) {
            o = objs[i];
            console.log('array', o)
            if (o && o.id == id) {
                break;
            } else if (o = this.findObjectById(id, o.children)) {
                break;
            }
        }
    }
    return o;

};
//===============
//Event class js
//===============
(function () {
    "use strict";
    function Event() {
    };
    var p = Event.prototype;

    //分发事件
    p.dispatchEvent = function (eventType, e) {
        this.listeners[eventType] && this.listeners[eventType].call(this, e);
    };
    //收集事件
    p.collectEvent = function (child) {
        if (child.listeners) {
            for (var evt in child.listeners) {

                if (this.listeners[evt]) {
                    this.listeners[evt][child.id] = child.listeners[evt];
                } else {
                    this.listeners[evt] = {};
                    this.listeners[evt][child.id] = child.listeners[evt];
                }
            }
        }
    };

    //清空事件
    p.clearEvent = function (child) {
        if (child.listeners) {
            for (var evt in child.listeners) {
                if (this.listeners[evt]) {
                    delete this.listeners[evt][child.id];
                }
                if (Painter.isEmptyObject(this.listeners[evt])) {
                    delete this.listeners[evt]
                }
            }
        }

    };

    Painter.Event = Event;

})();
//===============
//Base Class  js
//===============
(function () {
    "use strict";
    function BaseClass(arg) {
    }

    var p = BaseClass.prototype;

    p.listeners = {};
    //p.parent=null;
    p.getGUID = function () {
        return Painter.randStr(32);
    };
    p.children = [];
    p.hitChildren = [];
    p.oldHitChildren = [];
    /**
     * addChild
     * @param child
     */
    p.addChild = function (child) {

        if (!child) {
            return;
        }
        var l = arguments.length;
        for (var i = 0; i < l; i++) {
            var kid = arguments[i];
            if (kid) {
                // kid.parent=this;
                this.children.push(kid);
                this.collectEvent && kid.collectEvent.call(this, kid);
                kid.dispatchEvent && kid.dispatchEvent.call(kid, 'added');
                kid.parentId = this.id;

            }

        }

    };
    /**
     * removeChild
     * @param id
     */
    p.removeChild = function (o) {
        var id = typeof o == 'object' ? o.id : o;
        var index = -1;
        this.children.every(function (kid, i) {
            if (kid && kid.id && kid.id == id) {
                index = i;
                return false;
            }
            return true;
        })
        index > -1 && this.removeChildByIndex(index);

    };
    /**
     * removeChildByIndex
     * @param index
     */
    p.removeChildByIndex = function (index) {
        var child = this.children[index];
        if (child) {
            this.clearEvent && this.clearEvent(child);
            this.children.splice(index, 1);
        }


    };

    /**
     * removeAllChild
     */
    p.removeChildAll = function () {
        while (this.children.length) {
            this.removeChildByIndex(0);
        }
    };
    /**
     * cloneChild
     * @param source
     */
    p.cloneChild = function (source) {
        return Object.assign({}, source);
    };
    /**
     * 获取全部的child
     */
    p.getChildren = function () {
        return this.children;
    };
    /**
     * get Child
     * @param o string or child
     *
     */
    p.getChild = function (o) {
        var id = typeof o == 'object' ? o.id : o;
        var child = null;
        this.children.every(function (kid, i) {
            if (kid && kid.id && kid.id == id) {
                child = kid;
                return false;
            }
            return true;
        })
        return child;
    };
    p.getCanvasPosition = function (canvas) {
        return {
            x: canvas.offsetLeft,
            y: canvas.offsetTop
        };
    };
    p.getMouse = function (canvas, e) {
        var canvasPosition = this.getCanvasPosition(canvas);
        return {
            x: e.pageX - canvasPosition.x,
            y: e.pageY - canvasPosition.y
        };
    };
    p.clearCanvas = function (ctx, width, height) {
        ctx.clearRect(0, 0, width, height);
    };
    p.collectHitedBy=function(parent,hitCtx){
        var arr=[];

        return arr;
    };
    p.hitChildAll = function (children, hitCtx, mouse, cb) {
        for (var i = children.length - 1; i > -1; i--) {
            var kid = children[i],isHitChild=false;
            kid.draw(hitCtx);
            var f = Painter.testHit(mouse.x, mouse.y, hitCtx);
            //TODO::


           // this.clearCanvas(hitCtx, this.hitCan.width, this.hitCan.height);
           /* if(kid.children.length){
                isHitChild=this.hitChildAll(kid.children, hitCtx, mouse, cb);
            }
*/
            kid.draw(hitCtx);
            if (cb && cb(f, kid) === false) {
                break;
                return false;
            }

        }
        this.clearCanvas(hitCtx, 1000, 500);

    };
    p.dispatchHitChildAll = function (children, eventType, e, cb) {
        for (var i = 0, len = children.length; i < len; i++) {
            var kid = children[i];
            if (kid.dispatchEvent) {
                kid.dispatchEvent.call(kid, eventType, e);
            }
        }
    };
    p.eventHandler = function (canvas, eventType, e) {
        var mouse = this.getMouse(canvas, e), _this = this;
        //this.hitChildren.sort(Painter.sortAscCompare('z'));
        this.hitChildAll(this.hitChildren, this.hitCtx, mouse, function (f, kid) {
            if (f) {
                _this.oldHitChildren.push(kid);
            } else {
                kid.dispatchEvent && kid.dispatchEvent.call(kid, 'mouseout', e);
            }

        });
        Painter.clearArrayAll(this.hitChildren);
        this.hitChildAll(this.children, this.hitCtx, mouse, function (f, kid) {
            if (f) {
                _this.hitChildren.push(kid);
                //TODO::
                if (kid.children.length) {
                    // _this.eventHandler(eventType,e,kid.getChildren());
                }
                //====
                return false;
            }

        });
        var childrenLen = this.hitChildren.length;

        if (childrenLen) {
            var kid = this.hitChildren[childrenLen - 1], oldHitChildrenLen = _this.oldHitChildren.length;
            if (oldHitChildrenLen) {
                for (var i = 0, len = _this.oldHitChildren.length; i < len; i++) {
                    var oldKid = _this.oldHitChildren[i];
                    if (kid.id != oldKid.id) {
                        //必须先执行mouseout 再执行mouseover
                        oldKid.dispatchEvent && oldKid.dispatchEvent.call(oldKid, 'mouseout', e);
                        kid.dispatchEvent && kid.dispatchEvent.call(kid, 'mouseover', e);
                    }
                }
            } else {
                kid.dispatchEvent && kid.dispatchEvent.call(kid, 'mouseover', e);
            }


        }

        this.dispatchHitChildAll(this.hitChildren, eventType, e);
        Painter.clearArrayAll(this.oldHitChildren);
    };
    p = Object.assign(BaseClass.prototype, Painter.Event.prototype);
    p._getParent = function () {
        return Painter.findObjectById(this.parentId);
    };
    p._setParent = function (pName) {
        this._parentName = pName;
    };
    Object.defineProperties(p, {
        parent: {get: p._getParent, set: p._setParent}

    });
    Painter.BaseClass = BaseClass;
})();

//===============
//Spirit class js
//===============
(function () {
    "use strict";
    function Spirit(arg) {
        var _this = this;

        var _defaultCfg = {
            x: '',
            y: '',
            z: 0,
            rotation: 0,
            scaleX: 1,
            scaleY: 1,
            regX: '',
            regY: '',
            _offsetX: 0,
            _offsetY: 0,
            groupX: 0,
            groupY: 0,
            cursor: '',
            id: _this.getGUID(),
            name: '',
            draw: null,
            visible: true,//是否可见
            //parent:null,
            children: [],
            listeners: {}
        };
        this.cfg = Object.assign(_defaultCfg, arg);
        //复制
        this.clone = function () {
            return new Spirit(_defaultCfg);
        };
        //渲染
        function _render(ctx) {
            if (this.visible !== true) {
                return;
            }
            _this.draw && _this.draw.call(_this, ctx);
            if (_this.children && _this.children.length) {
                //var parent=this.parent;
                this.children.sort(Painter.sortAscCompare('z'));
                //console.log(this.children)
                for (var i = 0, len = this.children.length; i < len; i++) {
                    var kid = this.children[i];
                    kid.x = this.x + kid.groupX;
                    kid.y = this.y + kid.groupY;
                    (kid.visible === true) && kid.draw && kid.draw(ctx);
                }
            }
        }

        //初始化
        function _initialize(arg) {
            Object.assign(_this, _defaultCfg, arg);
            //render 不能被覆写
            _this.render = _render;
            _this.initialize && _this.initialize.call(_this, arg);
        }

        _initialize.call(this, arg);

    }

    function _getOffsetX() {

    };
    var s = Painter.inherit(Spirit, Painter.BaseClass);
    var p = Spirit.prototype;
    p._offsetX = p._offsetY = 0;
    p._getOffsetX = function () {
        return this._offsetX;
    };
    p._setOffsetX = function (v) {
        if (v < 0) {
            this._offsetX = 0;
        } else if (this.width && v > this.width) {
            this._offsetX = this.width;
        } else {
            this._offsetX = v;
        }

    };
    p._getOffsetY = function () {
        return this._offsetY;
    };
    p._setOffsetY = function (v) {

        if (v < 0) {
            this._offsetY = 0;
        } else if (this.height && v > this.height) {
            this._offsetY = this.height;
        } else {
            this._offsetY = v;
        }
    };
    Object.defineProperties(p, {
        offsetX: {get: p._getOffsetX, set: p._setOffsetX},
        offsetY: {get: p._getOffsetY, set: p._setOffsetY},
    });
    Painter.Spirit = s;
    Painter.createSpirit = function (arg) {
        return new s(arg);
    }
})();
//================
//Stage class js
//================
(function () {
    "use strict";
    function Stage(arg) {
        var _this = this;
        this.hitChildren = [];
        this.oldHitChildren = [];
        this.canvas = null;
        this.ctx = null
        this.hitCan = null;
        this.hitCtx = null;

        this.clearCanvas = function (ctx, width, height) {
            ctx.clearRect(0, 0, width, height);
        };


        /**
         * 舞台渲染
         */
        this.render = function () {
            this.clearCanvas(this.ctx, this.canvas.width, this.canvas.height);
            this.children.sort(Painter.sortAscCompare('z'));
            for (var i = 0, len = this.children.length; i < len; i++) {
                var kid = this.children[i];
                kid.render && kid.render(this.ctx);

            }
        };

        /**
         * 初始化参数
         * @param arg
         * @param arg.canvas string //Example '#canvasId' 、 '.canvasClass'
         */
        this.initCfg = function (arg) {
            if (arg && arg.canvas) {
                this.canvas = typeof arg.canvas == 'string' ? document.querySelector(arg.canvas) : arg.canvas;
                this.ctx = this.canvas.getContext("2d");
                this.hitCan = document.createElement("canvas");
                this.hitCan.width = this.canvas.width;
                this.hitCan.height = this.canvas.height;
                this.hitCtx = this.hitCan.getContext("2d");
                this.id = arg.id || this.getGUID();
            }

        };
        /**
         *  点击事件
         * @param e
         * @private
         */
        var _clickHandler = function (e) {
        };
        /**
         * 鼠标移动事件
         * @param e
         * @private
         */
        var _mousemoveHandler = function (e) {
        };
        this.defaultEvent = ['click', 'dblclick', 'mousemove', 'mouseout', 'mouseover', 'mouseup', 'mousedown'];

        /**
         * 初始化事件
         */
        this.initEvents = function () {
            this.defaultEvent.forEach(function (eventName, i) {
                _this.canvas.addEventListener(eventName, function (e) {
                    _this.eventHandler(_this.canvas, eventName, e, _this.getChildren());
                }, false);
            })

        };
        /**
         * 初始化
         */
        this.init = function (arg) {
            this.initCfg(arg);
            this.initEvents();
        }
        this.init(arg);
        if (!Painter.cache) {
            Painter.cache = {};
        }
        Painter.cache[this.id] = this;
    };
    try {
        //Object.defineProperties(p, {
        //nextStage: { get: p._get_nextStage, set: p._set_nextStage }
        // });
    } catch (e) {
        Painter.log('Object.defineProperties is not defined')
    }
    var s = Painter.inherit(Stage, Painter.BaseClass);
    Painter.createStage = function (arg) {
        return new s(arg);
    };
})();


//child.dispatchEvent("added");