import { RenderPostType, FETCH_POST, CREATE_BOARD, BoardType, BoardCreationType } from './types';
import { JobPost } from './types';

export const renderPosting = (post : JobPost) => {
    return {
        type: FETCH_POST,
        payload: {
            Poster : post.Poster,
            IsTaken : post.IsTaken,
            Description : post.Description,
            Thumbnail : post.Thumbnail,
            Location : post.Location,
            Title : post.Title
        } as JobPost,
        auth: null
    } as BoardCreationType;
}

export const createBoard = (post : BoardType) => {
    return {
        type: CREATE_BOARD,
        payload: post,
        auth: null
    } as BoardCreationType;
}