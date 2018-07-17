const styles = {
    //新增按钮
    addbtn: {
        backgroundColor: '#0097A7',
    },
    addLabel: {
        fontSize: '12px'
    },
    //弹框
    dialog: {
        bodyStyle: {
            color: '#000',
            backgroundColor: '#fff',
            padding: '0',
            borderRadius: '4px',
            width: '900px',
            height: '600px',
            maxHeight: 'none',
        },
        contentStyle: {
            width: '900px',
            height: '600px',
            maxWidth: 'none',
            transform: 'translate(0,50%)'
        },
        bodyStyleDel: {
            color: '#000',
            backgroundColor: '#fff',
            borderRadius: '4px',
            paddingBottom: '0',
        },
    },
    //登录
    inputStyle: {
        underlineFocusStyle: {borderColor: '#1A237E',bottom: 0},
        style: {height: '36px',lineHeight: '18px'},
        underlineStyle: {bottom:'0'},
        hintStyle: {bottom: '8px',fontSize: '14px'},
        submitBtn: {
            style: {backgroundColor: '#1A237E'},
            label: {color: '#fff'}
        }
    },
    //新建表单
    formInput: {
        style: {
            height: '36px',
            lineHeight: '18px',
        },
        hintStyle: {
            color: '#ccc',
            fontSize: '14px',
            padding: '0 4px',
            bottom: '9px',
        },
        hintStyleTextarea: {
            color: '#ccc',
            fontSize: '14px',
            padding: '0 4px',
            bottom: '10px'
        },
        underlineStyle: {
            borderColor: '#ccc',
            bottom: 0,
        },
        underlineFocusStyle: {
            // borderColor: '#000',
            bottom: 0,
        },
        inputStyle: {
            color: '#666',
            padding: '0 4px'
        },
        errorStyle: {
            position: 'absolute',
            bottom: '-14px',
            padding: '0 4px'
        },
        textareaStyle: {
            color: '#666',
            padding: '0 4px',
        },
        caneclBtn: {
            color: '#FF1744'
        },
        confirmBtn: {
            color: '#006064'
        }
    }
};

export default styles;