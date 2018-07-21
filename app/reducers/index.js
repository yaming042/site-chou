import { combineReducers } from 'redux';

import stroll from './stroll';
import eat from './eat';
import enjoy from './enjoy';
import login from './login';

let rootReducer = combineReducers({
	stroll,
	eat,
	enjoy,
	login,
});

export default rootReducer;