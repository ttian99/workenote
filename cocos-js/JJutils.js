var JJ = JJ || {};

JJ.exNode = function(node) {
	node.addTo_ = function(parent, z, t) {
		parent.addChild(node, z || 0, t || 0);
		return node;
	}

	/**
	 * 是否显示控件
	 * @param  {[Boolean]} visible [description]
	 * @return {[type]}         [description]
	 */
	node.show_ = function(visible) {
		node.setVisible(visible);
		return node;
	}

	/**
	 * 设置控件位置
	 * @param  {[type]} newPosOrxValue cc.p(x, y) or x
	 * @param  {[type]} yValue         [description]
	 * @return {[type]}                [description]
	 */
	node.pos_ = function(newPosOrxValue, yValue) {
		var pos = yValue === undefined ? newPosOrxValue : cc.p(newPosOrxValue, yValue);
		node.setPosition(pos);
		return node;
	}

	/**
	 * 设置锚点(默认是cc.p(0.5, 0.5))
	 * @param  {cc.p||Number} point [description]
	 * @param  {Number} y     [y] [0.0 - 1.0]
	 * @return {[type]}       [description]
	 */
	node.anchor_ = function(point, y) {
		var pos = y === undefined ? point : cc.p(point, y);
		node.setAnchorPoint(pos);
		return node;
	}

	/**
	 * 设置ZOrder
	 * @param  {Number} z 默认是0，数字越小，越在下面
	 * @return {[type]}   [description]
	 */
	node.z_ = function(z) {
		node.setLocalZOrder(z);
		return node;
	}

	/**
	 * node的tag值
	 * @param  {[type]} tag [description]
	 * @return {[type]}     [description]
	 */
	node.tag_ = function(tag) {
		node.setTag(tag);
		return node;
	}

	/**
	 * 缩放
	 * @param  {Number} scale  scale or scaleX value
	 * @param  {Number} scaleY [scaleY=]
	 * @return {[type]}        [description]
	 */
	node.scale_ = function(scale, scaleY) {
		scaleY = scaleY !== undefined ? scaleY : scale;
		node.setScale(scale, scaleY);
		return node;
	}

	/**
	 * 水平翻转
	 * @param  {[Boolean]} flippedX [是否翻转]
	 * @return {[type]}          [description]
	 */
	node.flipX_ = function(flippedX) {
		node.setFlippedX(flippedX);
		return node;
	}

	/**
	 * 垂直翻转
	 * @param  {[type]} flippedY [description]
	 * @return {[type]}          [description]
	 */
	node.flipY_ = function(flippedY) {
		node.setFlippedY(flippedY);
		return node;
	}

	/**
	 * 设置透明度(0是透明，255是不透明)
	 * @param  {[type]} opacity [0 - 255]
	 * @return {[type]}         [description]
	 */
	node.opacity_ = function(opacity) {
		node.setOpacity(opacity);
		return node;
	}

	/**
	 * [color_ description]
	 * @param  {cc.color} color [description]
	 * @return {[type]}       [description]
	 * @note   只支持cc.color(r, g, b); 不支持透明，透明请使用opacity
	 */
	node.color_ = function(color) {
		node.setColor(color);
		return node;
	}

	/**
	 * 旋转
	 * @param  {Number} newRotation 度数[0 - 359]，默认的角度
	 * @return {[type]}             [description]
	 */
	node.rotation_ = function(newRotation) {
		node.setRotation(newRotation);
		return node;
	}

	/**
	 * [rotationX_ description]
	 * @param  {[type]} rotationX [description]
	 * @return {[type]}           [description]
	 */
	node.rotationX_ = function(rotationX) {
		node.setRotationX(rotationX);
		return node;
	}

	node.rotationY_ = function(rotationY) {
		node.setRotationY(rotationY);
		return node;
	}

	/**
	 * 倾斜、扭曲
	 * @param  {Number} newSkewX [description]
	 * @return {[type]}          [description]
	 */
	node.skewX_ = function(newSkewX) {
		node.setSkewX(newSkewX);
		return node;
	}

	node.skewY_ = function(newSkewY) {
		node.setSkewY(newSkewY);
		return node;
	}

	return node;
}

JJ.playMusic = function(res, loop) {
	return cc.audioEngine.playMusic(res, loop);
};

JJ.stopMusic = function(releaseData) {
	return cc.audioEngine.stopMusic(releaseData)
};


JJ.addSpriteFrameCache = function(plist) {
	cc.spriteFrameCache.addSpriteFrames(plist);
}


/**
 * [ctor description]
 * @param  {[setTouchEnabled]}  touch事件开启、关闭
 * @param  {[setPriority]}      设置触摸优先级
 * @param  {[setTouchSwallow]}  设置是否吞噬触摸
 * @param  {[setTouchZoom]}     设置是否点击放大
 * @param  {[setTouchCallBack]} 设置回调函数
 */
var spriteButton = cc.Sprite.extend({

    _touchCallBack: null,
    _priority: 0,
    _touchEnabled: true,
    _touchSwallow: true,
    _touchListener: null,
    _touchZoom: true,
    _scale: 1,
 	_touchfile: null,
 	_normalfile: null,
 	_finishfile: null,

    ctor: function(normalfile, touchfile, finishfile) {
        this._super(normalfile, touchfile, finishfile);
        this._normalfile = normalfile;
        this._touchfile = touchfile;
        this._finishfile = finishfile;
    },

    onEnter: function() {
        this._super();
        this.setTouchEnabled(this._touchEnabled);
    },

    onExit: function() {
        this.setTouchEnabled(false);
        this._super();
    },

    registerTouch: function() {
        this.unregisterTouch();
        this._touchListener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: this._touchSwallow,
            onTouchBegan: function(touch, event) {
                if (!this.isTouchInside(touch)) {
                    return false;
                }
                if(this._touchfile){
                	this.setTexture(this._touchfile);	
                }
                this._scale = this.scale;
                // if (this._touchZoom) this.scale = 1.1 * this.scale;
                return true;
            }.bind(this),
            onTouchMoved: function(touch, event) {
                if (!this.isTouchInside(touch)) {
                    if (this._touchZoom) this.scale = this._scale;
                }
            }.bind(this),
            onTouchEnded: function(touch, event) {
                if (this._touchZoom) this.scale = this._scale;
                if (!this.isTouchInside(touch)) {
                	this.setTexture(this._normalfile);
                    return;
                }
                		
                if (this._touchCallBack) {
                    this._touchCallBack(this);
                }

                this.setTexture(this._finishfile);
            }.bind(this)
        });

        if (this._priority !== 0) {
            cc.eventManager.addListener(this._touchListener, this._priority);
        } else {
            cc.eventManager.addListener(this._touchListener, this);
        }

    },

    unregisterTouch: function() {
        if (this._touchListener) {
            cc.eventManager.removeListener(this._touchListener);
            this._touchListener = null;
        }
    },

    setTouchEnabled: function(bvar) {
        if (bvar) {
            this.registerTouch();
        } else {
            this.unregisterTouch();
        }
        this._touchEnabled = bvar;

        return this;
    },

    setPriority: function(priority) {
        if (this._priority != priority) {
            this._priority = priority;

            if (this._touchEnabled) {
                this.registerTouch();
            }
        }
        return this;
    },

    setTouchSwallow: function(bvar) {
        if (this._touchSwallow != bvar) {
            this._touchSwallow = bvar;

            if (this._touchEnabled) {
                this.registerTouch();
            }
        }
        return this;
    },

    setTouchZoom: function(bvar) {
        this._touchZoom = bvar;
        return this;
    },

    setTouchCallBack: function(func) {
        this._touchCallBack = func;
        return this;
    },

    isTouchInside: function(touch) {
        var touchLocation = touch.getLocation();
        touchLocation = this.getParent().convertToNodeSpace(touchLocation);
        return cc.rectContainsPoint(this.getBoundingBox(), touchLocation);
    }
});

JJ.Btn = function(normalfile, two, three, four) {
	var touchfile, finishfile, callback;
	normalfile = normalfile;
	if (cc.isFunction(two)){
		callback = two;
		touchfile = normalfile;
		finishfile = normalfile;
		console.log("get in ---------------")
	}else if(cc.isFunction(three)){
		callback = three;
		touchfile = two !== undefined ? two : normalfile;
		finishfile = normalfile;
	}else if(cc.isFunction(four)){
		callback = four;
		touchfile = two !== undefined ? two : normalfile;
		finishfile = three !== undefined ? three : normalfile;
	}

	// console.log("touchfile === " + touchfile);
	// console.log("normalfile === " + normalfile);
	// console.log("callback === " + callback);
    
	var btn = new spriteButton(normalfile, touchfile, finishfile);
    btn.setTouchCallBack(callback);
    return JJ.exNode(btn);
};




/**
 * [ctor description]
 * @param  {[setTouchEnabled]}  touch事件开启、关闭
 * @param  {[setPriority]}      设置触摸优先级
 * @param  {[setTouchSwallow]}  设置是否吞噬触摸
 * @param  {[setTouchZoom]}     设置是否点击放大
 * @param  {[setTouchCallBack]} 设置回调函数
 */
var toggleButton = cc.Sprite.extend({

    _touchCallBack: null,
    _priority: 0,
    _touchEnabled: true,
    _touchSwallow: true,
    _touchListener: null,
    _touchZoom: true,
    _scale: 1,
    _startfile: null,
    _endfile: null,

    ctor: function(onfile, offfile) {
        this._super(onfile, offfile);
        this._startfile = onfile;
        this._endfile = offfile;
    },

    onEnter: function() {
        this._super();
        this.setTouchEnabled(this._touchEnabled);
    },

    onExit: function() {
        this.setTouchEnabled(false);
        this._super();
    },

    registerTouch: function() {
        this.unregisterTouch();
        this._touchListener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: this._touchSwallow,
            onTouchBegan: function(touch, event) {
                if (!this.isTouchInside(touch)) {
                    return false;
                }

                this._scale = this.scale;
                // if (this._touchZoom) this.scale = 1.1 * this.scale;
                return true;
            }.bind(this),
            onTouchMoved: function(touch, event) {
                if (!this.isTouchInside(touch)) {
                    if (this._touchZoom) this.scale = this._scale;
                }
            }.bind(this),
            onTouchEnded: function(touch, event) {
                if (this._touchZoom) this.scale = this._scale;
                if (!this.isTouchInside(touch)) {
                	this.setTexture(this._startfile);
                    return;
                }
                		
                if (this._touchCallBack) {
                    this._touchCallBack(this);
                }
                

                this.setTexture(this._endfile);
                var midfile = this._startfile;
                this._startfile = this._endfile;
                this._endfile = midfile;
                // console.log("_startfile====" + this._startfile);
                // console.log("_endfile ======"+ this._endfile);
                // console.log("midfile====" + midfile);
            }.bind(this)
        });

        if (this._priority !== 0) {
            cc.eventManager.addListener(this._touchListener, this._priority);
        } else {
            cc.eventManager.addListener(this._touchListener, this);
        }

    },

    unregisterTouch: function() {
        if (this._touchListener) {
            cc.eventManager.removeListener(this._touchListener);
            this._touchListener = null;
        }
    },

    setTouchEnabled: function(bvar) {
        if (bvar) {
            this.registerTouch();
        } else {
            this.unregisterTouch();
        }
        this._touchEnabled = bvar;

        return this;
    },

    setPriority: function(priority) {
        if (this._priority != priority) {
            this._priority = priority;

            if (this._touchEnabled) {
                this.registerTouch();
            }
        }
        return this;
    },

    setTouchSwallow: function(bvar) {
        if (this._touchSwallow != bvar) {
            this._touchSwallow = bvar;

            if (this._touchEnabled) {
                this.registerTouch();
            }
        }
        return this;
    },

    setTouchZoom: function(bvar) {
        this._touchZoom = bvar;
        return this;
    },

    setTouchCallBack: function(func) {
        this._touchCallBack = func;
        return this;
    },

    isTouchInside: function(touch) {
        var touchLocation = touch.getLocation();
        touchLocation = this.getParent().convertToNodeSpace(touchLocation);
        return cc.rectContainsPoint(this.getBoundingBox(), touchLocation);
    }
});



JJ.toggleBtn = function(onfile, offfile, callback) {
	var toggle = true;
	var btn = new toggleButton(onfile, offfile, toggle);
	btn.setTouchCallBack(callback);
	return JJ.exNode(btn);
}



/**
 * [ctor description]
 * @param  {[setTouchEnabled]}  touch事件开启、关闭
 * @param  {[setPriority]}      设置触摸优先级
 * @param  {[setTouchSwallow]}  设置是否吞噬触摸
 * @param  {[setTouchZoom]}     设置是否点击放大
 * @param  {[setTouchCallBack]} 设置回调函数
 */
var sampleButton = cc.Sprite.extend({

    _touchCallBack: null,
    _priority: 0,
    _touchEnabled: true,
    _touchSwallow: true,
    _touchListener: null,
    _touchZoom: true,
    _scale: 1,
    // _normalfile: null,
    // _touchfile: null,
    // _finishfile: null,

    ctor: function(normalfile, rect, rotated) {
        this._super(normalfile, rect, rotated);
    },

    onEnter: function() {
        this._super();
        this.setTouchEnabled(this._touchEnabled);
    },

    onExit: function() {
        this.setTouchEnabled(false);
        this._super();
    },

    registerTouch: function() {
        this.unregisterTouch();
        this._touchListener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: this._touchSwallow,
            onTouchBegan: function(touch, event) {
                if (!this.isTouchInside(touch)) {
                    return false;
                }
                this._scale = this.scale;
                if (this._touchZoom) this.scale = 1.1 * this.scale;
                return true;
            }.bind(this),
            onTouchMoved: function(touch, event) {
                if (!this.isTouchInside(touch)) {
                    if (this._touchZoom) this.scale = this._scale;
                }
            }.bind(this),
            onTouchEnded: function(touch, event) {
                if (this._touchZoom) this.scale = this._scale;
                if (!this.isTouchInside(touch)) {
                    return;
                }

                if (this._touchCallBack) {
                    this._touchCallBack(this);
                }
            }.bind(this)
        });

        if (this._priority !== 0) {
            cc.eventManager.addListener(this._touchListener, this._priority);
        } else {
            cc.eventManager.addListener(this._touchListener, this);
        }

    },

    unregisterTouch: function() {
        if (this._touchListener) {
            cc.eventManager.removeListener(this._touchListener);
            this._touchListener = null;
        }
    },

    setTouchEnabled: function(bvar) {
        if (bvar) {
            this.registerTouch();
        } else {
            this.unregisterTouch();
        }
        this._touchEnabled = bvar;

        return this;
    },

    setPriority: function(priority) {
        if (this._priority != priority) {
            this._priority = priority;

            if (this._touchEnabled) {
                this.registerTouch();
            }
        }
        return this;
    },

    setTouchSwallow: function(bvar) {
        if (this._touchSwallow != bvar) {
            this._touchSwallow = bvar;

            if (this._touchEnabled) {
                this.registerTouch();
            }
        }
        return this;
    },

    setTouchZoom: function(bvar) {
        this._touchZoom = bvar;
        return this;
    },

    setTouchCallBack: function(func) {
        this._touchCallBack = func;
        return this;
    },

    isTouchInside: function(touch) {
        var touchLocation = touch.getLocation();
        touchLocation = this.getParent().convertToNodeSpace(touchLocation);
        return cc.rectContainsPoint(this.getBoundingBox(), touchLocation);
    }
});

JJ.sampleBtn = function(parent, normalfile, pos, cb) {
    var btn = new sampleButton(normalfile);
    btn.setPosition(pos);
    btn.setTouchCallBack(cb);
    parent.addChild(btn);

    // if (isOpenHeartAction){
    //     //Ltc.heartAction(btn);
    // }
    return JJ.exNode(btn);
};