import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { useEffect } from 'react';
import OpenModalButton from '../OpenModalButton';
import UpdateProductModal from './UpdateProduct';
import DeleteProductModal from './DeleteProductModal';
import { getAllProducts } from '../../store/product.js'
import { getAllProdImages } from '../../store/product_images';
import "./ProductPage.css"



function ProductDetails({ productId, visible, currentUserId }) {
  const dispatch = useDispatch()
  const products = useSelector(state => state.products);
  // const prodImages = Object.values(useSelector(state => state.productImages))



  useEffect(() => {
    dispatch(getAllProducts());
    // dispatch(getAllProdImages());
  }, [dispatch])


  if (!visible) return null

  // if (!prodImages) return null;


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
      <h3 style={{ color: "whitesmoke" }} className="product-info">{product.name}</h3>
      <p>From <NavLink to={`/users/${product.user.id}`}>{product.user.first_name} {product.user.last_name}</NavLink></p>
      <span style={{ color: "whitesmoke" }} className="product-city">{product.location_city} </span>
      <span style={{ color: "whitesmoke" }} className="product-state">{product.location_state}</span>
      {/* {prodImages.map(image => {
        if (image.product_id === product.id) {
          return (
            <div key={image.id} >
                      <img style={{height: '400px', width: '350px', objectFit:'cover'}}src={`${image.url}`} alt='product'></img>
                  </div>
              )
            }
          })} */}
      <p>Details</p>
      <div className="product-description">
        <p>{product.description}</p>
      </div>
      <p style={{ color: "whitesmoke" }} className="product-price">$ {product.price}</p>
      <div>
        {(currentUserId === product.user?.id) &&
          < div classname="product-detail-buttons">
            <OpenModalButton style={{ color: 'whitesmoke' }}
              buttonText="Update"
              modalComponent={<UpdateProductModal productId={product.id} />}
            />

            <OpenModalButton style={{ color: 'whitesmoke' }}
              buttonText="Delete"
              modalComponent={<DeleteProductModal productId={product.id} />
              } />
          </div>

        }

      </div>
    </div >
  )
}

export default ProductDetails;
