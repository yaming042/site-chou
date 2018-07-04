import React, { Component } from 'react';

import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";

export default class SubIndex extends Component{
    constructor(props){
        super(props);
        this.state = {
            id: '10002',
            data: {
                name: '南锣鼓巷',
                location: '北京市 东城区南锣鼓巷胡同',
                images: [
                    {original:'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1705562579,964568896&fm=27&gp=0.jpg',
                        thumbnail:'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1705562579,964568896&fm=27&gp=0.jpg'},
                    {original:'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1705562579,964568896&fm=27&gp=0.jpg',
                        thumbnail:'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1705562579,964568896&fm=27&gp=0.jpg'},
                    {original:'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1705562579,964568896&fm=27&gp=0.jpg',
                        thumbnail:'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1705562579,964568896&fm=27&gp=0.jpg'},
                ],

                recommendStar: 5,
                recommendCount: 1923,
                generalCount: 25,
                badCount: 12,
            },
            comments: [
                {
                    userId: 'u1001',
                    nickname: '小白兔',
                    recommendStar: '4',
                    comment: '我们晚上七八点去的 不用排队 人少 夜景很漂亮,我们晚上七八点去的 不用排队 人少 夜景很漂亮,我们晚上七八点去的 不用排队 人少 夜景很漂亮',
                    commentTime: '2018.08.09',
                },
                {
                    userId: 'u1002',
                    nickname: '米老鼠',
                    recommendStar: '5',
                    comment: '我们晚上七八点去的 不用排队 人少 夜景很漂亮,我们晚上七八点去的 不用排队 人少 夜景很漂亮,我们晚上七八点去的 不用排队 人少 夜景很漂亮',
                    commentTime: '2018.08.08',
                },
                {
                    userId: 'u1003',
                    nickname: '唐老鸭',
                    recommendStar: '4',
                    comment: '我们晚上七八点去的 不用排队 人少 夜景很漂亮,我们晚上七八点去的 不用排队 人少 夜景很漂亮,我们晚上七八点去的 不用排队 人少 夜景很漂亮',
                    commentTime: '2018.08.07',
                },
            ],
        };
    }

    componentDidMount(){

    }
    componentWillMount(){
        let id = this._getParam('id');
        let type = this._getParam('type');
        console.log(id,type);
    }

    _getParam(variable){
        let query = window.location.search.substring(1);
        let vars = query.split("&");
        for (let i=0;i<vars.length;i++) {
            let pair = vars[i].split("=");
            if(pair[0] == variable){
                return pair[1];
            }
        }
        return false;
    }

    render(){
        //需要是5星的评论，现在还不是
        let newComment = this.state.comments[0].comment;
        let newCommentTime = this.state.comments[0].commentTime;
        newComment = newComment.substr(0, 120) + '...';

        return (
            <div className='sub-index'>
                <div className="sub-index-body">
                    <div className="section-1 clearfix">
                        <div className="gallery">
                            <ImageGallery
                                items={ this.state.data.images }
                                showFullscreenButton={false}
                                showPlayButton={false}
                            />
                        </div>
                        <div className="infomation">
                            <h2>{ this.state.data.name }</h2>
                            <div className='item-line'>位置<span>{this.state.data.location }</span></div>
                            <div className='item-line'>推荐指数
                                <div style={{display: 'inline-block',width: `${this.state.data.recommendStar*16}px`, overflow: 'hidden'}}>
                                    <span className='iconfont icon-star'></span>
                                    <span className='iconfont icon-star'></span>
                                    <span className='iconfont icon-star'></span>
                                    <span className='iconfont icon-star'></span>
                                    <span className='iconfont icon-star'></span>
                                </div>
                            </div>
                            <div className="star-detail">
                                <p>推荐 <span>{ this.state.data.recommendCount }</span> 人</p>
                                <p>一般 <span>{ this.state.data.generalCount }</span> 人</p>
                                <p>不推荐 <span>{ this.state.data.badCount }</span> 人</p>
                            </div>
                            <div className="new">
                                <p>{ newComment }</p>
                                <span>{ newCommentTime }</span>
                            </div>
                        </div>
                    </div>

                    <div className="section-2">
                        <div className="title-area-2">
                            <span>用户体验</span>
                        </div>
                        <div className="user-said">
                            {
                                this.state.comments.map((d,k) => {
                                    return (
                                        <div className="user-said-item" key={d.id + '_' + k}>
                                            <div className='recommend clearfix'>
                                                <div className='recommend-left'>用户推荐指数</div>
                                                <div className="recommend-right" style={{width: `${d.recommendStar*16}px`, overflow: 'hidden'}}>
                                                    <span className='iconfont icon-star'></span>
                                                    <span className='iconfont icon-star'></span>
                                                    <span className='iconfont icon-star'></span>
                                                    <span className='iconfont icon-star'></span>
                                                    <span className='iconfont icon-star'></span>
                                                </div>
                                            </div>
                                            <div className="recommend-detail">
                                                <p>{ d.comment }</p>
                                                <div className="detail-info clearfix">
                                                    <span>{ d.nickname }</span>
                                                    <span>{ d.commentTime }</span>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}