import React, { Component } from 'react';
import IconButton from 'material-ui/IconButton';
import Snackbar from 'material-ui/Snackbar';

import * as Events from '../../Events';

let accessid = '';
let accesskey = '';
let host = '';
let policyBase64 = '';
let signature = '';
let callbackbody = '';
let filename = '';
let key = '';
let expire = 0;
let g_object_name = '';
let g_object_name_type = '';
let timestamp = Date.parse(new Date()) / 1000;
let now = timestamp;
let suffix = '';

export default class UploadBox extends Component{
    constructor(props){
        super(props);
        this.state = {
            uploader: '',
            files: [],

            snackbarOpen: false,
            snackbarMsg: '',
        };
    }

    componentDidMount(){
        let _this = this;

        Events.customEvents.on(Events.UPLOAD_IMAGE, () => {
            _this.set_upload_param(uploader, '', false);
        });


        let uploader = new plupload.Uploader({
            runtimes: 'html5,flash,silverlight,html4',
            browse_button: 'upload-btn',
            //multi_selection: false,
            container: document.getElementById('upload-container'),
            flash_swf_url: 'lib/plupload-2.1.2/js/Moxie.swf',
            silverlight_xap_url: 'lib/plupload-2.1.2/js/Moxie.xap',
            url: 'http://oss.aliyuncs.com',

            filters: {
                mime_types: [ //只允许上传图片和zip文件
                    {title: "Image files", extensions: "jpg,jpeg,gif,png,bmp"},
                    {title: "Zip files", extensions: "zip,rar"}
                ],
                max_file_size: '10mb', //最大只能上传10mb的文件
                prevent_duplicates: true //不允许选取重复文件
            }
        });

        uploader.init();

        //绑定文件添加进队列事件
        uploader.bind('FilesAdded',(up,files) => {
            let oldData = this.state.files;
            let data = files.concat();

            for(let i = 0, len = files.length; i<len; i++){
                (function(i){
                    _this.previewImage(files[i], (src) => {
                        data[i].thumbnail = src;
                    });
                })(i);
            }


            setTimeout(()=>{
                _this.setState({
                    files: data.concat(oldData),
                });
            }, 100)

        });

        //准备上传是的设置
        // uploader.bind('PostInit', () => {
        //     document.getElementById('').onclick = function() {
        //         this.set_upload_param(uploader, '', false);
        //         return false;
        //     };
        // });

        //上传前准备
        uploader.bind('BeforeUpload', (up, file) => {
            this.check_object_radio();
            this.set_upload_param(up, file.name, true);
        });

        //上传进度条
        uploader.bind('UploadProgress', (up, file) => {
            $('#' + file.id).find(".processBar").css('display', 'block');
            $('#' + file.id).find(".percent").html(file.percent + '%');
            $('#' + file.id).find('.bg').css({'width': file.percent + '%'});

        });

        //上传完成
        uploader.bind('FileUploaded', (up, file, info) => {
            if(info.status == 200){
                $('#' + file.id).find(".percent").html('上传成功');
                // document.getElementById(file.id).getElementsByTagName('b')[0].innerHTML = 'upload to oss success, object name:' + _this.get_uploaded_object_name(file.name) + ' 回调服务器返回的内容是:' + info.response;
            }else if (info.status == 203){
                $('#' + file.id).find(".percent").html('上传成功，回调失败，失败原因： ' + info.response);
                // document.getElementById(file.id).getElementsByTagName('b')[0].innerHTML = '上传到OSS成功，但是oss访问用户设置的上传回调服务器失败，失败原因是:' + info.response;
            }else{
                $('#' + file.id).find(".percent").html('失败： ' + info.response);
                // document.getElementById(file.id).getElementsByTagName('b')[0].innerHTML = info.response;
            }
        })

        //错误捕获
        uploader.bind('Error', (up, err) => {
            if(err.code == -600){
                _this.snackbarOpen('选择的文件太大了');
            }else if (err.code == -601){
                _this.snackbarOpen('选择的文件后缀不对');
            }else if(err.code == -602){
                _this.snackbarOpen('这个文件已经上传过一遍了');
            }else{
                _this.snackbarOpen('Error xml: ' + err.response);
            }
        })

    }

    //======================
    send_request(){
        let xmlhttp = null;
        if(window.XMLHttpRequest){
            xmlhttp = new XMLHttpRequest();
        }else if(window.ActiveXObject){
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }

        if(xmlhttp != null){
            let serverUrl = 'http://47.94.97.168:8082/getsignature';
            xmlhttp.open( "GET", serverUrl, false );
            xmlhttp.send( null );
            return xmlhttp.responseText;
        }else{
            alert("Your browser does not support XMLHTTP.");
        }
    };

    check_object_radio() {
        let tt = document.getElementsByName('myradio');
        for (let i = 0; i < tt.length ; i++ ){
            if(tt[i].checked){
                g_object_name_type = tt[i].value;
                break;
            }
        }
    }

    get_signature() {
        //可以判断当前expire是否超过了当前时间,如果超过了当前时间,就重新取一下.3s 做为缓冲
        now = timestamp = Date.parse(new Date()) / 1000;
        if (expire < now + 3){
            let body = this.send_request()
            let obj = eval ("(" + body + ")");
            host = obj['host']
            policyBase64 = obj['policy']
            accessid = obj['accessid']
            signature = obj['signature']
            expire = parseInt(obj['expire'])
            callbackbody = obj['callback']
            key = obj['dir']
            return true;
        }
        return false;
    };

    random_string(len) {
        len = len || 32;
        let chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
        let maxPos = chars.length;
        let pwd = '';
        for (let i = 0; i < len; i++) {
            pwd += chars.charAt(Math.floor(Math.random() * maxPos));
        }
        return pwd;
    }

    get_suffix(filename) {
        let pos = filename.lastIndexOf('.')
        if (pos != -1) {
            suffix = filename.substring(pos)
        }
        return suffix;
    }

    calculate_object_name(filename){
        if (g_object_name_type == 'local_name'){
            g_object_name += "${filename}"
        }else if (g_object_name_type == 'random_name'){
            suffix = this.get_suffix(filename)
            g_object_name = key + this.random_string(10) + suffix
        }
        return ''
    }

    get_uploaded_object_name(filename){
        if(g_object_name_type == 'local_name'){
            tmp_name = g_object_name
            tmp_name = tmp_name.replace("${filename}", filename);
            return tmp_name
        }else if(g_object_name_type == 'random_name'){
            return g_object_name
        }
    }

    set_upload_param(up, filename, ret){
        if (ret == false){
            this.get_signature()
        }
        g_object_name = key;
        if (filename != '') {
            suffix = this.get_suffix(filename)
            this.calculate_object_name(filename)
        }
        let new_multipart_params = {
            'key' : g_object_name,
            'policy': policyBase64,
            'OSSAccessKeyId': accessid,
            'success_action_status' : '200', //让服务端返回200,不然，默认会返回204
            'callback' : callbackbody,
            'signature': signature,
        };

        up.setOption({
            'url': host,
            'multipart_params': new_multipart_params
        });

        up.start();
    }
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
                var imgsrc = preloader.type=='image/jpeg' ? preloader.getAsDataURL('image/jpeg',80) : preloader.getAsDataURL(); //得到图片src,实质为一个base64编码的数据
                callback && callback(imgsrc);
                preloader.destroy();
                preloader = null;
            };
            preloader.load( file.getSource() );
        }
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
                <div className="upload-btn" id='upload-btn'>
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
                                            <span className='percent'>90%</span>
                                        </div>
                                        <div className="delete-btn">
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