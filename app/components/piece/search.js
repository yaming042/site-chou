import React, { Component } from 'react';

export default class Search extends Component{
    constructor(props){
        super(props);
        this.state = {
            value: '',
        };
    }

    handleChange(e){
        this.setState({
            value: e.target.value
        });
    }
    render(){
        let holder = this.props.holder || '搜索...';
        let className = this.props.className || '';
        let icon = this.props.icon || <span className="iconfont icon-sousuo"></span>;

        return (
            <div className="search-box">
                <input
                    type="text"
                    value={ this.state.value}
                    onChange={this.handleChange.bind(this)}
                    className={ className }
                    placeholder={ holder }
                />
                { icon }
            </div>
        );
    }
}