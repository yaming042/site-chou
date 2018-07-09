import React, { Component } from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import CircularProgress from 'material-ui/CircularProgress';

import Header from './components/header/Header';
import Navbar from './components/navbar/left_navbar';

export default class Base extends Component{
    constructor(props){
        super(props);
        this.state = {
            loading: true,
        };
    }

    componentDidMount(){
        setTimeout(() => {
            this.setState({
                loading: false,
            });
        },1000)
    }
    render(){

        return (
            <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
                <div className='admin-root'>
                    <Header/>

                    <div className="left-navbar">
                        <Navbar/>
                    </div>

                    <div className="admin-content">
                        {
                            this.state.loading ?
                                <div className="load-more">
                                    <CircularProgress
                                        color='blue'
                                    />
                                </div> : null
                        }

                        { this.props.children }
                    </div>


                </div>
            </MuiThemeProvider>
        );
    }
}