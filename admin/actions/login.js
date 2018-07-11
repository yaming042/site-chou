import * as TYPE from '../../app/const';

export function setUserName(val) {
    return {
        type: TYPE.SET_USER_NAME,
        val
    };
}

export function setUserPassword(val) {
    return {
        type: TYPE.SET_USER_PASSWORD,
        val
    };
}