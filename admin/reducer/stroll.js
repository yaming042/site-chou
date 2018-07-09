import * as TYPE from '../../app/const';

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
    userId: '1',
    userName: 'test1',
    userAge: '22',
};

function strollReducer(state=initState, action){
    switch(action.type){
        case TYPE.GUANG_ID:
            return Object.assign({}, state, {userId: action.val});
        case TYPE.GUANG_NAME:
            return Object.assign({}, state, {userName: action.val});
        case TYPE.GUANG_AGE:
            return Object.assign({}, state, {userAge: action.val});
        default:
            return state;
    }
}


export default strollReducer;
