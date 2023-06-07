import React from 'react'
import "./ProductPage.css"
import OpenModalButton from '../OpenModalButton';
import UpdateProductModal from './UpdateProduct';
import DeleteProductModal from './DeleteProductModal';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import {getAllProducts} from '../../store/product.js'


function ProductDetails({ productId, visible, currentUserId}) {
  const dispatch=useDispatch()
  const products = useSelector(state => state.products);


  useEffect(()=>{
    dispatch(getAllProducts())
  },[dispatch])


  if (!visible) return null

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
      <p className="product-price">{product.price}</p>
      <span className="product-city">{product.location_city} </span>
      <span className="product-state">{product.location_state}</span>
          <p>Details</p>
          <div className="product-description">
      <p>{product.description}</p>
      </div>
      <div>
        {(currentUserId === product.user?.id) &&

          <div>
          <OpenModalButton
              buttonText="Update"
              modalComponent={<UpdateProductModal productId={product.id} />}
          />

            <OpenModalButton
                buttonText="Delete"
                modalComponent={<DeleteProductModal productId={product.id} />
                }/>
          </div>

          }

        </div>
    </div>
  )
}

export default ProductDetails;