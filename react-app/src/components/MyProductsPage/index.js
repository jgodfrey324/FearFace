import { useParams, useHistory, Redirect } from "react-router-dom"
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProducts } from "../../store/product"
import { getAllProdImages } from '../../store/product_images';
import OpenModalButton from '../OpenModalButton';
import DeleteProductModal from "../ProductPage/DeleteProductModal.js";
import UpdateProductModal from "../ProductPage/UpdateProduct";
import './MyProduct.css'



const MyProducts = () => {
    const dispatch = useDispatch()
    const { userId } = useParams()
    const history = useHistory()
    const products = Object.values(useSelector(state => state.products))
    const myProducts = []
    const user = useSelector(state => state.session.user)
    const prodImages = Object.values(useSelector(state => state.productImages))


    useEffect(() => {
        dispatch(getAllProducts());
        dispatch(getAllProdImages());
    }, [dispatch])


    if (!user) {
        return <Redirect to="/login"/>
    }

    if (!products) return null;

    if (!prodImages) return null;



    for (const product of products) {
        if (product.user.id === parseInt(userId)) {
            myProducts.push(product)
        }
    }



    return (
        <div className="my-products-house">
            <h1>Products:</h1>
            <div className="create-button">
                <button onClick={() => history.push('/marketplace/create')}>Create Product</button>
            </div>
            <div className="side-bar-buttons">
                <button onClick={() => history.push(`/users/${userId}`)}>My Profile</button>
                <button onClick={() => history.push('/marketplace')}>Marketplace</button>
            </div>
            <div className="all-products-house">
                {myProducts.toReversed().map((product) => {
                    return (
                        <div key={product.id} className="product-house" onClick={() => history.push(`/marketplace`)}>
                            <div className="my-product-top-bar">
                                <div className="product-buttons-house">
                                    <OpenModalButton
                                        buttonText="Delete"
                                        modalComponent={<DeleteProductModal productId={product.id} />
                                        } />
                                    <OpenModalButton
                                        buttonText="Update"
                                        modalComponent={<UpdateProductModal productId={product.id} />}
                                    />
                                </div>
                                <h3>{product.name}</h3>
                            </div>
                                <p>{product.location_city}, {product.location_state}</p>
                                <div className="my-product-image">
                                    {prodImages.map(image => {
                                        if (image.product_id === product.id) {
                                            return (
                                            <img key={image.id} src={`${image.url}`} alt='product'></img>
                                            )
                                        }
                                    })}
                                </div>
                                <div className="my-product-description">
                                    <p>{product.description}</p>
                                </div>
                                <p className="my-product-price">$ {product.price.toFixed(2)}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}


export default MyProducts
