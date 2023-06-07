import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPosts, createPost } from '../../store/posts';
import { Redirect, NavLink, useHistory} from "react-router-dom";
import OpenModalButton from '../OpenModalButton';
import { getAllProducts } from '../../store/product';
import DeleteProductModal from './DeleteProductModal';


const ProductsLanding = () => {
    const dispatch = useDispatch()
    const history = useHistory()
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
            <button style={{backgroundColor: 'whitesmoke', padding: '10px'}} onClick={() => history.push('/marketplace/create')}>Create a new Product</button>
            <div className='all-products-detail'>
                {products.map(product => {
                    const isCurrentUsers = product.user.id === user.id;
                    return (
                        <div>
                            <div key={product.id} style={{ color: "white", border: "1px solid white" }}>
                                <h3>{product.name}</h3>
                                <span>{product.location_city}, {product.location_state}</span>
                                <div style={{height: '250px', border: '2px solid pink', margin: '10px 0px'}}>
                                    <p>Preview image will go here!</p>
                                </div>
                                <p style={{margin: '15px 0px'}}>{product.description}</p>
                                <p style={{fontWeight: 'bold'}}>${parseFloat(product.price).toFixed(2)}</p>
                            </div>

                            {isCurrentUsers && (
                                    <OpenModalButton
                                        buttonText="Delete"
                                        modalComponent={<DeleteProductModal productId={product.id}/>}
                                    />
                            )}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default ProductsLanding
