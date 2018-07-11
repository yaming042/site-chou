import React, { Component } from 'react';

import * as Actions from '../actions/eat';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';


class Eat extends Component{

    render(){
        return (
            <div>
                <img
                    src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2156679303,538323769&fm=200&gp=0.jpg"
                    alt=""/>
                Eat
            </div>
        );
    }
}

function mapStateToProps(state) {
    return state;
}
function mapDispatchToProps( dispatch ) {
    return bindActionCreators(Actions, dispatch);
}

export default (connect(mapStateToProps, mapDispatchToProps))(Eat);
