import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPosts, createPost } from '../../store/posts';
import { Redirect, NavLink, useHistory} from "react-router-dom";
import OpenModalButton from '../OpenModalButton';
import { getAllProducts } from '../../store/product';
import DeleteProductModal from './DeleteProductModal';
import ProductDetails from './ProductDetail'
import './ProductPage.css'


const ProductsLanding = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const productObj = useSelector(state => state.products)
    const user = useSelector(state => state.session.user)
    const products = Object.values(productObj)

    const [sideOpen, setSideOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState({});

    // console.log("this is our products slice ===================", productObj)
    // console.log("this is our user slice ===================", user)


    useEffect(() => {
        setSideOpen(true)
    }, [selectedProduct]);



    useEffect(() => {
        if (sideOpen === false) setSelectedProduct({})
    }, [sideOpen])



    useEffect(() => {
        dispatch(getAllProducts());
    }, [dispatch])

    if (!user) {
        return <Redirect to="/login"/>
    }


    return (
        <div className='product-page-container'>
            <div className='trouble-makers'>
                <div className="marketplace-and-button">
                    <h2 style={{ color: "white" }}>MarketPlace...</h2>
                    <button style={{backgroundColor: 'whitesmoke'}} onClick={() => history.push('/marketplace/create')}>Create a new Product</button>
                </div>
                <div className='product-view'>
                    <div className='all-products-detail'>
                        {products.toReversed().map(product => {
                            return (
                                <div key={product.id} className='product-preview-tile-house'
                                    onClick={() => setSelectedProduct(product)}>
                                    <div  style={{ color: "white", border: "1px solid white" }}>
                                        <h3>{product.name}</h3>
                                        <p>From <NavLink to={`/users/${product.user.id}`}>{product.user.first_name} {product.user.last_name}</NavLink></p>
                                        <span>{product.location_city}, {product.location_state}</span>
                                        <div style={{height: '250px', border: '2px solid pink', margin: '10px 0px'}}>
                                            <p>Preview image will go here!</p>
                                        </div>
                                        <p style={{fontWeight: 'bold'}}>${parseFloat(product.price).toFixed(2)}</p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
            <div className="product-detail-sidebar">
                <div className="product-detail-sidebar-toggle-house">
                    <div className="product-side-panel-toggle"
                        onClick={() => setSideOpen(!sideOpen)}>
                        {sideOpen ? '>' : '<'}
                    </div>
                </div>
                <ProductDetails visible={sideOpen} productId={selectedProduct.id} currentUserId={user?.id} />
            </div>
        </div>
    )
}

export default ProductsLanding
