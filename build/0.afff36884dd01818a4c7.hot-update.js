webpackHotUpdate(0,{

/***/ 24:
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(5);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(12);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _SwipeToShowAction = __webpack_require__(25);

var _SwipeToShowAction2 = _interopRequireDefault(_SwipeToShowAction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var App = function (_Component) {
    _inherits(App, _Component);

    function App() {
        _classCallCheck(this, App);

        return _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).apply(this, arguments));
    }

    _createClass(App, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                _SwipeToShowAction2.default,
                { onDeleteClick: function onDeleteClick() {
                        handleDeleteInsRes(obj, {
                            isExposed: isExposed
                        });
                    } },
                _react2.default.createElement(
                    'div',
                    null,
                    _react2.default.createElement(
                        'p',
                        { className: 'pro_list_name' },
                        '\u534E\u6CF0\u5883\u5916\u77ED\u7EBF\u6ED1\u96EA\u4FDD\u9669 \u56E2\u961F\u6E38\u63A5\u5165\u4FDD\u9669\u9879\u76EE\u7528\u6D4B\u8BD5\u4E3B\u9669\u4E00\uFF08\u675C\u5B89\u653E\u4E13\u7528\uFF09'
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'price_mod_r' },
                        _react2.default.createElement(
                            'p',
                            null,
                            _react2.default.createElement(
                                'span',
                                { className: 'f_price' },
                                _react2.default.createElement(
                                    'dfn',
                                    null,
                                    '\xA5'
                                ),
                                price
                            ),
                            _react2.default.createElement(
                                'span',
                                { className: 'price_num' },
                                'x3\u4EFD'
                            )
                        )
                    )
                )
            );
        }
    }]);

    return App;
}(_react.Component);

_reactDom2.default.render(_react2.default.createElement(App, null), document.getElementById('root'));

/***/ }

})