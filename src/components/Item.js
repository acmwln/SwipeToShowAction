import React, { Component } from 'react';
import ReactDom from 'react-dom';
import SwipeToShowAction from './SwipeToShowAction'
export default class Item extends Component {
    render() {
        return (
            <SwipeToShowAction onDeleteClick={() => {
                alert("hello world!");
                }}
                invalidMsg = ""
                >
                <div className="pro_list_item">
                    <p className="pro_list_name">
                        华泰境外短线滑雪保险 团队游接入保险项目用测试主险一
                    </p>
                    <div className="price_mod_r">
                        <p>
                            <span className="f_price">
                                <dfn>¥</dfn>120
                            </span>
                            <span className="price_num">x3份</span>
                        </p>
                    </div>
                </div>
            </SwipeToShowAction>
        );
    }
}