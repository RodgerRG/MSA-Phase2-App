import {LOGIN, SIGNUP_USER, LoginActionType, CACHE_ID, CacheIdActionType} from './types';

export const login = (flag : boolean) => {
    return {
        type : LOGIN,
        payload: flag
    } as LoginActionType
}

export const updateID = (id : number) => {
    return {
        type: CACHE_ID,
        payload: id
    } as CacheIdActionType
}