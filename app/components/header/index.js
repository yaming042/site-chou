import React, { Component } from 'react';

import Search from '../piece/search';

export default class Header extends Component{

	render(){
		return (
			<div className='header'>
				<div className="header-top clearfix">
					<div className="left clearfix">
						<div className="logo">
							<div onClick={() => {window.location.href = '/'}}>
								<img src="https://i1.develenv.com/images/logo_v1.png" alt=""/>
							</div>
                        </div>

						<div className="search">
                        	<Search/>
                        </div>
					</div>
					<div className="right">
						<div className="reg">
							<span className='iconfont icon-reg'></span>
                            <a href="#">注册</a>
						</div>
						/
						<div className="login">
                            <span className='iconfont icon-login'></span>
                            <a href="#">登录</a>
						</div>
					</div>
				</div>
			</div>
		);
	}
}