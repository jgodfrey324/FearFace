//actions -->
const LOAD_POSTS = 'posts/LOAD_POSTS';
const ADD_POST = "posts/ADD_POST"

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

//thunk action creators -->
export const getAllPosts = () => async (dispatch) => {
    const res = await fetch('/api/posts');

    if (res.ok) {
        const data = await res.json();
        dispatch(loadPosts(data));
        return data;
    } else {
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
        console.log("Error in making post")
    }

}

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
        default:
            return state;
    }
}



export default postsReducer
