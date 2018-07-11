import React, { Component } from 'react';

import * as events from '../../Events';

export default class EnjoyTable extends Component{
    constructor(props){
        super(props);
        this.state = {
            data: [
                {
                    id: '10001',
                    name: '南锣鼓巷',
                    location: '',
                    images: [
                        'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2399133576,3381471432&fm=27&gp=0.jpg',
                        'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2399133576,3381471432&fm=27&gp=0.jpg',
                        'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2399133576,3381471432&fm=27&gp=0.jpg',
                    ],
                },
                {
                    id: '10002',
                    name: '南锣鼓巷',
                    location: '',
                    images: [
                        'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2399133576,3381471432&fm=27&gp=0.jpg',
                        'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2399133576,3381471432&fm=27&gp=0.jpg',
                        'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2399133576,3381471432&fm=27&gp=0.jpg',
                    ],
                },
                {
                    id: '10003',
                    name: '南锣鼓巷',
                    location: '',
                    images: [
                        'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2399133576,3381471432&fm=27&gp=0.jpg',
                        'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2399133576,3381471432&fm=27&gp=0.jpg',
                        'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2399133576,3381471432&fm=27&gp=0.jpg',
                    ],
                },
                {
                    id: '10004',
                    name: '南锣鼓巷',
                    location: '',
                    images: [
                        'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2399133576,3381471432&fm=27&gp=0.jpg',
                        'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2399133576,3381471432&fm=27&gp=0.jpg',
                        'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2399133576,3381471432&fm=27&gp=0.jpg',
                    ],
                },
            ],
        };
    }

    componentDidMount(){
        //获取enjoy数据
        this.getData();
    }

    //获取enjoy数据
    getData(){
        console.log('获取数据列表');
        $.ajax({
            url: 'http://yaming.me/inter/resume_info?name=ren',
            type: 'get',
            dataType: 'json',
            success: function (data) {
                console.log(data);
            }
        });
    }

    //查看产品详情
    seeDetial(id){
        //设置产品id，获取其详细数据
        this.selectProduct(id);
        events.customEvents.emit(events.OPEN_ENJOY_DIALOG);
    }

    //获取产品详细数据
    selectProduct(id){
        console.log('id is: ' + id);
    }

    render(){
        return (
            <div className='table-body enjoy-table clearfix'>
                {
                    this.state.data.map((d,k) => {
                        return (
                            <div className="table-item" key={ d.name + '_' + k }>
                                <div className="img">
                                    <img src={ d.images[0] } alt=""/>
                                </div>
                                <div className="introduce">
                                    <span>{ d.name }</span>
                                    <i className="iconfont icon-more" onClick={ this.seeDetial.bind(this, d.id) }></i>
                                </div>
                            </div>
                        );
                    })
                }
            </div>
        );
    }
}