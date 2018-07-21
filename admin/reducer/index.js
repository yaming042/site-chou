import { combineReducers } from 'redux';

import enjoy from './enjoy';
import eat from './eat';
import stroll from './stroll';
import search from './search';
import login from './login';
import reg from './reg';

let rootReducer = combineReducers({
    enjoy,
    eat,
    stroll,
    search,
    login,
    reg,
});

export default rootReducer;