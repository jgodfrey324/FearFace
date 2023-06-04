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

export const deletePost = (post) => {
    return {
        type: DELETE_POST,
        post
    }
}

//thunk action creators -->
export const getAllPosts = () => async (dispatch) => {
    const response = await fetch('/api/posts');

    if (response.ok) {
        const data = await response.json();
        dispatch(loadPosts(data));
        return data;
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data.errors;
        }
    }
    else {
        console.log('there was an error getting all posts')
    }
}

export const createPost = (post) => async (dispatch) => {
    const response = await fetch("/api/posts", {
        method: "POST",
        body: post
    });

    if (response.ok) {
        const { resPost } = await response.json();
        console.log("NEW POST ====>", resPost);
        dispatch(addPost(resPost))
    } else {
        const data = await response.json();
        if (data.errors) {
            return data.errors
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
    } else {
        const data = await res.json()
        if (data.errors) {
            return data.errors
        }
    }
}

// export const removePost = (postId) => async (dispatch) => {
//     const response = await fetch(`/api/posts/${postId}/delete`, {
//         method: "DELETE"
//     })
//     if (response.ok) {
//         dispatch(deletePost(postId))
//     }
// }

//set initial state on load
const initialState = {};
//reducer -->
const postsReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case LOAD_POSTS:
            newState = { ...state };
            action.posts.forEach(post => newState[post.id] = post)
            return newState;
        case ADD_POST:
            newState = { ...state };
            newState[action.post.id] = action.post
            return newState;
        case EDIT_POST:
            newState = { ...state };
            newState[action.post.id] = action.post
        case DELETE_POST: {
            newState = { ...state };
            console.log("this is nnnenwewewewe state", newState)

            delete newState[action.post.id]
            console.log("this is  deleted new state =>>>>>>>>>>>", newState)
            return newState
        }
        default:
            return state;
    }
}


export default postsReducer
