import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class Input extends Component{
    constructor() {
        super();
        this.state = {
            value: '',
            style: 'input-normal'
        }
    }

    componentWillMount() {
        if (this.props.value)
            this.setState({
                value: this.props.value
            })
    }

    componentDidMount() {
        let validateFunc = this.props.validateFunc;
        var _this = this;
        if (validateFunc) {
            let len = validateFunc.length;
            for (let i = 0; i < len; i++) {
                ReactDOM.findDOMNode(this.refs.myInput).addEventListener(validateFunc[i].event, validateFunc[i].func.bind(_this));
            }
        }
    }

    handleChange(event) {
        this.setState({
            value: event.target.value
        })
    }

    handleFocus(event) {
        this.setState({
            style: 'input-focus'
        });
    }

    handleBlur(event) {
        this.setState({
            style: 'input-normal'
        })
        let _this = this;
        setTimeout(() => {
            if (_this.props.pushState) {
                _this.props.pushState(_this.state.value);
            }
        });

    }

    render() {
        let placeholder = this.props.placeholder || '';
        let extendClass = this.props.extendClass || '';
        let type = this.props.type || 'text';
        let name = this.props.name || '';
        return (
            <input
                ref="myInput"
                type={type}
                className={"my-input " + this.state.style + ' ' + extendClass}
                placeholder={placeholder}
                value={this.state.value}
                name={name}
                onChange={this.handleChange.bind(this)}
                onFocus={this.handleFocus.bind(this)}
                onBlur={this.handleBlur.bind(this)}
            />
        )
    }
}