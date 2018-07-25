import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import Snackbar from 'material-ui/Snackbar';
import IconButton from 'material-ui/IconButton';

import Input from '../../../admin/components/piece/input';

import Search from '../piece/search';
import styles from "../../style";
import * as Func from "../../../controller/functions";
import * as TYPE from '../../const';
import store from "../../store";



let errors = {};

let validateName = [
    {
        event: 'blur',
        func: function(){
            let value = this.state.value;

            if( !value ){
                this.setState({
                    style: 'input-error'
                });

                errors.nameError = '请输入您的用户名';
            }else{
                if( value.length > 50 ){
                    this.setState({
                        style: 'input-error'
                    });
                    errors.nameError = '用户名错误(应小于50个字符)';
                }else{
                    this.setState({
                        style: 'input-normal'
                    });
                    delete errors.nameError;
                }
            }
        }
    }
];
let validatePwd = [
    {
        event: 'blur',
        func: function(){
            let value = this.state.value;

            if( !value ){
                this.setState({
                    style: 'input-error'
                });

                errors.pwdError = '请输入您的密码';
            }else{
                if( value.length > 12 ){
                    this.setState({
                        style: 'input-error'
                    });
                    errors.pwdError = '密码错误(应为12个字符)';
                }else{
                    this.setState({
                        style: 'input-normal'
                    });
                    delete errors.pwdError;
                }
            }
        }
    }
];
let validateMobile = [
    {
        event: 'blur',
        func: function(){
            let reg = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/
            let value = this.state.value;

            if( value && !reg.test(value) ){
                this.setState({
                    style: 'input-error'
                });

                errors.mobileError = '请输入正确的11位手机号码';
            }else{
                this.setState({
                    style: 'input-normal'
                });
                delete errors.mobileError;
            }
        }
    }
];
let validateVerification = [
    {
        event: 'blur',
        func: function(){
            let value = this.state.value;

            if( !value ){
                this.setState({
                    style: 'input-error'
                });

                errors.verificationError = '请输入右侧字符串';
            }else{
                let _this = this;

                if(value.length != 4){
                    this.setState({
                        style: 'input-error'
                    });

                    errors.verificationError = '请输入4位字符串';
                }else{
                    $.ajax({
                        url: '/api/identifyCode',
                        type: 'POST',
                        dataType: 'json',
                        data: { code: value },
                        success: (data) => {
                            let msg = data.msg;
                            if(data.status == 200){
                                _this.setState({
                                    style: 'input-normal'
                                });
                                delete errors.verificationError;
                            }else{
                                _this.setState({
                                    style: 'input-error'
                                });
                                errors.verificationError = msg;
                            }
                        },
                        error: () => {
                            console.log('error');
                            errors.verificationError = '服务器错误，请稍后重试';
                        }
                    });
                }
            }
        }
    }
];
let validateEmail = [
    {
        event: 'blur',
        func: function(){
            let reg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
            let value = this.state.value;

            if( value && !reg.test(value) ){
                this.setState({
                    style: 'input-error'
                });

                errors.emailError = '请输入正确的邮箱地址';
            }else{
                this.setState({
                    style: 'input-normal'
                });
                delete errors.emailError;
            }
        }
    }
];

export default class Header extends Component{
    constructor(props){
        super(props);
        this.state = {
            regOpen: false,
            loginOpen: false,

            userMenu: false,

            snackbarOpen: false,
            snackbarMsg: '',
        };
    }

    componentDidMount(){
        Func.createScript('/js/md5.js', () => {
            console.log('md5 already');
        });

        this.getUserInfo();
    }

    dialogRegClose(){
        this.setState({
            regOpen: false,
        });
        errors = {};
    }
    dialogRegOpen(){
        this.setState({
            regOpen: true,
        });

        this.getVerification();

    }

    dialogLoginClose(){
        this.setState({
            loginOpen: false,
        });
        errors = {};
    }
    dialogLoginOpen(){
        this.setState({
            loginOpen: true,
        });
    }

    //snackbar打开
    snackbarOpen(msg){
        this.setState({
            snackbarOpen: true,
            snackbarMsg: msg,
        });
    }
    //snackbar关闭
    snackbarClose(){
        this.setState({
            snackbarOpen: false,
            snackbarMsg: '',
        });
    }

    //登录用户小弹框
    alertUserToggle(event){
        event.stopPropagation();
        let _this = this;

        function e(event) {
            event.stopPropagation();
            let target = ReactDOM.findDOMNode(_this.refs.userMenuBox);

            console.log(!$(target).is(event.target));
            console.log($(target).has(event.target).length);

            if (!$(target).is(event.target) && $(target).has(event.target).length === 0) {
                _this.setState({
                    userMenu: false
                });
                document.removeEventListener('click', e);
            }
        }

        if(this.state.userMenu === false) {
            this.setState({
                userMenu: true
            });
            document.addEventListener('click', e);
        }else{
            this.setState({
                userMenu: false
            });
            document.removeEventListener('click', e);
        }
    }

    //表单提交
    Reg(){
        let _this = this;
        $('.my-input').each((i) => {
            $($('.my-input')[i]).focus().blur();
        });

        if(!Object.keys(errors).length){
            setTimeout(() => {
                let data = store.getState().login;

                console.log(data);

            }, 300)
        }
    }
    Login(){
        let _this = this;
        $('.my-input').each((i) => {
            $($('.my-input')[i]).focus().blur();
        });

        if(!Object.keys(errors).length){
            setTimeout(() => {
                let data = store.getState().login;

                $.ajax({
                    url: '/api/login',
                    type: 'POST',
                    dataType: 'json',
                    data: {name: data.userName, password: md5(data.userPassword)},
                    success: function(data){
                        if(data.code == 200 && data.msg == 'success'){
                            _this.dialogLoginClose();

                            store.dispatch({
                                type: TYPE.SET_LOGIN_USER,
                                val: data.body.name
                            });
                        }else{
                            _this.snackbarOpen(data.msg);
                        }
                    },
                    error: function(xhr,status,error){
                        console.log('status is: ' + status);
                        console.log( 'error : ' + error );
                    }
                });

            }, 300)
        }
    }

    //获取验证码
    getVerification(){
        $.ajax({
            url: '/api/getVerification',
            type: 'GET',
            dataType: 'text',
            success: (d) => {
                $("#verification").text(d);
            },
            error: () => {
                console.log('error');
            }
        });
    }

    getUserInfo(){
        let cookie = document.cookie;
        if(cookie){
            $.ajax({
                url: '/api/getUserName',
                type: 'POST',
                dataType: 'json',
                data: {data: cookie},
                success: (data) => {
                    if(data.code == 200){
                        store.dispatch({
                            type: TYPE.SET_LOGIN_USER,
                            val: data.body.name
                        });
                    }else{
                        console.log(data.code + ' ;msg: ' + data.msg);
                    }
                },
                error: () => {
                    console.log('获取用户信息失败！');
                }
            });
        }
    }

    //退出登录
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
        let loginUser = store.getState().login.loginUser;

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
                        {
                            loginUser ?
                                <div className="loginuser" ref='userMenuBox'>
                                    <span
                                        className='iconfont icon-yidenglu'
                                        onClick={
                                            (e) => {
                                                this.alertUserToggle(e);
                                            }
                                        }
                                    >
                                    </span>

                                    {
                                        this.state.userMenu ?
                                            <div className="userinfo">
                                                <div className="welcomuser">欢迎您，{ loginUser }</div>
                                                <div className="toadmin" onClick={() => {window.location.href = '/admin';}}>登录到后台</div>
                                                <div className="logout" onClick={ this.logOut.bind(this) }>退出登录</div>
                                            </div>
                                            :
                                            null
                                    }
                                </div>
                                :
                                <div className='option-btn'>
                                    <div className="reg" onClick={ this.dialogRegOpen.bind(this) }>
                                        <span className='iconfont icon-reg'></span>
                                        <span>注册</span>
                                    </div>
                                    /
                                    <div className="login" onClick={ this.dialogLoginOpen.bind(this) }>
                                        <span className='iconfont icon-login'></span>
                                        <span>登录</span>
                                    </div>
                                </div>
                            }
					</div>
				</div>

                <Dialog
                    modal={true}
                    open={this.state.regOpen}
                    onRequestClose={this.dialogRegClose.bind(this)}
                    contentClassName='dialog-container-reg'
                    contentStyle={ styles.dialogContent }
                >
                    <div className="login">
                        <i className='iconfont icon-guanbi' onClick={ this.dialogRegClose.bind(this) }></i>
                        <h3>欢迎注册</h3>
                        <div className="input-row clearfix">
                            <p>用户名<i>*</i></p>
                            <Input
                                ref='username'
                                placeholder="请输入您的用户名"
                                name="name"
                                validateFunc={ validateName }
                                pushState={ this.props.setUserName }
                                md5={true}
                            />
                            {
                                errors.nameError ?
                                    <div className='error-info'>
                                        <p>{ errors.nameError }</p>
                                    </div>
                                    :
                                    null
                            }
                        </div>
                        <div className="input-row clearfix">
                            <p>密码<i>*</i></p>
                            <Input
                                ref='userpwd'
                                type='password'
                                placeholder="请输入您的密码"
                                name="password"
                                validateFunc={ validatePwd }
                                pushState={ this.props.setUserPassword }
                                md5={true}
                            />
                            {
                                errors.pwdError ?
                                    <div className='error-info'>
                                        <p>{ errors.pwdError }</p>
                                    </div>
                                    :
                                    null
                            }
                        </div>
                        <div className="input-row clearfix">
                            <p>手机号码</p>
                            <Input
                                ref='mobile'
                                placeholder="请输入您的手机号码"
                                name="mobile"
                                validateFunc={ validateMobile }
                                pushState={ this.props.setUserMobile }
                                md5={true}
                            />
                            {
                                errors.mobileError ?
                                    <div className='error-info'>
                                        <p>{ errors.mobileError }</p>
                                    </div>
                                    :
                                    null
                            }
                        </div>
                        <div className="input-row clearfix">
                            <p>验证码<i>*</i></p>
                            <Input
                                ref='identifycode'
                                placeholder="请输入右侧字符串"
                                name="identifycode"
                                validateFunc={ validateVerification }
                                pushState={ this.props.setUserVerification }
                            />
                            <span
                                className="verification"
                                id='verification'
                                // onClick={ this.getVerification.bind(this) }
                            ></span>
                            {
                                errors.verificationError ?
                                    <div className='error-info'>
                                        <p>{ errors.verificationError }</p>
                                    </div>
                                    :
                                    null
                            }
                        </div>
                        <div className="input-row clearfix">
                            <p>邮箱</p>
                            <Input
                                ref='email'
                                placeholder="请输入您的邮箱地址"
                                name="email"
                                validateFunc={ validateEmail }
                                pushState={ this.props.setUserEmail }
                                md5={true}
                            />
                            {
                                errors.emailError ?
                                    <div className='error-info'>
                                        <p>{ errors.emailError }</p>
                                    </div>
                                    :
                                    null
                            }
                        </div>

                        <div className="input-row">
                            <FlatButton
                                label="注册"
                                fullWidth={true}
                                backgroundColor='rgba(153,153,153,0.3)'
                                hoverColor='#2577e3'
                                onClick={ this.Reg.bind(this) }
                            />
                        </div>
                    </div>
                </Dialog>

                <Dialog
                    modal={true}
                    open={this.state.loginOpen}
                    onRequestClose={this.dialogLoginClose.bind(this)}
                    contentClassName='dialog-container-reg'
                    contentStyle={ styles.dialogContent }
                >
                    <div className="login">
                        <i className='iconfont icon-guanbi' onClick={ this.dialogLoginClose.bind(this) }></i>
                        <h3>欢迎登录</h3>
                        <div className="input-row clearfix">
                            <p>用户名<i>*</i></p>
                            <Input
                                ref='username'
                                placeholder="请输入您的用户名"
                                name="name"
                                validateFunc={ validateName }
                                pushState={ this.props.setUserName }
                                md5={true}
                            />
                            {
                                errors.nameError ?
                                    <div className='error-info'>
                                        <p>{ errors.nameError }</p>
                                    </div>
                                    :
                                    null
                            }
                        </div>
                        <div className="input-row clearfix">
                            <p>密码<i>*</i></p>
                            <Input
                                ref='userpwd'
                                type='password'
                                placeholder="请输入您的密码"
                                name="password"
                                validateFunc={ validatePwd }
                                pushState={ this.props.setUserPassword }
                                md5={true}
                            />
                            {
                                errors.pwdError ?
                                    <div className='error-info'>
                                        <p>{ errors.pwdError }</p>
                                    </div>
                                    :
                                    null
                            }
                        </div>
                        <div className="input-row">
                            <FlatButton
                                label="登录"
                                fullWidth={true}
                                backgroundColor='rgba(153,153,153,0.3)'
                                hoverColor='#008000'
                                onClick={ this.Login.bind(this) }
                            />
                        </div>
                    </div>
                </Dialog>

                <Snackbar
                    open={ this.state.snackbarOpen }
                    message={ this.state.snackbarMsg }
                    autoHideDuration={ 3000 }
                    onRequestClose={ this.snackbarClose.bind(this) }
                />
			</div>
		);
	}
}