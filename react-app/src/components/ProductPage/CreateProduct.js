import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPosts, createPost } from '../../store/posts';
import { Redirect, NavLink, useHistory } from "react-router-dom";
import { createProductThunk } from '../../store/product';
import { createProdImage } from '../../store/product_images';
// import { FileInput, FileField } from 'react-admin'


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


    if(imageLoading) {
        return <h1>...Loading</h1>
    }



    return (
        <div className='form-container'>
            <h1 style={{color: 'whitesmoke'}}>Create a new product!</h1>
<<<<<<< HEAD
            <button onClick={() => history.push('/marketplace')}
                style={{backgroundColor: 'whitesmoke'}}>Marketplace</button>
            <form className="prod-form" onSubmit={submitForm} style={{color: 'white'}} encType="multipart/form-data">
=======
            <button onClick={() => history.push('/marketplace')}>Marketplace</button>
            <form className="prod-form" onSubmit={submitForm} style={{color: 'white'}}>
>>>>>>> 1b9c3f42d2a546412b98f719d8a2c201a46a21a3
                <div className="new-prod-house">
                    <label>
                        <div>Name</div>
                        {errors.name && submitted && < p style={{ color: "red" }}>{errors.name}</p>}
                        <input
                            // required
                            style={{color: 'whitesmoke'}}
                            id="p-name"
                            placeholder="Name..."
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        ></input>
                    </label>
                    <label>
                        <div style={{ color: 'whitesmoke' }}>City</div>
                        {errors.city && submitted && < p style={{ color: "red" }}>{errors.city}</p>}
                        <input
                            style={{color: 'whitesmoke'}}
                            id="p-city"
                            placeholder="City..."
                            type="text"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                        ></input>
                    </label>

                    <label>
                        <div style={{ color: 'whitesmoke' }}>State</div>
                        {errors.state && submitted && < p style={{ color: "red" }}>{errors.state}</p>}
                        <input
                            style={{color: 'whitesmoke'}}
                            id="p-state"
                            placeholder="State..."
                            type="text"
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                        ></input>
                    </label>
                    <label>
                        <div style={{ color: 'whitesmoke' }}>Description</div>
                        {errors.description && submitted && < p style={{ color: "red" }}>{errors.description}</p>}
                        <textarea
                            style={{color: 'whitesmoke'}}
                            id="p-descrip"
                            placeholder="Write a description..."
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </label>
                    <label>
                        <div style={{ color: 'whitesmoke' }}>Price</div>
                        {errors.price && submitted && < p style={{ color: "red" }}>{errors.price}</p>}
                        <input
                            style={{color: 'whitesmoke'}}
                            id="p-price"
                            placeholder="$"
                            type="text"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        ></input>
                    </label>
                    <label>
                        <div>Add Image</div>
                        <input
                            type='file'
                            accept='image/*'
                            onChange={(e) => setImage(e.target.files[0])}
                        ></input>
                    </label>
                </div>
                <button style={{ color: 'whitesmoke' }} type="submit">Submit</button>
            </form >
        </div >
    )
}

export default CreateProduct
