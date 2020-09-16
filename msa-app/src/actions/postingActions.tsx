import { RenderPostType, FETCH_POST } from './types';
import { JobPost } from '../components/JobBoard'

export const renderPosting = (posting : JobPost) => {
    return {
        type: FETCH_POST,
        payload: {
            Poster : posting.Poster,
            IsTaken : posting.IsTaken,
            Description : posting.Description,
            Thumbnail : posting.Thumbnail,
            Location : posting.Location,
            Title : posting.Title
        }
    } as RenderPostType
}