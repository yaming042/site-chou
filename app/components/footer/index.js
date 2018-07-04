import React, { Component } from 'react';

export default class Footer extends Component{

	render(){
		return (
			<div className='footer'>
				<div className="footer-body clearfix">
					<div className="left">
						<p>千图网是专注免费设计素材下载的网站,提供footer,footer图片,footer素材, footer模板等免费下载服务!</p>
					</div>
					<div className="center">
						<ul>
							<p>相关声明</p>
							<li>注册声明</li>
							<li>用户隐私声明</li>
						</ul>
					</div>
					<div className="right">
                        <img
                            src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2476303028,2407315252&fm=27&gp=0.jpg"
                            alt=""/>
					</div>
				</div>
			</div>
		);
	}
}