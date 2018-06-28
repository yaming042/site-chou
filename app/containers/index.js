import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as Actions from '../actions';

import page1 from '../components/index/index1';
import page2 from '../components/index/index2';
import page3 from '../components/index/index3';
import page4 from '../components/index/index4';
import page5 from '../components/index/index5';

function mapStateToProps(state){
	return state;
}
function mapDispatchToProps(dispatch){
	return bindActionCreators(Actions, dispatch);
}

export const index1 = connect(mapStateToProps, mapDispatchToProps)(page1);
export const index2 = connect(mapStateToProps, mapDispatchToProps)(page2);
export const index3 = connect(mapStateToProps, mapDispatchToProps)(page3);
export const index4 = connect(mapStateToProps, mapDispatchToProps)(page4);
export const index5 = connect(mapStateToProps, mapDispatchToProps)(page5);