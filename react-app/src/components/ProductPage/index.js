import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPosts, createPost } from '../../store/posts';
import { Redirect, NavLink } from "react-router-dom";
import OpenModalButton from '../OpenModalButton';
import { getAllProducts } from '../../store/product';



const ProductsLanding = () => {
    const dispatch = useDispatch()
    const productObj = useSelector(state => state.products)
    const user = useSelector(state => state.session.user)
    const products = Object.values(productObj)

    // console.log("this is our products slice ===================", productObj)
    // console.log("this is our user slice ===================", user)

    useEffect(() => {
        dispatch(getAllProducts());

    }, [dispatch])

    return (
        <div className='product-page-container'>
            <h2 style={{ color: "white" }}>MarketPlace...</h2>
            <div className='all-products-detail'>
                {products.map((product) => {
                    return (
                        <div key={product.id} style={{ color: "white", border: "1px solid red" }}>
                            {product.name}, {product.location_city}, {product.location_state}, {product.description}, {product.price}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default ProductsLanding
