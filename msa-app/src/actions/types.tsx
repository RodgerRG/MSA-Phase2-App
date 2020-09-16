export const LOGIN = "LOGIN"

interface LoginUpdate {
    type: typeof LOGIN,
    payload: boolean
}

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

export type LoginActionType = LoginUpdate
export type RenderPostType = RenderPost

export const SIGNUP_USER = "SIGNUP_USER"
export const CREATE_POST = "CREATE_POST"
export const FETCH_POST = "FETCH_POST"