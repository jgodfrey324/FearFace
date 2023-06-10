//actions -->
const LOAD_POSTS = 'posts/LOAD_POSTS';
const ADD_POST = "posts/ADD_POST"
const EDIT_POST = "posts/EDIT_POST"
const DELETE_POST = "posts/DELETE_POST"

//action creators -->
const loadPosts = (posts) => {
    return {
        type: LOAD_POSTS,
        posts
    }
}

const addPost = (post) => {
    return {
        type: ADD_POST,
        post,
    }
}

const editPost = (post) => {
    return {
        type: EDIT_POST,
        post
    }
}

export const deletePost = (postId) => {
    return {
        type: DELETE_POST,
        postId
    }
}

//thunk action creators -->
export const getAllPosts = () => async (dispatch) => {
    const response = await fetch('/api/posts');

    if (response.ok) {
        const data = await response.json();
        dispatch(loadPosts(data));
        return data;
    } else {
        const data = await response.json();
        if (data.errors) {
            return data.errors;
        }
    }
}

export const createPost = (post) => async (dispatch) => {
    const response = await fetch("/api/posts", {
        method: "POST",
        body: post
    });

    if (response.ok) {
        const { resPost } = await response.json();
        // console.log('res ok ---------------------> ', resPost)
        dispatch(addPost(resPost))
        return resPost
    } else {
        const data = await response.json();
        // console.log('data ------------------------------->', data.errors)
        if (data.errors) {
            return data
        }
    }

}

export const updatePost = (postId, post) => async (dispatch) => {
    const res = await fetch(`/api/posts/${postId}/update`, {
        method: 'PUT',
        body: post
    })
    if (res.ok) {
        const { resPost } = await res.json();
        dispatch(editPost(resPost))
        return resPost
    } else {
        const data = await res.json()
        if (data.errors) {
            return data
        }
    }
}

export const removePost = (postId) => async (dispatch) => {
    const response = await fetch(`/api/posts/${postId}/delete`, {
        method: "DELETE"
    })
    if (response.ok) {
        dispatch(deletePost(postId))
    }
}

//set initial state on load
const initialState = {};
//reducer -->
const postsReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case LOAD_POSTS:
            newState = { ...action.posts };
            return newState;
        case ADD_POST:
            newState = { ...state };
            newState[action.post.id] = action.post
            return newState;
        case EDIT_POST:
            newState = { ...state };
            newState[action.post.id] = action.post
            return newState;
        case DELETE_POST:
            newState = { ...state };
            delete newState[action.postId]
            return newState
        default:
            return state;
    }
}


export default postsReducer
