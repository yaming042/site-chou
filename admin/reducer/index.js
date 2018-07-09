import { combineReducers } from 'redux';

import enjoy from './enjoy';
import eat from './eat';
import stroll from './stroll';
import search from './search';

let rootReducer = combineReducers({
    enjoy,
    eat,
    stroll,
    search
});

export default rootReducer;