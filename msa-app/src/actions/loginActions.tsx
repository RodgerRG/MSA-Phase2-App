import {LOGIN, SIGNUP_USER, LoginActionType} from './types';

export const login = (flag : boolean) => {
    return {
        type : LOGIN,
        payload: flag
    } as LoginActionType
}