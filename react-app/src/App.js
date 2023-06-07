import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import PostsLanding from "./components/PostsLandingPage";
import ProfilePage from "./components/ProfilePage";
import "./components/PostsLandingPage/PostsLanding.css"
import ProductsLanding from "./components/ProductPage";
import CreateProduct from "./components/ProductPage/CreateProduct";
import MyProducts from "./components/MyProductsPage";
import UpdateProduct from "./components/ProductPage/UpdateProduct";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path='/'>
            <PostsLanding />
          </Route>
          <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path="/marketplace/create">
            <CreateProduct />
          </Route>
          <Route path="/marketplace/update">
            <UpdateProduct/>
          </Route>
          <Route path="/marketplace">
            <ProductsLanding />
          </Route>
          <Route path='/users/:userId/products'>
            <MyProducts />
          </Route>
          <Route path='/users/:userId'>
            <ProfilePage />
          </Route>
          <Route>
            <h1 id="wrong">Turn around...</h1>
            <div className="frame-container">
              <img id="tv" src="https://i.imgur.com/PIS3I3P.png"></img>
              <iframe src="https://giphy.com/embed/r4OLGW3irym6k" width="480" height="309" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>
            </div>
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
