//actions -->
const LOAD_PRODUCTS = "products/LOAD_PRODUCTS"
const ADD_PRODUCT = "products/ADD_PRODUCT"




//action creators -->
const loadProduct = (products) => {
    return {
        type: LOAD_PRODUCTS,
        products
    }
}

const addProduct = (product) => {
    return {
        type: ADD_PRODUCT,
        product
    }
}

//thunk action creators -->
export const getAllProducts = () => async (dispatch) => {
    const response = await fetch('/api/products');

    if (response.ok) {
        const data = await response.json();
        dispatch(loadProduct(data));
        return data;
    } else {
        const data = await response.json();
        if (data.errors) {
            return data.errors;
        }
    }
}

export const createProductThunk = (product) => async (dispatch) => {
    const res = await fetch("api/products", {
        method: "POST",
        body: product
    })

    if (res.ok) {
        const { resProduct } = await res.json();
        dispatch(addProduct(resProduct))
    } else {
        const data = await res.json()
        if (data.errors) {
            return data.errors
        }
    }
}

//set initial state on load
const initialState = {};
//reducer -->
const productsReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case LOAD_PRODUCTS:
            newState = { ...action.products }
            return newState
        case ADD_PRODUCT:
            newState = { ...newState }
            newState[action.product.id] = action.product
            return newState
        default:
            return state;
    }
}

export default productsReducer
