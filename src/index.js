import React, { Component } from 'react';
import ReactDom from 'react-dom';
import Item from './components/Item'

class App extends Component {
    render() {
        return  <Item />
    }
}

ReactDom.render(
    <App />,
    document.getElementById('root')
)