import * as TYPE from '../const';

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

export function setUserMobile(val) {
    return {
        type: TYPE.SET_USER_MOBILE,
        val
    };
}

export function setUserVerification(val) {
    return {
        type: TYPE.SET_USER_VERIFICATION,
        val
    };
}

export function setUserEmail(val) {
    return {
        type: TYPE.SET_USER_EMAIL,
        val
    };
}
export function setLoginUser(val) {
    return {
        type: TYPE.SET_LOGIN_USER,
        val
    };
}