import { BoardCreationType, GET_BOARD } from "./types"

export const getBoard = (boardId : number, auth: string) => {
    return {
        type : GET_BOARD,
        payload : boardId,
        auth : auth
    } as BoardCreationType;
}