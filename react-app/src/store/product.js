//actions -->
const LOAD_PRODUCTS = "products/LOAD_PRODUCTS"
const ADD_PRODUCT = "products/ADD_PRODUCT"
const EDIT_PRODUCT = "products/EDIT_PRODUCT"
const DELETE_PRODUCT = "products/DELETE_PRODUCT"




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

const editProduct = (product) => {
    return {
        type: EDIT_PRODUCT,
        product
    }
}

const deleteProd = (productId) => {
    return {
        type: DELETE_PRODUCT,
        productId
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
    const res = await fetch("/api/products", {
        method: "POST",
        body: product
    })

    if (res.ok) {
        const { resProduct } = await res.json();
        dispatch(addProduct(resProduct))
        return resProduct
    } else {
        const data = await res.json()
        if (data.errors) {
            return data.errors
        }
    }
}

export const updateProduct = (productId, product) => async (dispatch) => {
    const res = await fetch(`/api/products/${productId}/update`, {
        method: 'PUT',
        body: product
    })
    if (res.ok) {
        const { resProduct } = await res.json();
        dispatch(editProduct(resProduct))
    } else {
        const data = await res.json()
        if (data.errors) {
            return data.errors
        }
    }
}

export const deleteProduct = (productId) => async (dispatch) => {
    const res = await fetch(`/api/products/${productId}/delete`, {
        method:"DELETE"
    })
    if(res.ok){
        dispatch(deleteProd(productId))
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
            newState = { ...state }
            newState[action.product.id] = action.product
            return newState
        case EDIT_PRODUCT:
            newState = { ...state }
            newState[action.product.id] = action.product
            return newState
        case DELETE_PRODUCT:
            newState = { ...state };
            delete newState[action.productId]
            return newState
        default:
            return state;
    }
}

export default productsReducer
