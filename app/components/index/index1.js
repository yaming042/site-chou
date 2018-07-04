import React, { Component } from 'react';
import { browserHistory } from 'react-router';

import BannerBox from '../piece/bannerBox';
import Search from '../piece/search';
import StarNum from '../piece/star';

export default class Index1 extends Component{
    constructor(props){
        super(props);
        this.state = {
            slideData: [
                {original:'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2156679303,538323769&fm=200&gp=0.jpg', href: '/guang'},
                {original:'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2156679303,538323769&fm=200&gp=0.jpg', href: '/chi'},
                {original:'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2156679303,538323769&fm=200&gp=0.jpg', href: '/mai'},
                {original:'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2156679303,538323769&fm=200&gp=0.jpg', href: '/wan'},
            ],

            location: '北京',
            data1: {
                type: '好吃的',
                data: [
                    {
                        id: '10001',
                        name: '南锣鼓巷',
                        location: '北京市 东城区南锣鼓巷胡同',
                        images: [
                            'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3362555556,4197443750&fm=27&gp=0.jpg',
                            'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3362555556,4197443750&fm=27&gp=0.jpg',
                            'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3362555556,4197443750&fm=27&gp=0.jpg',
                            ],

                        recommendStar: 5,
                        recommendCount: 1923,
                        generalCount: 25,
                        badCount: 12,
                    },
                    {
                        id: '10002',
                        name: '南锣鼓巷',
                        location: '北京市 东城区南锣鼓巷胡同',
                        images: [
                            'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3362555556,4197443750&fm=27&gp=0.jpg',
                            'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3362555556,4197443750&fm=27&gp=0.jpg',
                            'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3362555556,4197443750&fm=27&gp=0.jpg',
                        ],

                        recommendStar: 4,
                        recommendCount: 1023,
                        generalCount: 20,
                        badCount: 22,
                    },
                ],
            },
            data2: {
                type: '好玩的',
                data: [
                    {
                        id: '10003',
                        name: '南锣鼓巷',
                        location: '北京市 东城区南锣鼓巷胡同',
                        images: [
                            'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2156679303,538323769&fm=200&gp=0.jpg',
                            'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2156679303,538323769&fm=200&gp=0.jpg',
                            'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2156679303,538323769&fm=200&gp=0.jpg',
                            ],

                        recommendStar: 4,
                        recommendCount: 1023,
                        generalCount: 20,
                        badCount: 22,
                    },
                    {
                        id: '10004',
                        name: '南锣鼓巷',
                        location: '北京市 东城区南锣鼓巷胡同',
                        images: [
                            'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2156679303,538323769&fm=200&gp=0.jpg',
                            'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2156679303,538323769&fm=200&gp=0.jpg',
                            'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2156679303,538323769&fm=200&gp=0.jpg',
                        ],

                        recommendStar: 4,
                        recommendCount: 1023,
                        generalCount: 20,
                        badCount: 22,
                    },
                    {
                        id: '10005',
                        name: '南锣鼓巷',
                        location: '北京市 东城区南锣鼓巷胡同',
                        images: [
                            'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2156679303,538323769&fm=200&gp=0.jpg',
                            'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2156679303,538323769&fm=200&gp=0.jpg',
                            'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2156679303,538323769&fm=200&gp=0.jpg',
                        ],

                        recommendStar: 4,
                        recommendCount: 1023,
                        generalCount: 20,
                        badCount: 22,
                    },
                    {
                        id: '10006',
                        name: '南锣鼓巷',
                        location: '北京市 东城区南锣鼓巷胡同',
                        images: [
                            'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2156679303,538323769&fm=200&gp=0.jpg',
                            'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2156679303,538323769&fm=200&gp=0.jpg',
                            'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2156679303,538323769&fm=200&gp=0.jpg',
                        ],

                        recommendStar: 4,
                        recommendCount: 1023,
                        generalCount: 20,
                        badCount: 22,
                    },
                    {
                        id: '10007',
                        name: '南锣鼓巷',
                        location: '北京市 东城区南锣鼓巷胡同',
                        images: [
                            'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2156679303,538323769&fm=200&gp=0.jpg',
                            'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2156679303,538323769&fm=200&gp=0.jpg',
                            'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2156679303,538323769&fm=200&gp=0.jpg',
                        ],

                        recommendStar: 4,
                        recommendCount: 1023,
                        generalCount: 20,
                        badCount: 22,
                    },
                ],
                commont: {
                    userId: 'u1001',
                    nickname: '小白兔',
                    recommendStar: '4',
                    comment: '我们晚上七八点去的 不用排队 人少 夜景很漂亮,我们晚上七八点去的 不用排队 人少 夜景很漂亮,我们晚上七八点去的 不用排队 人少 夜景很漂亮',
                    commentTime: '2018.08.09',
                }
            },
            data3: {
                type: '好逛的',
                data: [
                    {
                        id: '10003',
                        name: '南锣鼓巷',
                        location: '北京市 东城区南锣鼓巷胡同',
                        images: [
                            'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2156679303,538323769&fm=200&gp=0.jpg',
                            'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2156679303,538323769&fm=200&gp=0.jpg',
                            'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2156679303,538323769&fm=200&gp=0.jpg',
                            ],

                        recommendStar: 4,
                        recommendCount: 1023,
                        generalCount: 20,
                        badCount: 22,
                    },
                    {
                        id: '10004',
                        name: '南锣鼓巷',
                        location: '北京市 东城区南锣鼓巷胡同',
                        images: [
                            'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2156679303,538323769&fm=200&gp=0.jpg',
                            'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2156679303,538323769&fm=200&gp=0.jpg',
                            'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2156679303,538323769&fm=200&gp=0.jpg',
                        ],

                        recommendStar: 5,
                        recommendCount: 1023,
                        generalCount: 20,
                        badCount: 22,
                    },
                    {
                        id: '10005',
                        type: '逛',
                        name: '南锣鼓巷',
                        location: '北京市 东城区南锣鼓巷胡同',
                        images: [
                            'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2156679303,538323769&fm=200&gp=0.jpg',
                            'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2156679303,538323769&fm=200&gp=0.jpg',
                            'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2156679303,538323769&fm=200&gp=0.jpg',
                        ],

                        recommendStar: 3,
                        recommendCount: 1023,
                        generalCount: 20,
                        badCount: 22,
                    },
                    {
                        id: '10006',
                        name: '南锣鼓巷',
                        location: '北京市 东城区南锣鼓巷胡同',
                        images: [
                            'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2156679303,538323769&fm=200&gp=0.jpg',
                            'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2156679303,538323769&fm=200&gp=0.jpg',
                            'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2156679303,538323769&fm=200&gp=0.jpg',
                        ],

                        recommendStar: 3,
                        recommendCount: 1023,
                        generalCount: 20,
                        badCount: 22,
                    },
                    {
                        id: '10007',
                        name: '南锣鼓巷',
                        location: '北京市 东城区南锣鼓巷胡同',
                        images: [
                            'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2156679303,538323769&fm=200&gp=0.jpg',
                            'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2156679303,538323769&fm=200&gp=0.jpg',
                            'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2156679303,538323769&fm=200&gp=0.jpg',
                        ],

                        recommendStar: 3,
                        recommendCount: 1023,
                        generalCount: 20,
                        badCount: 22,
                    },
                ],
            },
            recommended: [],

        };
    }

    componentDidMount(){

    }

    recommend(id){
        let recommded = this.state.recommended.slice(0);

        if(this.state.recommended.indexOf(id) < 0){
            recommded.push(id);
            this.setState({
                recommended: recommded.concat(),
            });
        }
    }

    seeRecommend(id){
        let obj = this.state.data1.data.filter((d) => {
            return d.id == id;
        });

        let url = '/detail?id='+ obj[0].id + '&type=' + this.state.type +'&name=' + obj[0].name;
        window.open(url,'_blank');
    }

	render(){
        let data2_1 = this.state.data2.data[0];
        let data2_2 = this.state.data2.data.slice(1);
        let pickComment = this.state.data2.commont.comment.substr(0, 45) + '...';

		return (
			<div className='main-index-1'>
				<div className="banner-area">
                    <BannerBox
                        images={ this.state.slideData }
                    />
				</div>

				<div className="index-1-content">
					<div className="cont-body">
                        {/*分类1*/}
                        <div className="cont-title">
                            <div className="title-area">
                                <span>{ this.state.data1.type }</span>
                            </div>
                            <div className="title-more" onClick={() => { browserHistory.push('/type1'); }}>
                                <span>查看更多</span>
                            </div>
                        </div>
						<div className="body-list assort-1 clearfix">
                            {
                                this.state.data1.data.map((d,k) => {
                                    return (
                                        <div className="body-list-item" key={ d.id + '_' + k } data-id={d.id}>
                                            <div className="thumbnail">
                                                <img src={ d.images[0] } alt={ d.name } />

                                                <div className="star">
                                                    <p>推荐指数</p>
                                                    <StarNum
                                                        number={d.recommendStar}
                                                    />
                                                    <div className="star-detail">
                                                        <p>推荐：<span>{d.recommendCount}</span> 人</p>
                                                        <p>一般：<span>{d.generalCount}</span> 人</p>
                                                        <p>不推荐：<span>{d.badCount}</span> 人</p>
                                                    </div>
                                                </div>
                                                <div className="item-info">
                                                    <span
                                                        className={'agree-star iconfont icon-zan ' + (this.state.recommended.indexOf(d.id) < 0 ? '' : 'agreed') }
                                                        onClick={this.recommend.bind(this,d.id)}>
                                                    </span>
                                                    <span className='seemore-star'>
                                                        <i className='iconfont icon-more' onClick={this.seeRecommend.bind(this,d.id)}></i>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })
                            }
						</div>

                        {/*分类2*/}
                        <div className="cont-title">
                            <div className="title-area">
                                <span>{this.state.data2.type}</span>
                            </div>
                            <div className="title-more" onClick={() => { browserHistory.push('/type2'); }}>
                                <span>查看更多</span>
                            </div>
                        </div>
                        <div className="body-list assort-2 clearfix">
                            <div className='left'>
                                <div className="img-box">
                                    <img src={ data2_1.images[0] } alt=""/>
                                    <div className="img-introduce">
                                        <h3>{ data2_1.name }</h3>
                                        <div className="star clearfix">
                                            <p>推荐指数</p>
                                            <StarNum
                                                number={ data2_1.recommendStar }
                                            />
                                        </div>
                                        <div className="comment">
                                            <p>{ pickComment }</p>
                                            <span>{ this.state.data2.commont.nickname } - { this.state.data2.commont.commentTime }</span>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div className="right">
                                <div className="right-list">
                                    {
                                        data2_2.map((d,k) => {
                                            return (
                                                <div className="list-item" key={d.name + '_' + k}>
                                                    <img src={ d.images[0] } alt=""/>
                                                    <div className="item-detial">
                                                        <p>{ d.name }</p>
                                                        <StarNum
                                                            number={ d.recommendStar }
                                                        />
                                                    </div>
                                                </div>
                                            );
                                        })
                                    }
                                </div>
                            </div>
                        </div>

                        {/*分类3*/}
                        <div className="cont-title">
                            <div className="title-area">
                                <span>{this.state.data3.type}</span>
                            </div>
                            <div className="title-more" onClick={() => { browserHistory.push('/type3'); }}>
                                <span>查看更多</span>
                            </div>
                        </div>
                        <div className="body-list assort-3 clearfix">
                            <div className="sort3-list clearfix">
                                {
                                    this.state.data3.data.map((d,k) => {
                                        return (
                                            <div className="list-item clearfix" key={ d.name + '_' + k}>
                                                <h3>{ d.name }</h3>
                                                <div className="left">
                                                    <img src={ d.images[0] } alt=""/>
                                                    <div className="recommend">
                                                        <p>推荐指数</p>
                                                        <StarNum number={ d.recommendStar }/>
                                                    </div>
                                                </div>
                                                <div className="right">
                                                    <div className="img-item">
                                                        <img src={ d.images[1] } alt=""/>
                                                    </div>
                                                    <div className="img-item">
                                                        <img src={ d.images[2] } alt=""/>
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
			</div>
		);
	}
}