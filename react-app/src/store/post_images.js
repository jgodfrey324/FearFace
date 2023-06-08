// actions -->
const LOAD_POST_IMAGES = "products/LOAD_PROD_IMAGES"
const ADD_POST_IMAGE = "products/ADD_PROD_IMAGE"



// action creators -->
const loadPostImages = (postImages) => {
    return {
        type: LOAD_POST_IMAGES,
        postImages
    }
}

const addPostImage = (image) => {
    return {
        type: ADD_POST_IMAGE,
        image
    }
}



// thunk action creators -->
export const getAllPostImages = () => async (dispatch) => {
    const res = await fetch('/api/posts/images');
    const data = await res.json()
    dispatch(loadPostImages(data))
    return data
}


export const createPostImage = (postId, image) => async (dispatch) => {
    const res = await fetch(`/api/posts/${postId}/images`, {
        method: "POST",
        body: image
    })

    if (res.ok) {
        const data = await res.json();
        dispatch(addPostImage(data));
    } else {
        const data = await res.json();
        if (data.errors) {
            return data.errors
        }
    }
}



//set initial state on load
const initialState = {};
//reducer -->
const postImagesReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case LOAD_POST_IMAGES:
            newState = { ...action.postImages }
            return newState
        case ADD_POST_IMAGE:
            newState = { ...state }
            newState[action.image.id] = action.image
            return newState
        default:
            return state;
    }
}

export default postImagesReducer
