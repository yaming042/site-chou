import React, { Component } from 'react';

import * as events from '../../Events';

export default class Search extends Component{
    constructor(props){
        super(props);
        this.state = {
            value: '',
        };
    }

    search(){
        // events.customEvents.emit(events.UPDATA_SEARCH);
        alert('search');
    }

    render(){

        return (
            <div>
                <input
                    type="text"
                    value={ this.state.value }
                    onChange={
                        (e) => {
                            this.setState({
                                value: e.target.value,
                            });
                        }
                    }
                    className={ this.props.className || '' }
                    placeholder={ this.props.holder || '搜索...' }
                />
                { this.props.icon || <span className="iconfont icon-sousuo" onClick={ this.search.bind(this) }></span> }
            </div>
        );
    }
}