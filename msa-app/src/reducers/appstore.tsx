import React from 'react';
import Redux, { Action, combineReducers } from 'redux';
import {LOGIN, LoginActionType, SIGNUP_USER} from '../actions/types';

const initialLogin = {
    isAuthenticated : false,
};

export default function loginReducer(state = initialLogin, action : LoginActionType) {
    switch(action.type) {
        case LOGIN:
            return {
                isAuthenticated : action.payload
            }
        default: 
            return state
    }
}
