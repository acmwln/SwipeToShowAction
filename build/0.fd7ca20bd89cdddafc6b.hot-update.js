webpackHotUpdate(0,{

/***/ 27:
/***/ function(module, exports, __webpack_require__) {

/*!
 * @license
 * pull-element.js v1.1.1
 * (c) 2017 Jade Gu
 * Released under the MIT License.
 * https://github.com/Lucifier129/pull-element
 */
(function(global, factory) {
	 true ? module.exports = factory() :
		typeof define === 'function' && define.amd ? define(factory) :
		global.PullElement = factory();
}(this, function() {
	'use strict';

	function extend(target) {
		var args = arguments
		var argsLen = args.length
		for (var i = 1; i < argsLen; i++) {
			var source = args[i]
			for (var key in source) {
				target[key] = source[key]
			}
		}
		return target
	}

	function isNumber(obj) {
		return typeof obj === 'number' && !isNaN(obj)
	}

	function isFunction(obj) {
		return typeof obj === 'function'
	}

	function getScrollEndingInfo(scroller, isGlobalScroller) {
		var scrollTop, scrollLeft, offsetWidth, offsetHeight
		var scrollWidth = scroller.scrollWidth
		var scrollHeight = scroller.scrollHeight

		if (isGlobalScroller) {
			var documentElement = document.documentElement
			var documentBody = document.body
			offsetWidth = documentElement.clientWidth
			offsetHeight = documentElement.clientHeight
			scrollTop = documentBody.scrollTop || documentElement.scrollTop
			scrollLeft = documentBody.scrollLeft || documentElement.scrollLeft
		} else {
			offsetWidth = scroller.offsetWidth
			offsetHeight = scroller.offsetHeight
			scrollTop = scroller.scrollTop
			scrollLeft = scroller.scrollLeft
		}

		return {
			isScrollTopEnd: scrollTop <= 0,
			isScrollBottomEnd: offsetHeight + scrollTop >= scrollHeight,
			isScrollLeftEnd: scrollLeft <= 0,
			isScrollRightEnd: offsetWidth + scrollLeft >= scrollWidth,
		}
	}

	function getElem(elem) {
		return typeof elem === 'string' ? document.querySelector(elem) : elem
	}

	function addEvent(elem, type, handler, options) {
		elem.addEventListener(type, handler, options)
	}

	function removeEvent(elem, type, handler) {
		elem.removeEventListener(type, handler)
	}

	function getCoor(event) {
		var targetEvent = event.touches[0]
		return {
			x: targetEvent.clientX,
			y: targetEvent.clientY,
		}
	}

	function transformValueByDamping(value, damping) {
		if (isFunction(damping)) {
			return damping(value)
		}
		if (isNumber(damping) && !isNaN(damping)) {
			return value / damping
		}
		return value
	}

	function getTranslateStyle(translateX, translateY) {
		var translateValue = 'translate(' + translateX + 'px,' + translateY + 'px) translateZ(0)'
		return {
			transform: translateValue,
			webkitTransform: translateValue,
		}
	}

	// https://developers.google.com/web/updates/2017/01/scrolling-intervention
	var eventHandlerOptions = {
		passive: false,
	}

	var emptyStyle = {
		transition: '',
		transform: '',
		webkitTransform: '',
		webkitTransition: '',
	}

	var emptyTransitionStyle = {
		transition: '',
		webkitTransition: '',
	}

	var eventMap = {
		pullDown: 'onPullDown',
		pullUp: 'onPullUp',
		pullRight: 'onPullRight',
		pullLeft: 'onPullLeft',
	}

	var propMap = {
		pullDown: 'isScrollTopEnd',
		pullUp: 'isScrollBottomEnd',
		pullRight: 'isScrollLeftEnd',
		pullLeft: 'isScrollRightEnd',
	}

	var defaultOffsetState = {
		action: '',
		axis: '',
		translateX: 0,
		translateY: 0,
	}

	var defaultState = extend({
		isScrollTopEnd: true,
		isScrollLeftEnd: true,
		isScrollBottomEnd: true,
		isScrollRightEnd: true,
		clientX: 0,
		clientY: 0,
	}, defaultOffsetState)

	var defaultOptions = {
		target: 'body',
		scroller: '',
		trigger: '',
		damping: 1.6,
		wait: true,
		pullUp: false,
		pullDown: false,
		pullLeft: false,
		pullRight: false,
		detectScroll: false,
		detectScrollOnStart: false,
		stopPropagation: false,
		drag: false,
		transitionProperty: 'transform',
		transitionDuration: '0.3s',
		transitionTimingFunction: 'ease-out',
	}

	var isSupportPromise = typeof Promise === 'function'

	function PullElement(options) {
		this.options = extend({}, defaultOptions, options)
		this.state = extend({}, defaultState)
		this.target = null
		this.scroller = null
		this.trigger = null
		this.transitionStyle = null
		this.isTouching = false
		this.isPreventDefault = false
		this.isWaiting = false
		this.isGlobalScroller = false
		this.transitionDuration = 0
		this.handleTouchStart = this.handleTouchStart.bind(this)
		this.handleTouchMove = this.handleTouchMove.bind(this)
		this.handleTouchEnd = this.handleTouchEnd.bind(this)
	}

	extend(PullElement.prototype, {
		init: function() {
			var options = this.options
			var target = getElem(options.target)
			var scroller = options.scroller
				? getElem(options.scroller)
				: target
			var trigger = options.trigger
				? getElem(options.trigger)
				: target

			this.target = target
			this.scroller = scroller
			this.trigger = trigger
			this.isGlobalScroller = (
				scroller === document.body ||
				scroller === window ||
				scroller === document.documentElement
			)
			this.transitionStyle = {
				transitionProperty: options.transitionProperty,
				transitionDuration: options.transitionDuration,
				transitionTimingFunction: options.transitionTimingFunction,
				webkitTransitionProperty: options.transitionProperty,
				webkitTransitionDuration: options.transitionDuration,
				webkitTransitionTimingFunction: options.transitionTimingFunction,
			}
			/**
			* in some browser, transitionend dose'nt work as expected
			* use setTimeout instead
			*/
			var transitionDuration = Number(options.transitionDuration.replace(/[^.\d]+/g, ''))

			// transform 1s to 1000ms
			if (/[\d\.]+s$/.test(options.transitionDuration)) {
				transitionDuration = transitionDuration * 1000
			}
			this.transitionDuration = transitionDuration
			this.enable()
		},
		destroy: function() {
			this.disable()
		},
		setTranslate: function(translateX, translateY) {
			extend(
				this.target.style,
				emptyTransitionStyle,
				getTranslateStyle(translateX, translateY)
			)
		},
		animateTo: function(translateX, translateY, callback) {
			var state = this.state
			var target = this.target
			var transitionDuration = this.transitionDuration
			var transitionStyle = this.transitionStyle
			var translateStyle = getTranslateStyle(translateX, translateY)

			state.translateX = translateX
			state.translateY = translateY

			var createTransitionEndHandler = function(callback) {
				extend(target.style, transitionStyle, translateStyle)
				setTimeout(callback, transitionDuration)
			}

			if (isSupportPromise) {
				return new Promise(createTransitionEndHandler).then(callback)
			}
			createTransitionEndHandler(callback)
		},
		animateToOrigin: function(callback) {
			var context = this
			var finalCallback = function() {
				extend(context.target.style, emptyStyle)
				extend(context.state, defaultOffsetState)
				context.isWaiting = false
				callback && callback()
			}
			return this.animateTo(0, 0, finalCallback)
		},
		enable: function() {
			addEvent(this.trigger, 'touchstart', this.handleTouchStart)
			addEvent(document, 'touchmove', this.handleTouchMove, eventHandlerOptions)
			addEvent(document, 'touchend', this.handleTouchEnd)
			addEvent(document, 'touchcancel', this.handleTouchEnd)
		},
		disable: function() {
			removeEvent(this.trigger, 'touchstart', this.handleTouchStart)
			removeEvent(document, 'touchmove', this.handleTouchMove, eventHandlerOptions)
			removeEvent(document, 'touchend', this.handleTouchEnd)
			removeEvent(document, 'touchcancel', this.handleTouchEnd)
		},
		preventDefault: function() {
			this.isPreventDefault = true
		},
		getScrollInfo: function() {
			return getScrollEndingInfo(this.scroller, this.isGlobalScroller)
		},
		isActiveAction: function(action) {
			var options = this.options
			var eventName = eventMap[action]
			return options[eventName] || options[eventName + 'End'] || options[action]
		},
		emit: function(eventName, data) {
			var listener = this.options[eventName]
			if (isFunction(listener)) {
				listener.call(this, data)
			}
		},
		handleTouchStart: function(event) {
			if (this.isTouching || this.isWaiting) {
				return
			}
			var options = this.options
			var coor = getCoor(event)

			extend(this.state, {
				clientX: coor.x,
				clientY: coor.y,
				axis: '',
				action: '',
			})
			
			if (options.detectScroll || options.detectScrollOnStart) {
				extend(this.state, this.getScrollInfo())
			}

			if (options.stopPropagation) {
				event.stopPropagation()
			}

			this.isTouching = true
		},
		handleTouchMove: function(event) {
			if (!this.isTouching) {
				return
			}
			var coor = getCoor(event)
			var options = this.options
			var state = this.state
			var clientX = coor.x
			var clientY = coor.y
			var deltaX = clientX - state.clientX
			var deltaY = clientY - state.clientY
			var translateX = state.translateX
			var translateY = state.translateY
			var axis = state.axis
			var action = state.action

			// only check the axis once
			if (!axis) {
				axis = Math.abs(deltaY) >= Math.abs(deltaX) ? 'y' : 'x'
			}

			// only check the action once
			if (!action) {
				if (axis === 'y') {
					if (deltaY > 0) {
						action = 'pullDown'
					} else if (deltaY < 0) {
						action = 'pullUp'
					}
				} else if (axis === 'x') {
					if (deltaX > 0) {
						action = 'pullRight'
					} else if (deltaX < 0) {
						action = 'pullLeft'
					}
				}
			}

			var isActiveAction = this.isActiveAction(action)

			if (isActiveAction && options.detectScroll && !state[propMap[action]]) {
				extend(state, this.getScrollInfo())
				if (state[propMap[action]]) {
					deltaX = 0
					deltaY = 0
				}
			}

			var isActiveAndEnging = isActiveAction && state[propMap[action]]

			if (isActiveAndEnging) {
				translateX += transformValueByDamping(deltaX, options.damping)
				translateY += transformValueByDamping(deltaY, options.damping)
			}
			
			extend(state, {
				clientX: clientX,
				clientY: clientY,
				translateX: translateX,
				translateY: translateY,
				action: action,
				axis: axis,
			})

			if (!isActiveAndEnging) {
				return
			}

			if (!options.drag) {
				if (axis === 'y') {
					translateX = 0
				} else if (axis === 'x') {
					translateY = 0
				}
			}

			this.emit(eventMap[action], {
				translateX: translateX,
				translateY: translateY,
			})

			if (this.isPreventDefault) {
				this.isPreventDefault = false
				return
			}

			if (options.wait) {
				this.isWaiting = true
			}

			event.preventDefault()
			this.setTranslate(translateX, translateY)
		},
		handleTouchEnd: function() {
			if (!this.isTouching) {
				return
			}
			this.isTouching = false

			var state = this.state
			var action = state.action
			if (!this.isActiveAction(action) || !state[propMap[action]]) {
				return
			}

			this.emit(eventMap[action] + 'End', {
				translateX: state.translateX,
				translateY: state.translateY,
			})
			
			if (this.isPreventDefault) {
				this.isPreventDefault = false
				return
			}

			this.animateToOrigin()
		},
	})

	return PullElement
}));

/***/ },

/***/ 7:
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(3);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(8);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _pullElement = __webpack_require__(27);

var _pullElement2 = _interopRequireDefault(_pullElement);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @param props
 * invalidMsg:'' //不可点击的话术
 * onDeleteClick: ()=>{}
 */
var SwipeToShowAction = function (_Component) {
    _inherits(SwipeToShowAction, _Component);

    function SwipeToShowAction() {
        _classCallCheck(this, SwipeToShowAction);

        return _possibleConstructorReturn(this, (SwipeToShowAction.__proto__ || Object.getPrototypeOf(SwipeToShowAction)).apply(this, arguments));
    }

    _createClass(SwipeToShowAction, [{
        key: 'addPullElement',
        value: function addPullElement() {
            this.pullElement = new _pullElement2.default({
                target: this.container,
                wait: false,
                onPullRight: function onPullRight(_ref) {
                    var translateX = _ref.translateX;

                    if (translateX >= 0) {
                        this.preventDefault();
                        this.setTranslate(0, 0);
                    }
                },
                onPullLeft: function onPullLeft(_ref2) {
                    var translateX = _ref2.translateX;

                    if (-translateX > 80) {
                        this.preventDefault();
                        this.setTranslate(-80, 0);
                    }
                },
                onPullLeftEnd: function onPullLeftEnd(_ref3) {
                    var translateX = _ref3.translateX;

                    if (-translateX >= 30) {
                        this.preventDefault();
                        this.animateTo(-80, 0);
                    }
                }
            });
            this.pullElement.init();
        }
    }, {
        key: 'removePullElement',
        value: function removePullElement() {
            this.pullElement && this.pullElement.destroy();
        }
    }, {
        key: 'addOuterTouchStartListener',
        value: function addOuterTouchStartListener() {
            document.addEventListener('touchstart', this.handleOuterTouchStart);
        }
    }, {
        key: 'removeOuterTouchStartListener',
        value: function removeOuterTouchStartListener() {
            document.removeEventListener('touchstart', this.handleOuterTouchStart);
        }
    }, {
        key: 'onDeleteClick',
        value: function onDeleteClick() {
            this.props.onDeleteClick();
            this.pullElement.animateToOrigin();
        }
    }, {
        key: 'handleOuterTouchStart',
        value: function handleOuterTouchStart(_ref4) {
            var target = _ref4.target;

            var node = this.container;
            if (node !== target && !node.contains(target)) {
                this.pullElement.animateToOrigin();
            }
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            var invalid = this.props.invalid;
            var valid = this.props.invalidMsg || this.props.onDeleteClick;
            if (valid && !invalid) {
                this.addPullElement();
                this.addOuterTouchStartListener();
            }
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.removePullElement();
            this.removeOuterTouchStartListener();
        }
    }, {
        key: 'getLeftBtn',
        value: function getLeftBtn() {
            if (this.props.invalidMsg) {
                return _react2.default.createElement(
                    'div',
                    { className: 'pro_del_btn' },
                    _react2.default.createElement(
                        'span',
                        { className: 'disable' },
                        this.props.invalidMsg
                    )
                );
            } else if (this.props.onDeleteClick) {
                return _react2.default.createElement(
                    'div',
                    { className: 'pro_del_btn' },
                    _react2.default.createElement(
                        'span',
                        { onClick: this.onDeleteClick },
                        '\u5220\u9664'
                    )
                );
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            return _react2.default.createElement(
                'div',
                {
                    key: 'swipe',
                    style: { position: 'relative' },
                    className: this.props.className || '',
                    ref: function ref(_ref5) {
                        return _this2.container = _ref5;
                    }
                },
                this.props.children,
                this.getLeftBtn()
            );
        }
    }]);

    return SwipeToShowAction;
}(_react.Component);

exports.default = SwipeToShowAction;

/***/ }

})