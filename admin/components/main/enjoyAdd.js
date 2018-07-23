import React, { Component } from 'react';

import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';

import UploadBox from '../piece/upload_v1';
import UploadBox_v2 from '../piece/upload_v2';

import styles from '../../style';
import * as events from "../../Events";

export default class Add extends Component{
    constructor(props){
        super(props);
        this.state = {
            open: false,

            errorName: '',
            errorLocal: '',
            errorIntro: '',
        };
    }

    //关闭弹窗
    dialogClose(){
        this.setState({
            open: false,
        });
    }
    //打开弹窗
    dialogOpen(){
        this.setState({
            open: true,
        });
    }

    //提交
    confirmClose(){
        events.customEvents.emit(events.UPLOAD_IMAGE);


        $("#name").focus().blur();
        $("#location").focus().blur();
        $("#introduce").focus().blur();

        setTimeout(() => {
            if(this.state.errorName || this.state.errorLocal || this.state.errorIntro){
                return;
            }

            let name = $("#name").val();
            let local = $("#location").val();
            let intro = $("#introduce").val();
            console.log("验证完成，准备提交");
        })

    }
    //验证input是否合法
    validate(e){
        let id = e.target.id;
        let val = e.target.value;
        let info = '';

        switch(id){
            case 'name':
                if(val != ''){
                    info = '';
                }else{
                    info = '名称字段为必填字段，请填写';
                }
                this.setState({
                    errorName: info,
                });

                break;
            case 'location':
                if(val != ''){
                    info = '';
                }else{
                    info = '地址字段为必填字段，请填写';
                }
                this.setState({
                    errorLocal: info,
                });

                break;
            case 'introduce':

                if(val != ''){
                    info = '';
                }else{
                    info = '简介字段为必填字段，请填写';
                }
                if(val.length > 10){
                    info = '简介字段过长，请修改';
                }
                this.setState({
                    errorIntro: info,
                });

                break;
            default:
                break;
        }
    }


    render(){
        return (
            <div>
                <FlatButton
                    label='新增 玩 条目'
                    onClick={ this.dialogOpen.bind(this)}
                    style={ styles.addbtn }
                    labelStyle={ styles.addLabel }
                />
                <Dialog
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.dialogClose.bind(this)}
                    contentClassName='dialog-container'
                    bodyStyle={ styles.dialog.bodyStyle }
                    contentStyle={ styles.dialog.contentStyle }
                    autoDetectWindowHeight={false}
                >
                    <div className="dialog-main">
                        <div className="dialog-header">
                            <div className="title">
                                <i className='iconfont icon-xinjianxiangmu'></i>
                                新建项目
                            </div>
                            <div className="option">
                                <i className='iconfont icon-guanbi' onClick={ this.dialogClose.bind(this) }></i>
                            </div>
                        </div>

                        <div className="dialog-body clearfix">
                            <div className="left">
                                <div className="input-row">
                                    <p>名称*</p>
                                    <TextField
                                        id='name'
                                        className='input-field'
                                        hintText="请填写项目名称"
                                        fullWidth={true}
                                        errorText={ this.state.errorName }
                                        style={ styles.formInput.style }
                                        hintStyle={ styles.formInput.hintStyle }
                                        underlineStyle={ styles.formInput.underlineStyle }
                                        underlineFocusStyle={ styles.formInput.underlineFocusStyle }
                                        inputStyle={ styles.formInput.inputStyle }
                                        errorStyle={ styles.formInput.errorStyle }
                                        onBlur={ this.validate.bind(this) }
                                    />
                                </div>
                                <div className="input-row">
                                    <p>地址*</p>
                                    <TextField
                                        id='location'
                                        className='input-field'
                                        hintText="请填写项目地址"
                                        fullWidth={true}
                                        errorText={ this.state.errorLocal }
                                        style={ styles.formInput.style }
                                        hintStyle={ styles.formInput.hintStyle }
                                        underlineStyle={ styles.formInput.underlineStyle }
                                        underlineFocusStyle={ styles.formInput.underlineFocusStyle }
                                        inputStyle={ styles.formInput.inputStyle }
                                        errorStyle={ styles.formInput.errorStyle }
                                        onBlur={ this.validate.bind(this) }
                                    />
                                </div>
                                <div className="input-row">
                                    <p>简介*</p>
                                    <TextField
                                        id='introduce'
                                        className='input-field'
                                        hintText="请填写项目简介"
                                        fullWidth={true}
                                        multiLine={true}
                                        rowsMax={8}
                                        textareaStyle={ styles.formInput.textareaStyle }
                                        errorText={ this.state.errorIntro }
                                        hintStyle={ styles.formInput.hintStyleTextarea }
                                        underlineStyle={ styles.formInput.underlineStyle }
                                        underlineFocusStyle={ styles.formInput.underlineFocusStyle }
                                        errorStyle={ styles.formInput.errorStyle }
                                        onBlur={ this.validate.bind(this) }
                                    />
                                </div>
                            </div>
                            <div className="right">
                                <UploadBox />
                            </div>
                        </div>

                        <div className="dialog-footer">
                            <FlatButton label="取消" style={ styles.formInput.caneclBtn } onClick={ this.dialogClose.bind(this) }/>
                            <FlatButton label="完成" style={ styles.formInput.confirmBtn } onClick={ this.confirmClose.bind(this) } />
                        </div>
                    </div>
                </Dialog>
            </div>
        );
    }
}