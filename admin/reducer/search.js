import * as TYPE from '../../app/const';
import guangReducer from "../../app/reducers/stroll";

if (typeof Object.assign != 'function') {
    Object.assign = function (target) {
        'use strict';
        if (target === undefined || target === null) {
            throw new TypeError('Cannot convert undefined or null to object');
        }
        var output = Object(target);
        for (var index = 1; index < arguments.length; index++) {
            var source = arguments[index];
            if (source !== undefined && source !== null) {
                for (var nextKey in source) {
                    if (source.hasOwnProperty(nextKey)) {
                        output[nextKey] = source[nextKey];
                    }
                }
            }
        }
        return output;
    };
}

const initState = {
    searchVal: '',
    type: '',
};

function searchReducer(state=initState, action){
    switch(action.type){
        case TYPE.SEARCH_TYPE:
            return Object.assign({}, state, {type: action.val});
        case TYPE.SEARCH_VAL:
            return Object.assign({}, state, {searchVal: action.val});
        default:
            return state;
    }
}

export default searchReducer;