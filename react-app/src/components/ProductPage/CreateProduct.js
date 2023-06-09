import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from "react-router-dom";
import { createProductThunk } from '../../store/product';
import { createProdImage } from '../../store/product_images';
// import { FileInput, FileField } from 'react-admin'
import './CreateProduct.css'


const CreateProduct = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    const [name, setName] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [price, setPrice] = useState("")
    const [description, setDescription] = useState("")
    const [errors, setErrors] = useState({})
    const [submitted, setSubmitted] = useState(false);
    const [imageLoading, setImageLoading] = useState(false);
    const [image, setImage] = useState(null);

    const user = useSelector(state => state.session.user)

    const reset = () => {
        setName("")
        setCity("")
        setState("")
        setDescription("")
        setPrice("")
    }

    useEffect(() => {
        const error = {}
        if (!name) error.name = "Name is required"
        if (!city) error.city = "City is required"
        if (!state) error.state = "State is required"
        if (!price) error.price = "Price is required"
        if (+price <= 0) error.price = "Price must be greater than 0"
        if (!(+price)) error.price = 'Price must be valid number'
        if (!description) error.description = "description is required"
        setErrors(error)
    }, [name, city, state, price, description])



    const submitForm = async (e) => {
        // console.log("is this submitting =====================================================")
        e.preventDefault()

        setSubmitted(true);
        setImageLoading(true);

        const formData = new FormData()
        formData.append("name", name)
        formData.append("location_city", city)
        formData.append("location_state", state)
        formData.append("price", price)
        formData.append("description", description)
        // formData.append("preview_image", prevImage)

        const formImageData = new FormData()
        formImageData.append("file", image);



        if (!Object.values(errors).length) {
            const data = await dispatch(createProductThunk(formData))

            if (image) {
                dispatch(createProdImage(data.id, formImageData))
            }

            history.push('/marketplace')
            reset()
        }


    }




    if (!user) {
        return <Redirect to="/login" />
    }


    // if (imageLoading) {
    //     return <h1>...Loading</h1>
    // }



    return (
        <div className='product-form-container'>
            <h1 style={{ color: 'whitesmoke' }}>Create a new product!</h1>
            <button className='market-btn' onClick={() => history.push('/marketplace')}>Marketplace</button>
            <div className='prod-form-bg'>
            <form className="prod-form" onSubmit={submitForm} style={{ color: 'white' }}>
                <div className="new-prod-house">
                    <label>
                        <div>Name</div>
                        {errors.name && submitted && < p style={{ color: "red" }}>{errors.name}</p>}
                        <input
                            id="p-name"
                            placeholder="Name..."
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        ></input>
                    </label>
                    <label>
                        <div>City</div>
                        {errors.city && submitted && < p style={{ color: "red" }}>{errors.city}</p>}
                        <input
                            id="p-city"
                            placeholder="City..."
                            type="text"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                        ></input>
                    </label>

                    <label>
                        <div>State</div>
                        {errors.state && submitted && < p style={{ color: "red" }}>{errors.state}</p>}
                        <input
                            id="p-state"
                            placeholder="State..."
                            type="text"
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                        ></input>
                    </label>
                    <label>
                        <div>Description</div>
                        {errors.description && submitted && < p style={{ color: "red" }}>{errors.description}</p>}
                        <textarea
                            id="p-descrip"
                            placeholder="Write a description..."
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </label>
                    <label>
                        <div>Price</div>
                        {errors.price && submitted && < p style={{ color: "red" }}>{errors.price}</p>}
                        <input
                            id="p-price"
                            placeholder="$"
                            type="text"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        ></input>
                    </label>
                    <label>
                        <div>Add Image</div>
                        <button
                            onClick={() => window.alert("Feature coming soon...")}
                        >Choose File</button>
                    </label>
                </div>
                <button style={{ color: 'whitesmoke' }} type="submit">Submit</button>
            </form >
            </div>
        </div >
    )
}

export default CreateProduct
