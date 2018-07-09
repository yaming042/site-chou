import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as Actions from '../actions/enjoy';
import * as events from '../Events';

import Add from './main/enjoyAdd';
import EnjoyTable from './main/tableEnjoy';
import EnjoyDialog from './main/dialogEnjoy';


class Enjoy extends Component{



    render(){
        return (
            <div>
                <Add/>
                <EnjoyTable/>
                <EnjoyDialog/>
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

export default (connect(mapStateToProps, mapDispatchToProps))(Enjoy);
