import { GET_BOARD } from "./types"

export const getBoard = (boardId : number) => {
    return {
        type : GET_BOARD,
        payload : boardId
    }
}