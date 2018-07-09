import React, { Component } from 'react';

import Dialog from 'material-ui/Dialog';

import * as events from '../../Events';
import styles from "../../style";

export default class EnjoyDialog extends Component{
    constructor(props){
        super(props);
        this.state = {
            open: false,
        };
    }

    componentDidMount(){
        events.customEvents.on(events.OPEN_ENJOY_DIALOG, () => {
            this.setState({
                open: true,
            });
        });
    }

    //关闭弹窗
    dialogClose(){
        this.setState({
            open: false,
        });
    }


    render(){

        return (
            <div>
                <Dialog
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.dialogClose.bind(this)}
                    autoScrollBodyContent={true}
                    bodyStyle={ styles.dialog.bodyStyle }
                    contentStyle={ styles.dialog.contentStyle }
                >
                    <div className="dialog-conent">
                        <h3>南锣鼓巷</h3>
                        <p>这是弹框内容</p>
                    </div>
                </Dialog>
            </div>
        );
    }
}