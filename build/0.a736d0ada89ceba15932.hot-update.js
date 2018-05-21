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
                SwipeToShowAction,
                null,
                _react2.default.createElement(
                    'div',
                    { className: classnames("pro_list_item jsResUnavailableItem", { cur: isSelected }) },
                    isRequired ? _react2.default.createElement('i', { className: 'mandatorybox mandatorybox_l' }) : _react2.default.createElement('i', { className: 'checkbox checkbox_l',
                        onClick: function onClick() {
                            if (isExposed) {
                                handleAddInsRes(obj);
                            } else {
                                handleSwitchShoppingCartItemSelected([token], isSelected, isSelected ? childTokens : []);
                            }
                        } }),
                    _react2.default.createElement(
                        'p',
                        { className: 'pro_list_name arrow_r_s',
                            onClick: function onClick() {
                                handleGotoInsuranceDetail(DetailUrl);
                            }
                        },
                        insuranceSort,
                        name
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'pro_list_info' },
                        _react2.default.createElement(
                            'div',
                            { className: 'pro_list_time' },
                            useDate || defaultUseDate,
                            '\u81F3',
                            useEndDate || defaultUseEndDate
                        )
                    ),
                    unavailableResInfo[token] ? _react2.default.createElement(
                        'p',
                        { className: 'jsResUnavailable warning_text' },
                        '\u60A8\u9009\u62E9\u7684\u8D44\u6E90\u5DF2\u8BA2\u5B8C'
                    ) : null,
                    isExposed ? null : isMain && duplicated ? _react2.default.createElement(
                        'p',
                        { className: 'warning_text' },
                        '\u60A8\u9009\u62E9\u4E86\u591A\u7EC4\u4E3B\u9669\uFF0C\u8BF7\u53D6\u6D88\u591A\u4F59\u4FDD\u9669\uFF0C\u5E76\u786E\u4FDD\u4FDD\u9669\u65E5\u671F\u8986\u76D6\u6240\u6709\u884C\u7A0B\u3002'
                    ) : DepartDate !== useDate || ReturnDate !== useEndDate ? _react2.default.createElement(
                        'p',
                        { className: 'warning_text' },
                        '\u8BE5\u4FDD\u9669\u65E5\u671F\u6216\u76EE\u7684\u5730\u4E0E\u5F53\u524D\u884C\u7A0B\u4E0D\u7B26\uFF0C\u8BF7\u5220\u9664\u540E\u91CD\u65B0\u9009\u62E9'
                    ) : null,
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
                                'x',
                                count || StepCount,
                                '\u4EFD'
                            )
                        ),
                        isRequired ? _react2.default.createElement(
                            'div',
                            { className: 'type_mod type_book' },
                            '\u5FC5\u9009'
                        ) : null
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