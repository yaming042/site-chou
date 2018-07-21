import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as LoginActions from '../actions/login';

import page1 from '../components/index/index';
import page2 from '../components/index/enjoy';
import page3 from '../components/index/eat';
import page4 from '../components/index/stroll';

function mapStateToProps(state){
	return state;
}
function mapDispatchToProps(dispatch){
	return bindActionCreators(LoginActions, dispatch);
}

export const index = connect(mapStateToProps, mapDispatchToProps)(page1);
export const enjoy = connect(mapStateToProps, mapDispatchToProps)(page2);
export const eat = connect(mapStateToProps, mapDispatchToProps)(page3);
export const stroll = connect(mapStateToProps, mapDispatchToProps)(page4);