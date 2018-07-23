import React, { Component } from 'react';
import IconButton from 'material-ui/IconButton';
import Snackbar from 'material-ui/Snackbar';

import * as Events from '../../Events';
import * as Func from '../../../controller/functions';


let expire = 0,
    host,
    upload_params,
    dir;


export default class UploadBox extends Component{
    constructor(props){
        super(props);
        this.state = {
            files: [],

            snackbarOpen: false,
            snackbarMsg: '',
        };
    }

    componentDidMount(){
        if(!window.hasOwnProperty('plupload')){
            Func.createScript('/lib/plupload-2.1.2/js/plupload.full.min.js', () => {
                this.initUpload();
            });
        }else{
            this.initUpload();
        }
    }

    //======================
    initUpload() {
        let _this = this;
        function set_upload_param(up, filename) {
            if(filename != '') {
                upload_params['key'] = dir + '${filename}';
            }

            if(Object.keys(upload_params).length){
                up.setOption({
                    'url': host,
                    'multipart_params': upload_params
                });

                up.start();
            }
        }

        setTimeout(() => {
            let uploader = new plupload.Uploader({
                runtimes: 'html5,flash,silverlight,html4',
                browse_button: 'upload_btn',
                flash_swf_url: '/lib/plupload-2.1.2/js/Moxie.swf',
                silverlight_xap_url: '/lib/plupload-2.1.2/js/Moxie.xap',
                url: 'http://oss.aliyuncs.com',
                resize: {
                    quality: 100,
                },
                filters: {
                    mime_types: [ //只允许上传图片
                        {title: "Image files", extensions: "jpg,jpeg,gif,png,bmp"},
                    ],
                    max_file_size: '10mb', //最大只能上传10mb的文件
                    prevent_duplicates: true //不允许选取重复文件
                },

                init: {
                    PostInit: function () {
                        _this.get_signature();
                    },

                    FilesAdded: function (up, files) {
                        console.log('file add');
                        set_upload_param(uploader, '');
                    },

                    BeforeUpload: function (up, file) {
                        set_upload_param(up, file.name);
                        console.log('before upload');
                    },

                    UploadProgress: function (up, file) {
                        console.log('uploading');
                    },

                    FileUploaded: function (up, file, info) {
                        console.log('uploaded');
                    },

                    Error: function (up, err) {
                        console.log(err);
                    }
                }
            });
            uploader.init();
        }, 0);
    }
    //获取签名
    get_signature() {
        //可以判断当前expire是否超过了当前时间,如果超过了当前时间,就重新取一下60s 做为缓冲
        let now = Date.parse(new Date()) / 1000;

        if (expire < now + 3){
            $.ajax({
                type: 'GET',
                url: '/api/getSignature',
                dataType: 'json',
                success: (data) => {
                    host = data['host'];
                    expire = parseInt(data['expire']);
                    dir = data['dir'];

                    upload_params = {
                        'key' : '',
                        'policy': data['policy'],
                        'OSSAccessKeyId': data['accessid'],
                        'success_action_status' : '200', //让服务端返回200,不然，默认会返回204
                        'callback' : data['callback'],
                        'signature': data['signature'],
                    };
                },
                error: () => {
                    console.log('获取签名失败');
                }
            });
        }
    };


    //======================

    //缩略图预览
    previewImage(file, callback){
        if(!file || !/image\//.test(file.type)) return; //确保文件是图片
        if(file.type=='image/gif'){//gif使用FileReader进行预览,因为mOxie.Image只支持jpg和png
            let fr = new mOxie.FileReader();
            fr.onload = function(){
                callback(fr.result);
                fr.destroy();
                fr = null;
            }
            fr.readAsDataURL(file.getSource());
        }else{
            let preloader = new mOxie.Image();
            preloader.onload = function() {
                preloader.downsize( 300, 300 );//先压缩一下要预览的图片,宽300，高300
                var imgsrc = preloader.type=='image/jpeg' ? preloader.getAsDataURL('image/jpeg',100) : preloader.getAsDataURL(); //得到图片src,实质为一个base64编码的数据
                callback && callback(imgsrc);
                preloader.destroy();
                preloader = null;
            };
            preloader.load( file.getSource() );
        }
    }

    //从缩略图中删除图片
    removeThumbnial(id){
        let obj = this.state.files.concat();
        let pos_1 = -1,
            pos_2 = -1;
        let len = uploader.files.length;
        for(let i=0;i<len;i++){
            if(uploader.files[i].id == id){
                pos_1 = i;
            }
            if(obj[i].id == id){
                pos_2 = i;
            }
            if(pos_1 > -1 && pos_2 > -1){
                break;
            }
        }

        obj.splice(pos_2, 1)
        this.setState({
            files: obj,
        });
        uploader.files.splice(pos_1, 1);
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
            <div id='upload-container'>
                <div className="upload-btn" id='upload_btn'>
                    <i className='iconfont icon-ai-up-img'></i>
                    <p>上传图片</p>
                </div>
                <div className='title'>图片预览</div>
                <div className='preview' id='preview'>
                    {
                        this.state.files.length ?
                            this.state.files.map((d,k) => {
                                return (
                                    <div className="preview-item" id={ d.id } key={ d.id }>
                                        <img src={ d.thumbnail } alt=""/>
                                        <div className="processBar">
                                            <div className="bg"></div>
                                            <span className='percent'></span>
                                        </div>
                                        <div className="delete-btn" onClick={ this.removeThumbnial.bind(this, d.id) }>
                                            <IconButton
                                                iconClassName="iconfont icon-guanbi"
                                                tooltip="删除"
                                                tooltipPosition="bottom-center"
                                                style={{height: '60px'}}
                                            />
                                        </div>
                                    </div>
                                );
                            })
                            :
                            <p>还没有图片，立即上传</p>
                    }
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