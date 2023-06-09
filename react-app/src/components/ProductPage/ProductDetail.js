import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { useEffect } from 'react';
// import OpenModalButton from '../OpenModalButton';
// import UpdateProductModal from './UpdateProduct';
// import DeleteProductModal from './DeleteProductModal';
import { getAllProducts } from '../../store/product.js'
import { getAllProdImages } from '../../store/product_images';
import "./ProductPage.css"



function ProductDetails({ productId, visible, currentUserId }) {
  const dispatch = useDispatch()
  const products = useSelector(state => state.products);
  const prodImages = Object.values(useSelector(state => state.productImages))
  const history = useHistory()



  useEffect(() => {
    dispatch(getAllProducts());
    dispatch(getAllProdImages());
  }, [dispatch])


  if (!visible) return null

  if (!prodImages) return null;


  const product = products[productId]



  if (!product) return (
    <div className="product-details">
      <p className="product-info">Welcome to FearFace Marketplace!</p>
      <p>In the shadows of the marketplace, a mysterious treasure awaits, poised to captivate its unsuspecting buyer.</p>
      <p>Please select an artifact for your collection</p>
    </div>
  )


  return (
    <div className="product-details">
      <h3 className="product-info">{product.name}</h3>
      <p>From <NavLink to={`/users/${product.user.id}`}>{product.user.first_name} {product.user.last_name}</NavLink></p>
      <span className="product-city">{product.location_city}, </span>
      <span className="product-state">{product.location_state}</span>
      {prodImages.map(image => {
        if (!image.product_id) {
          return (
              <div className="pr-image" key={image.id} >
                  <img src={`https://media.discordapp.net/attachments/1113249761743618210/1116896594177048657/img-coming-removebg-preview.png?width=714&height=692`} alt='product'></img>
              </div>
          )
      }
        if (image.product_id === product.id) {
          return (
            <div className="sb-img-room" key={image.id} >
                      <img id="sb-img" style={{height: '400px', width: '350px', objectFit:'cover'}}src={`${image.url}`} alt='product'></img>
                  </div>
              )
            }
          })}
      <div className="product-description">
        <p>{product.description}</p>
      </div>
      <p className="product-price">$ {product.price.toFixed(2)}</p>
      <div className='mp-btn-container'>
        {(currentUserId === product.user?.id) &&
          <button className="mp-btn"onClick={() => history.push(`/users/${currentUserId}/products`)}>Manage Product</button>

        }

      </div>
    </div >
  )
}

export default ProductDetails;
