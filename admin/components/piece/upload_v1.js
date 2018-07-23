import React, { Component } from 'react';
import IconButton from 'material-ui/IconButton';
import Snackbar from 'material-ui/Snackbar';

import * as Events from '../../Events';
import * as Func from "../../../controller/functions";


let expire = 0,
    host,
    upload_params,
    dir;
let uploader;

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
        let _this = this;

        if(!window.hasOwnProperty('plupload')){
            Func.createScript('/lib/plupload-2.1.2/js/plupload.full.min.js', () => {
                _this.initUpload();
            });
        }else{
            _this.initUpload();
        }

        Events.customEvents.on(Events.UPLOAD_IMAGE, () => {
            _this.set_upload_param(uploader, '');
        });


    }

    //======================
    initUpload() {
        let _this = this;

        setTimeout(() => {
            uploader = new plupload.Uploader({
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
                    max_file_size: '1mb', //最大只能上传1mb的文件
                    prevent_duplicates: true //不允许选取重复文件
                },

                init: {
                    PostInit: function () {
                        _this.get_signature();
                    },

                    FilesAdded: function (up, files) {
                        let oldData = _this.state.files;
                        let data = files.slice(0);

                        for(let i = 0, len = files.length; i<len; i++){
                            (function(i){
                                _this.previewImage(files[i], (src) => {
                                    data[i].thumbnail = src;
                                });
                            })(i);
                        }

                        setTimeout(() => {
                            _this.setState({
                                files: data.concat(oldData),
                            });

                            _this.set_upload_param(uploader, '');//上传后立即更新
                        }, 200);
                    },

                    BeforeUpload: function (up, file) {
                        _this.set_upload_param(up, file.name);
                    },

                    UploadProgress: function (up, file) {
                        $('#' + file.id).find(".processBar").css('display', 'block');
                        $('#' + file.id).find(".percent").html(file.percent + '%');
                        $('#' + file.id).find('.bg').css({'width': file.percent + '%'});
                    },

                    FileUploaded: function (up, file, info) {
                        if(info.status == 200){
                            $('#' + file.id).find(".bg").css('opacity','0.3');
                            $('#' + file.id).find(".percent").html('上传成功');
                        }else if (info.status == 203){
                            $('#' + file.id).find(".percent").html('上传成功，回调失败，失败原因： ' + info.response);
                        }else{
                            $('#' + file.id).find(".percent").html('失败： ' + info.response);
                        }
                    },

                    Error: function (up, err) {
                        let msg = '';
                        if(err.code == -600){
                            msg = '大于 1M 的图片暂不支持上传';
                        }else if (err.code == -601){
                            msg = '请选择正确格式的图片( jpg, jpeg, gif, png, bmp )';
                        }else if(err.code == -602){
                            msg = '请勿重复上传同一个文件';
                        }else{
                            msg = 'Error xml: ' + err.response;
                        }
                        $("#errorbox").html(msg);
                        let timeid = setTimeout(() => {
                            $("#errorbox").html('');
                            clearTimeout(timeid);
                        }, 3000)
                    }
                }
            });
            uploader.init();
        }, 0);
    }
    set_upload_param(up, filename) {
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
                // preloader.downsize( 300, 300 );//先压缩一下要预览的图片,宽300，高300
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
                <div className='title'>图片预览 <span id='errorbox'></span></div>
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
                    bodyStyle={{backgroundColor: '#000'}}
                    contentStyle={{color: '#fff'}}
                />
            </div>
        );
    }
}