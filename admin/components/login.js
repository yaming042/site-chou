import React, { Component } from 'react';

import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

import Input from './piece/input';

import styles from '../style';

import store from '../store';

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
                if( value.length > 8 ){
                    this.setState({
                        style: 'input-error'
                    });
                    errors.pwdError = '用户名错误(应为8个字符)';
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
    }

    componentDidMount(){

    }

    submit(){
        $('.my-input').each((i) => {
            $($('.my-input')[i]).focus().blur();
        });
        setTimeout(() => {
            let data = store.getState().login;
            console.log( data );

            $.ajax({
                url: '/api/login',
                type: 'GET',
                dataType: 'json',
                success: function(data){
                    console.log(data);
                    if(data.status == 200 && data.msg == 'success'){
                        window.location.href = '/admin';
                    }
                },
                error: function(xhr,status,error){
                    console.log('status is: ' + status);
                    console.log( 'error : ' + error );
                }
            });

        }, 300)
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
                            placeholder="请输入您的密码"
                            name="password"
                            validateFunc={ validatePwd }
                            pushState={ this.props.setUserPassword }
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
            </div>
        );
    }
}