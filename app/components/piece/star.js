import React, { Component } from 'react';

export default class StarNum extends Component{
    render(){
        let num = this.props.number || 5;
        let className = this.props.className || 'star-num';
        return (
            <div className={ className } style={{width: `${ num*16 }px`, overflow: 'hidden'}}>
                <span className='iconfont icon-star'></span>
                <span className='iconfont icon-star'></span>
                <span className='iconfont icon-star'></span>
                <span className='iconfont icon-star'></span>
                <span className='iconfont icon-star'></span>
            </div>
        );
    }
}