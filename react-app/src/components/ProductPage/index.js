import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, NavLink, useHistory} from "react-router-dom";
import { getAllProducts } from '../../store/product';
import { getAllProdImages } from '../../store/product_images';
import ProductDetails from './ProductDetail'
import './ProductPage.css'


const ProductsLanding = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const productObj = useSelector(state => state.products)
    const user = useSelector(state => state.session.user)
    const prodImages = Object.values(useSelector(state => state.productImages))

    const [sideOpen, setSideOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState({});



    useEffect(() => {
        // setSideOpen(true)
        if (sideOpen === false && selectedProduct){
        setSideOpen(true)
        }
    }, [selectedProduct]);



    // useEffect(() => {
    //     if (sideOpen === false) setSelectedProduct({})
    // }, [sideOpen])



    useEffect(() => {
        dispatch(getAllProducts());
        dispatch(getAllProdImages());
    }, [dispatch])

    if (!user) {
        return <Redirect to="/login"/>
    }



    if (!productObj) return null;

    if (!prodImages) return null;

    const products = Object.values(productObj)



    return (
        <div className='product-page-container'>
            <div className='trouble-makers'>
                <div className="marketplace-and-button">
                    <h2 style={{ color: "white" }}>MarketPlace...</h2>
                    <button onClick={() => history.push('/marketplace/create')}>Create a new Product</button>
                </div>
                <div className='product-view'>
                    <div className='all-products-detail'>
                        {products.toReversed().map(product => {
                            return (
                                <div key={product.id} className='product-preview-tile-house'
                                    onClick={() => setSelectedProduct(product)}
                                    >
                                    <div  style={{ color: "white", border: "1px solid white" }}>
                                        <h3>{product.name}</h3>
                                        <p>From <NavLink to={`/users/${product.user.id}`}>{product.user.first_name} {product.user.last_name}</NavLink></p>
                                        <span>{product.location_city}, {product.location_state}</span>
                                        {prodImages.map(image => {
                                            if (image.product_id === product.id) {
                                                return (
                                                    <div key={image.id} >
                                                        <img style={{height: '100px', width: '100px'}}src={`${image.url}`} alt='product'></img>
                                                    </div>
                                                )
                                            }
                                        })}
                                        <p style={{fontWeight: 'bold'}}>$ {parseFloat(product.price).toFixed(2)}</p>
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
                        {console.log("after click==========================================", sideOpen)}
                        {sideOpen ? '>' : '<'}
                    </div>
                </div>
                <ProductDetails visible={sideOpen} productId={selectedProduct.id} currentUserId={user?.id} />
            </div>
        </div>
    )
}

export default ProductsLanding
