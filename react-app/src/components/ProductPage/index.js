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

    const [sideOpen, setSideOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState({});

    const prodImagesObj = useSelector(state => state.productImages)


    useEffect(() => {
        // setSideOpen(true)
        if (sideOpen === false && selectedProduct){
        setSideOpen(true)
        }
    }, [selectedProduct]);




    useEffect(() => {
        dispatch(getAllProducts());
        dispatch(getAllProdImages())
    }, [dispatch])

    if (!user) {
        return <Redirect to="/login"/>
    }



    if (!productObj) return null;


    const products = Object.values(productObj)

    const prodImages = Object.values(prodImagesObj)



    return (
        <div className='product-page-container'>
            <div className='trouble-makers'>
                <div className="marketplace-and-button">
                    <img id="mplace-logo"src="https://i.imgur.com/7xrEmmi.png" alt='marketplace'></img>
                    <button onClick={() => history.push('/marketplace/create')}>Create new listing</button>
                </div>
                <div className='product-view'>
                    <div className='all-products-detail'>
                        {products.toReversed().map(product => {
                            return (
                                <div key={product.id} className='product-preview-tile-house'
                                    onClick={() => setSelectedProduct(product)}
                                    >
                                    <div className="product-tile">
                                        {prodImages.map(image => {
                                            if (image.product_id === product.id) {
                                                return (
                                                    <div className="pr-image" key={image.id} >
                                                        <img src={`${image.url}`} alt='product'></img>
                                                    </div>
                                                )
                                            }
                                        })}
                                        <h3 className="inner-prod">{product.name}</h3>
                                        <p className="inner-prod" id="owner">From <NavLink to={`/users/${product.user.id}`}>{product.user.first_name} {product.user.last_name}</NavLink></p>
                                        <span className="inner-prod">{product.location_city}, {product.location_state}</span>
                                        <p className="inner-prod" style={{fontWeight: 'bold'}}>$ {parseFloat(product.price).toFixed(2)}</p>
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
