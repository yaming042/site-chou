import React, { Component } from 'react';

import { browserHistory } from 'react-router';

import {List, ListItem, makeSelectable} from 'material-ui/List';

import store from '../../store';
import * as TYPE from '../../../app/const';

let SelectableList = makeSelectable(List);

let defaultVal = window.location.pathname || '/admin/enjoy';

let changeDefaultVal = function(){
    defaultVal = window.location.pathname;
}

function wrapState(ComposedComponent) {
    return class SelectableList extends Component {
        componentWillMount() {
            this.setState({
                selectedIndex: this.props.defaultValue,
            });
        }

        handleRequestChange(event, index){
            this.setState({
                selectedIndex: index,
            });
        };

        render() {
            return (
                <ComposedComponent
                    value={this.state.selectedIndex}
                    onChange={this.handleRequestChange.bind(this)}
                >
                    {this.props.children}
                </ComposedComponent>
            );
        }
    };
}

SelectableList = wrapState(SelectableList);


export default class leftNavbar extends Component{
    constructor(props){
        super(props);
    }

    componentDidMount(){
        let type = '';
        if(defaultVal.indexOf('enjoy') > 0){
            type = 'enjoy';
        }else if(defaultVal.indexOf('eat') > 0) {
            type = 'eat';
        }else{
            type = 'stroll';
        }
        this.setType(type)
    }

    setType(type){
        store.dispatch({
            type: TYPE.SEARCH_TYPE,
            val: type
        });
    }

    render(){
        return (
            <div className='navbar-menu'>
                <SelectableList
                    defaultValue={ defaultVal }
                >
                    <ListItem
                        key={1}
                        value={'/admin/enjoy'}
                        className='listitem'
                        primaryText='好玩的'
                        leftIcon={<i className='iconfont icon-chifan2600'></i>}
                        style={{color: '#fff'}}
                        onClick={() => {
                            browserHistory.push('/admin/enjoy');
                            changeDefaultVal();
                            this.setType('enjoy');
                        }}
                    />
                    <ListItem
                        key={2}
                        value={'/admin/eat'}
                        className='listitem'
                        primaryText='好吃的'
                        leftIcon={<i className='iconfont icon-wanju'></i>}
                        style={{color: '#fff'}}
                        onClick={() => {
                            browserHistory.push('/admin/eat');
                            changeDefaultVal();
                            this.setType('eat');
                        }}
                    />
                    <ListItem
                        key={3}
                        value={'/admin/stroll'}
                        className='listitem'
                        primaryText='好逛的'
                        leftIcon={<i className='iconfont icon-iconset0316'></i>}
                        style={{color: '#fff'}}
                        onClick={() => {
                            browserHistory.push('/admin/stroll');
                            changeDefaultVal();
                            this.setType('stroll');
                        }}
                    />
                </SelectableList>
            </div>
        );
    }
}