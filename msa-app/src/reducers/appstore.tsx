import React from 'react';
import Redux, { Action, combineReducers } from 'redux';
import {LOGIN, LoginActionType, SIGNUP_USER, RenderPostType, FETCH_POST} from '../actions/types';
import { useHistory, useLocation } from 'react-router';

const initialLogin = {
    isAuthenticated: false,
};

function loginReducer (state = initialLogin, action : LoginActionType) {
    switch(action.type) {
        case LOGIN:
            console.log("" + action.payload)

            return {
                isAuthenticated : action.payload
            }
        default: 
            return state
    }
}

const initialPost = {
    Poster : "",
    IsTaken : false,
    Description : "",
    Thumbnail : "",
    Location : "",
    Title : ""
};

function postReducer (state = initialPost, action : RenderPostType) {
    switch(action.type) {
        case FETCH_POST:
            let payload = action.payload;
            return {
                Poster : payload.Poster,
                IsTaken : payload.IsTaken,
                Description : payload.Description,
                Thumbnail : payload.Thumbnail,
                Location : payload.Location,
                Title : payload.Title
            }
        default:
            return state
    }
}

export default combineReducers({
    loginReducer,
    postReducer
})
