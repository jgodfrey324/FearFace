// action -->
const LOAD_COMMENTS = 'comments/LOAD_COMMENTS';
const DELETE_COMMENT = 'comments/DELETE_COMMENT'
const POST_COMMENT = 'comments/POST_COMMENT'

// action creators -->
const loadComments = (comments) => {
    return {
        type: LOAD_COMMENTS,
        comments
    }
}


const removeComment = (commentId) => {
    return {
        type: DELETE_COMMENT,
        commentId
    }
}

const createComment = (comment) => {
    return {
        type: POST_COMMENT,
        comment
    }
}

// thunk action creators -->
export const getComments = () => async (dispatch) => {
    const res = await fetch(`/api/comments`);

    if (res.ok) {
        const data = await res.json();
        dispatch(loadComments(data));
        return data;
    } else {
        const data = await res.json();
        if (data.errors) {
            return data.errors;
        }
    }
}


export const deleteComment = (commentId) => async (dispatch) => {
    const res = await fetch(`/api/comments/${commentId}/delete`, {
        method: "DELETE"
    })
    if (res.ok) {
        dispatch(removeComment(commentId))
    }
}

export const postComment = (postId,comment) => async (dispatch) => {
    const response = await fetch(`/api/posts/${postId}/comments`, {
        method: 'POST',
        body: comment
    })

    if (response.ok) {
        const { resComment } = await response.json();
        dispatch(createComment(resComment))
    } else {
        const data = await response.json();
        if (data.errors) {
            return data.errors
        }
    }

}

const initialState = {}
// reducer
const commentReducer
    = (state = initialState, action) => {
        let newState;
        switch (action.type) {
            case LOAD_COMMENTS:
                newState = { ...action.comments };
                return newState;
            case DELETE_COMMENT:
                newState = { ...state };
                delete newState[action.commentId];
                return newState;
            case POST_COMMENT:
                newState = { ...state };
                newState[action.comment.id] = action.comment;
                return newState;
            default:
                return state;
        }
    }


export default commentReducer;
