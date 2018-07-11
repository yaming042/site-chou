import React, { Component } from 'react';

import { browserHistory } from 'react-router';

import {List, ListItem, makeSelectable} from 'material-ui/List';


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
                        }}
                    />
                </SelectableList>
            </div>
        );
    }
}