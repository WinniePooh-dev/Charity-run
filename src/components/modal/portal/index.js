import React, { Component } from "react";
import ReactDOM from "react-dom";

export default class Portal extends Component {
    constructor(props) {
        super(props);
        this.el = document.createElement('div');
        this.main = document.getElementById('root');
    }

    componentDidMount = () => {
        document.body.appendChild(this.el);
        this.main.classList.toggle('blur');
    }

    componentWillUnmount = () => {
        document.body.removeChild(this.el);
        this.main.classList.toggle('blur');
    }

    render() {
        const { children } = this.props;
        return ReactDOM.createPortal(children, this.el);
    }
}