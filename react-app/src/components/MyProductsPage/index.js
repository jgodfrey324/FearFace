import { useParams, useHistory } from "react-router-dom"
import { useEffect, useState } from 'react'
import{ useDispatch, useSelector } from 'react-redux'
import { getAllProducts } from "../../store/product"




const MyProducts = () => {
    const dispatch = useDispatch()
    const { userId } = useParams()
    const history = useHistory()
    const products = Object.values(useSelector(state => state.products))
    const myProducts = []


    useEffect(() => {
        dispatch(getAllProducts())
    }, [dispatch])



    if (!products) return null;

    for (const product of products) {
        if (product.user.id === parseInt(userId)) {
            myProducts.push(product)
        }
    }


    return (
        <div>
            <h1>This is my products!</h1>
            <button onClick={() => history.push(`/users/${userId}`)} style={{color: 'whitesmoke'}}>My Profile</button>
            <div>
                <span>
                    <button onClick={() => history.push('/marketplace')} style={{color: 'whitesmoke'}}>Marketplace</button>
                </span>
                <span>
                    <button onClick={() => history.push('/marketplace/create')} style={{color: 'whitesmoke'}}>Create Product</button>
                </span>
            </div>

            {myProducts.map((product) => {
                return (
                    <div style={{border: '1px solid white'}}>
                        <h3>{product.name}</h3>
                        <span>{product.location_city}</span>
                        <span>{product.location_state}</span>
                        <p>{product.price}</p>
                    </div>
                )
            })}
        </div>
    )
}


export default MyProducts
