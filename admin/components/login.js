import React, { Component } from 'react';

import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import Snackbar from 'material-ui/Snackbar';

import Input from './piece/input';

import styles from '../style';

import store from '../store';
import * as Func from "../../controller/functions";

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


let errors = {};

export default class Login extends Component{
    constructor(props){
        super(props);

        this.state = {
            snackbarOpen: false,
            snackbarMsg: '',
        };
    }

    componentDidMount(){
        Func.createScript('/js/md5.js', () => {
            console.log('md5 already');
        });
    }

    submit(){
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
                            window.location.href = '/admin';
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

    render(){

        return (
            <div className="login-main">
                <div className="header">
                    <img src="https://i1.develenv.com/images/logo_v1.png" alt=""/>
                </div>
                <div className="login">
                    <h3>欢迎登录</h3>
                    <div className="input-row">
                        <p>用户名</p>
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
                    <div className="input-row">
                        <p>密码</p>
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
                            style={ styles.inputStyle.submitBtn.style }
                            labelStyle={ styles.inputStyle.submitBtn.label }
                            onClick={ this.submit.bind(this) }
                        />
                    </div>
                </div>

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