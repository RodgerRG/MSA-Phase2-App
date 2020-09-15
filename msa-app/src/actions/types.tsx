export const LOGIN = "LOGIN"

interface LoginUpdate {
    type: typeof LOGIN,
    payload: boolean
}

export type LoginActionType = LoginUpdate

export const SIGNUP_USER = "SIGNUP_USER"