import React from 'react';
import Redux, { Action, combineReducers } from 'redux';
import {LOGIN, LoginActionType, SIGNUP_USER, RenderPostType, FETCH_POST, CacheIdActionType, CACHE_ID, BoardCreationType, CREATE_BOARD, BoardType, GET_BOARD} from '../actions/types';
import { useHistory, useLocation } from 'react-router';
import { LoginState } from '../components/Login';

const initialLogin = {
    isAuthenticated: false,
    token : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiIyIiwidW5pcXVlX25hbWUiOiJSb2RnZXJSRyIsIm5iZiI6MTYwMDMzNjg2MywiZXhwIjoxNjAwMzM4NjYzLCJpYXQiOjE2MDAzMzY4NjN9.rm5n3nRl8v0TK3815oiV2IaQK3668LUgwOJ7fsS8pi0"
};

function loginReducer (state = initialLogin, action : LoginActionType) {
    switch(action.type) {
        case LOGIN:
            console.log("" + action.payload)

            return {
                ...state,
                isAuthenticated : action.payload,
                token: action.token
            }
        default: 
            return state
    }
}

function postReducer (state = initialBoardCreation, action : RenderPostType) {
    switch(action.type) {
        
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
    board : {
        boardId : 0,
        ownerId : 0,
        boardName: "",
        jobs : []
    }
};

function BoardReducer (state = initialBoardCreation, action : BoardCreationType) {
    switch(action.type) {
        case CREATE_BOARD:
            return {
                ...state,
                board: action.payload
            }
        case FETCH_POST:
            var board : BoardType = Object.assign({}, state.board, {
                jobs: [...state.board.jobs, action.payload]
            });
            return {
                ...state,
                board : board
            }
        case GET_BOARD:
            let newState = Object.assign({}, state.board, {
                boardId: action.payload
            });

            console.log(newState);

            return {
                ...state,
                board : newState
            }
        default :
            return state
    }
}

export default combineReducers({
    loginState : loginReducer,
    postState : postReducer,
    idState : idReducer,
    postBoardState : BoardReducer
})