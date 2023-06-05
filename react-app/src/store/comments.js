// action -->
const LOAD_POST_COMMENTS = 'comments/LOAD_POST_COMMENTS';
const LOAD_USER_COMMENTS = 'comments/LOAD_USER_COMMENTS';
const DELETE_COMMENT = 'comments/DELETE_COMMENT'
// const POST_COMMENT = 'comments/POST_COMMENT'

// action creators -->
const loadPostComments = (comments) => {
    return {
        type: LOAD_POST_COMMENTS,
        comments
    }
}

const loadUserComments = (comments) => {
    return {
        type: LOAD_USER_COMMENTS,
        comments
    }
}

const removeComment = (commentId) => {
    return {
        type: DELETE_COMMENT,
        commentId
    }
}

// const createComment = (comment) => {
//     return {
//         type: POST_COMMENT,
//         comment
//     }
// }

// thunk action creators -->
export const getPostComments = (postId) => async (dispatch) => {
    const res = await fetch(`/api/posts/${postId}/comments`);

    if (res.ok) {
        const data = await res.json();
        dispatch(loadPostComments(data));
        return data;
    } else {
        const data = await res.json();
        if (data.errors) {
            return data.errors;
        }
    }
}

export const getUserComments = (userId) => async (dispatch) => {
    const res = await fetch(`/api/users/${userId}/comments`);

    if (res.ok) {
        const data = await res.json();
        dispatch(loadUserComments(data));
        return data;
    } else {
        const data = await res.json();
        if (data.errors) {
            return data.errors;
        }
    }
}

export const deleteComment = (commentId) => async (dispatch) => {
    const res = await fetch(`api/comments/${commentId}/delete`, {
        method: "DELETE"
    })
    if (res.ok) {
        dispatch(removeComment(commentId))
    }
}

// export const postComment = (comment) => async (dispatch) => {
//     const response = await(`/api/comments/posts`, {
//         method: 'POST',
//         body: comment
//     })

//     if (response.ok) {

//     }
// }

const initialState = { post: {}, user: {} }
// reducer
const commentReducer
    = (state = initialState, action) => {
        let newState;
        switch (action.type) {
            case LOAD_POST_COMMENTS:
                newState = { ...state };
                newState.post = { ...action.comments };
                return newState;
            case LOAD_USER_COMMENTS:
                newState = { ...state };
                newState.user = { ...action.comments };
                return newState
            case DELETE_COMMENT: {
                newState = { ...state }
                delete newState[action.commentId]
                return newState
            }
            default:
                return state;
        }
    }


export default commentReducer;
