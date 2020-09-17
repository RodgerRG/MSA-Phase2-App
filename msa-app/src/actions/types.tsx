export const LOGIN = "LOGIN"

interface LoginUpdate {
    type: typeof LOGIN,
    payload: boolean
}

export type LoginActionType = LoginUpdate

interface RenderPost {
    type : typeof FETCH_POST,
    payload: {
        Poster : string,
        IsTaken : boolean,
        Description : string,
        Thumbnail : string,
        Location : string,
        Title : string
    }
}


export type RenderPostType = RenderPost

export const SIGNUP_USER = "SIGNUP_USER"
export const CREATE_POST = "CREATE_POST"
export const FETCH_POST = "FETCH_POST"

export const CACHE_ID = "CACHE_ID"

interface IdUpdate {
    type : typeof CACHE_ID,
    payload : number
}

export type CacheIdActionType = IdUpdate

export type JobPost = {
    Poster : string,
    IsTaken : boolean,
    Description : string,
    Thumbnail : string,
    Location : string,
    Title : string
}

export type BoardType = {
    boardId : number,
    ownerId : number,
    jobs : JobPost[]
}

export const CREATE_BOARD = "CREATE_BOARD"

interface BoardCreation {
    type: typeof CREATE_BOARD | typeof FETCH_POST,
    payload: BoardType | JobPost
}

export type BoardCreationType = BoardCreation