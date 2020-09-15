import {LOGIN, SIGNUP_USER} from './types';

export const login = (flag : boolean) => {
    return {
        type : LOGIN,
        payload: flag
    }
}