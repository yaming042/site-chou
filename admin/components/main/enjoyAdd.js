import React, { Component } from 'react';

import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';

import styles from '../../style';
import * as events from "../../Events";

export default class Add extends Component{
    constructor(props){
        super(props);
        this.state = {
            open: false,
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
                    autoScrollBodyContent={true}
                    bodyStyle={ styles.dialog.bodyStyle }
                    contentStyle={ styles.dialog.contentStyle }
                >
                    <p>增加内容</p>
                </Dialog>
            </div>
        );
    }
}