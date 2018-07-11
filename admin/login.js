import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import * as actions from './actions/login';
import store from './store';
import Login from './components/login';


import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

function mapStateToProps(state){
    return state;
}
function mapDispatchToProps(dispatch){
    return bindActionCreators(actions, dispatch);
}

let LoginApp = connect(mapStateToProps, mapDispatchToProps)(Login);

ReactDom.render(
    <Provider store={ store }>
        <MuiThemeProvider>
            <LoginApp />
        </MuiThemeProvider>
    </Provider>,
    document.getElementById('root')
);