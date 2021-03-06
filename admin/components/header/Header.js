import React, { Component } from 'react';

import IconButton from 'material-ui/IconButton';

import Search from '../piece/search';

export default class Header extends Component{

    logOut(){
        $.ajax({
            url: '/api/logout',
            type: 'GET',
            dataType: 'json',
            success: (data) => {
                if(data.code == 200){
                    console.log('退出成功');
                }

                window.location.href = '/';
            },
            error: () => {
                console.log('请求失败！');
            }
        });
    }

    render(){
        return (
            <div className='header'>
                <div className="left">
                    <div className="logo">
                        <img src="https://i1.develenv.com/images/logo_v1.png" alt=""/>
                    </div>
                    <div className="search">
                        <Search />
                    </div>
                </div>
                <div className="right">
                    <div className="btn-zone">
                        <IconButton
                            iconClassName="iconfont icon-login"
                            tooltip="退出登录"
                            tooltipPosition="bottom-center"
                            style={{height: '60px'}}
                            onClick={ this.logOut.bind(this) }
                        />
                    </div>
                </div>
            </div>
        );
    }
}