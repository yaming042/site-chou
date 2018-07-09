import React, { Component } from 'react';

import * as Actions from '../actions/stroll';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';


class Stroll extends Component{

    render(){
        return (
            <div>Stroll</div>
        );
    }
}

function mapStateToProps(state) {
    return state;
}
function mapDispatchToProps( dispatch ) {
    return bindActionCreators(Actions, dispatch);
}

export default (connect(mapStateToProps, mapDispatchToProps))(Stroll);
