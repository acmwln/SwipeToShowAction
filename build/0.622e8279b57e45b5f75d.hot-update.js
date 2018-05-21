webpackHotUpdate(0,{

/***/ 14:
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(3);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(7);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _lodash = __webpack_require__(28);

var _lodash2 = _interopRequireDefault(_lodash);

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
            document.addEventListener('touchstart', this.handleOuterTouchStart.bind(this));
        }
    }, {
        key: 'removeOuterTouchStartListener',
        value: function removeOuterTouchStartListener() {
            document.removeEventListener('touchstart', this.handleOuterTouchStart.bind(this));
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
            if (node !== target && node.contains(node, target)) {
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
                        { onClick: this.onDeleteClick.bind(this) },
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