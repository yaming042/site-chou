import React, { Component } from 'react';

import * as Actions from '../actions/eat';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';


class Eat extends Component{

    render(){
        return (
            <div>Eat</div>
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
