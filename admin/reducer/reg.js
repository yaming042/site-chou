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
    userName: '',
    userPassword: '',
};

function loginReducer(state=initState, action){
    switch(action.type){
        case TYPE.SET_USER_NAME:
            return Object.assign({}, state, {userName: action.val});
        case TYPE.SET_USER_PASSWORD:
            return Object.assign({}, state, {userPassword: action.val});
        default:
            return state;
    }
}


export default loginReducer;
