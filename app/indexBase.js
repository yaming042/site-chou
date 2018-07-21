import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as LoginActions from './actions/login';


import header from './components/header';
import Footer from './components/footer';

export default class Base extends Component{

	render(){

		return (
            <MuiThemeProvider>
                <div className='main-root'>
                    <Header />

                    { this.props.children }

                    <Footer />
                </div>
            </MuiThemeProvider>
		);
	}
}

function mapStateToProps(state){
    return state;
}
function mapDispatchToProps(dispatch){
    return bindActionCreators(LoginActions, dispatch);
}

const Header = connect(mapStateToProps, mapDispatchToProps)(header);
