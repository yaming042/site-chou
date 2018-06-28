import { combineReducers } from 'redux';

import guang from './guang';
import chi from './chi';
import mai from './mai';
import wan from './wan';
import other from './other';

let rootReducer = combineReducers({
	guang,
	chi,
	mai,
	wan,
	other,
});

export default rootReducer;