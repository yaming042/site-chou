import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import * as actions from './actions/reg';
import store from './store';
import Reg from './components/reg';


import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

function mapStateToProps(state){
    return state;
}
function mapDispatchToProps(dispatch){
    return bindActionCreators(actions, dispatch);
}

let RegApp = connect(mapStateToProps, mapDispatchToProps)(Reg);

ReactDom.render(
    <Provider store={ store }>
        <MuiThemeProvider>
            <RegApp />
        </MuiThemeProvider>
    </Provider>,
    document.getElementById('root')
);