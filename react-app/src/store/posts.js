//actions -->
const LOAD_POSTS = 'posts/loadPosts';


//action creators -->
const loadPosts = (posts) => {
    return {
        type: LOAD_POSTS,
        posts
    }
}


//thunk action creators -->
export const getAllPosts = () => async (dispatch) => {
    const res = await fetch('/api/posts');
    const data = await res.json();
    dispatch(loadPosts(data));
    return data;
}


//set initial state on load
const initialState = {};
//reducer -->
const postsReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case LOAD_POSTS:
            newState = { ...state };
            // action.posts.forEach(post => newState[post.id] = post)
            console.log('action posts from front end ------> ', action.posts)
            return newState;
        default:
            return state;
    }
}



export default postsReducer
