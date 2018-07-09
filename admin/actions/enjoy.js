import * as TYPE from '../../app/const';

export function test1(val) {
    return {
        type: TYPE.TEST1,
        val
    };
}