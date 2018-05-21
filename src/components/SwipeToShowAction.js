import React, { Component } from 'react';
import ReactDom from 'react-dom';
import _ from "lodash";
import PullElement from 'pull-element'

/**
 * @param props
 * invalidMsg:'' //不可点击的话术
 * onDeleteClick: ()=>{}
 */
export default class SwipeToShowAction extends Component {
    addPullElement() {
        this.pullElement = new PullElement({
            target: this.container,
            wait: false,
            onPullRight({ translateX }) {
                if (translateX >= 0) {
                    this.preventDefault()
                    this.setTranslate(0, 0)
                }
            },
            onPullLeft({ translateX }) {
                if (-translateX > 80) {
                    this.preventDefault()
                    this.setTranslate(-80, 0)
                }
            },
            onPullLeftEnd({ translateX }) {
                if (-translateX >= 30) {
                    this.preventDefault()
                    this.animateTo(-80, 0)
                }
            }
        })
        this.pullElement.init()
    }
    removePullElement() {
        this.pullElement&&this.pullElement.destroy()
    }
    addOuterTouchStartListener() {
        document.addEventListener('touchstart', this.handleOuterTouchStart.bind(this))
    }
    removeOuterTouchStartListener() {
        document.removeEventListener('touchstart', this.handleOuterTouchStart.bind(this))
    }
    onDeleteClick() {
        this.props.onDeleteClick()
        this.pullElement.animateToOrigin()
    }
    handleOuterTouchStart({ target }) {
        let node = this.container
        if (node !== target && !node.contains(target)) {
            this.pullElement.animateToOrigin()
        }
    }
    componentDidMount() {
        const invalid = this.props.invalid
        const valid = this.props.invalidMsg || this.props.onDeleteClick
        if (valid&&!invalid) {
            this.addPullElement()
            this.addOuterTouchStartListener()
        }
    }
    componentWillUnmount() {
        this.removePullElement()
        this.removeOuterTouchStartListener()
    }
    getLeftBtn() {
        if (this.props.invalidMsg) {
            return (
                <div className="pro_del_btn">
                    <span className="disable">{this.props.invalidMsg}</span>
                </div>
            )
        } else if (this.props.onDeleteClick) {
            return (
                <div className="pro_del_btn">
                    <span onClick={this.onDeleteClick.bind(this)}>删除</span>
                </div>
            )
        }
    }
    render() {
        return (
            <div
                key="swipe"
                style={{position:'relative'}}
                className={this.props.className || ''}
                ref={ref => (this.container = ref)}
            >
                {this.props.children}
                {this.getLeftBtn()}
            </div>
        )
    }
}
