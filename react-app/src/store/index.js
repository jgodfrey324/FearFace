import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import session from './session';
import postsReducer from './posts';
import commentReducer from './comments'
import productsReducer from './product';
import productImagesReducer from './product_images';
import postImagesReducer from './post_images';

const rootReducer = combineReducers({
  session,
  posts: postsReducer,
  comments: commentReducer,
  products: productsReducer,
  productImages: productImagesReducer,
  postImages: postImagesReducer
});


let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
