import React, { Component } from 'react';

import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';

import * as events from '../../Events';
import styles from "../../style";

export default class EnjoyDialog extends Component{
    constructor(props){
        super(props);
        this.state = {
            open: false, //主弹框是否弹出
            openDelete: false, //确认删除弹框是否弹出
        };
    }

    componentDidMount(){
        //开启主弹框
        events.customEvents.on(events.OPEN_ENJOY_DIALOG, () => {
            this.setState({
                open: true,
            });
        });
    }

    //关闭主弹窗
    dialogClose(){
        this.setState({
            open: false,
        });
    }

    //开启确认删除弹框
    dialogDeleteOpen(){
        this.setState({
            openDelete: true,
        });
    }
    //关闭确认删除弹框
    dialogDeleteClose(){
        this.setState({
            openDelete: false,
        });
    }


    render(){

        return (
            <div>
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
                                南锣鼓巷
                            </div>
                            <div className="option own-delete">
                                <i className='iconfont icon-iconfontshanchu' onClick={ this.dialogDeleteOpen.bind(this) }></i>
                                <i className='iconfont icon-guanbi' onClick={ this.dialogClose.bind(this) }></i>
                            </div>
                        </div>

                        <div className="dialog-body clearfix">
                            <p>这是弹框内容</p>
                        </div>

                        <div className="dialog-footer">
                            <FlatButton label="取消" style={ styles.formInput.caneclBtn } onClick={ this.dialogClose.bind(this) }/>
                            <FlatButton label="完成" style={ styles.formInput.confirmBtn } onClick={ this.dialogClose.bind(this) } />
                        </div>
                    </div>
                </Dialog>

                {/*确认删除弹出框*/}
                <Dialog
                    modal={true}
                    open={this.state.openDelete}
                    contentClassName='confirm-dialog'
                    bodyStyle={ styles.dialog.bodyStyleDel }
                >
                    <p>您是否确认删除此项目？</p>
                    <div className="footer">
                        <FlatButton label="取消" style={ styles.formInput.caneclBtn } onClick={ this.dialogDeleteClose.bind(this) }/>
                        <FlatButton label="完成" style={ styles.formInput.confirmBtn } onClick={ this.dialogDeleteClose.bind(this) } />
                    </div>
                </Dialog>


            </div>
        );
    }
}