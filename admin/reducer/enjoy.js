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
    productId: '',
    productData: {},

};

function enjoyReducer(state=initState, action){
    switch(action.type){
        case TYPE.SET_ENJOY_ID:
            return Object.assign({}, state, {productId: action.val});
        case TYPE.SET_ENJOY_DATA:
            return Object.assign({}, state, {productData: action.val});
        default:
            return state;
    }
}


export default enjoyReducer;
