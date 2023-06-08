// actions -->
const LOAD_PROD_IMAGES = "products/LOAD_PROD_IMAGES"
const ADD_PROD_IMAGE = "products/ADD_PROD_IMAGE"



// action creators -->
const loadProductImages = (productImages) => {
    return {
        type: LOAD_PROD_IMAGES,
        productImages
    }
}

const addProdImage = (image) => {
    return {
        type: ADD_PROD_IMAGE,
        image
    }
}



// thunk action creators -->
export const getAllProdImages = () => async (dispatch) => {
    const res = await fetch('/api/products/images');
    const data = await res.json()
    dispatch(loadProductImages(data))
    return data
}


export const createProdImage = (productId, image) => async (dispatch) => {
    const res = await fetch(`/api/products/${productId}/images`, {
        method: "POST",
        body: image
    })

    if (res.ok) {
        const data = await res.json();
        dispatch(addProdImage(data));
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
const productImagesReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case LOAD_PROD_IMAGES:
            newState = { ...action.productImages }
            return newState
        case ADD_PROD_IMAGE:
            newState = { ...state }
            newState[action.image.id] = action.image
            return newState
        default:
            return state;
    }
}

export default productImagesReducer
