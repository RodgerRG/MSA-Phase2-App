import React from 'react';
import Redux, { Action, combineReducers } from 'redux';
import {LOGIN, LoginActionType, SIGNUP_USER, RenderPostType, FETCH_POST, CacheIdActionType, CACHE_ID, BoardCreationType, CREATE_BOARD} from '../actions/types';
import { useHistory, useLocation } from 'react-router';
import { LoginState } from '../components/Login';

const initialLogin = {
    isAuthenticated: false
};

function loginReducer (state = initialLogin, action : LoginActionType) {
    switch(action.type) {
        case LOGIN:
            console.log("" + action.payload)

            return {
                ...state,
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

const initialId = {
    userId: 0
};

function idReducer (state = initialId, action : CacheIdActionType){
    switch(action.type) {
        case CACHE_ID:
            initialId.userId = action.payload
            return {
                ...state,
                userId: action.payload
            }
        default :
            return state
    }
}

const initialBoardCreation = {
    board : null
};

function postBoardReducer (state = initialBoardCreation, action : BoardCreationType) {
    switch(action.type) {
        case CREATE_BOARD:
            return {
                ...state,
                board: action.payload
            }
        default :
            return state
    }
}

export default combineReducers({
    loginState : loginReducer,
    postState : postReducer,
    idState : idReducer,
    postBoardState : postBoardReducer
})