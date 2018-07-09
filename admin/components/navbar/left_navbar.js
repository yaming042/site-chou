import React, { Component } from 'react';

import {List, ListItem, makeSelectable} from 'material-ui/List';


let SelectableList = makeSelectable(List);

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
    render(){
        return (
            <div className='navbar-menu'>
                <SelectableList
                    defaultValue={1}
                >
                    <ListItem
                        value={1}
                        className='listitem'
                        primaryText='好吃的'
                        leftIcon={<i className='iconfont icon-chifan2600'></i>}
                        style={{color: '#fff'}}
                    />
                    <ListItem
                        value={2}
                        className='listitem'
                        primaryText='好玩的'
                        leftIcon={<i className='iconfont icon-wanju'></i>}
                        style={{color: '#fff'}}
                    />
                    <ListItem
                        value={3}
                        className='listitem'
                        primaryText='好逛的'
                        leftIcon={<i className='iconfont icon-iconset0316'></i>}
                        style={{color: '#fff'}}
                    />
                </SelectableList>
            </div>
        );
    }
}