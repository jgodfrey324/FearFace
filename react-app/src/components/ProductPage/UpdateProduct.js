import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateProduct } from '../../store/product';
import { getAllProducts } from '../../store/product';
import { useModal } from "../../context/Modal";
import './CreateProduct.css'



const UpdateProductModal = ({productId}) => {
    const dispatch = useDispatch()
    const { closeModal } = useModal();
    // const user = useSelector(state=> state.session.user)


    const productObj = useSelector(state => state.products)

    const products = Object.values(productObj)
    const currentProduct = products.find(product => product.id === productId)


    const [name, setName] = useState(currentProduct.name)
    const [city, setCity] = useState(currentProduct.location_city)
    const [state, setState] = useState(currentProduct.location_state)
    const [price, setPrice] = useState(currentProduct.price)
    const [description, setDescription] = useState(currentProduct.description)
    const [errors, setErrors] = useState({})
    const [submitted, setSubmitted] = useState(false);






    useEffect(() => {
        // dispatch(getAllProducts())
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

      e.preventDefault()

      setSubmitted(true)

      const formData = new FormData()
      formData.append("name", name)
      formData.append("location_city", city)
      formData.append("location_state", state)
      formData.append("price", price)
      formData.append("description", description)


      if (!Object.values(errors).length) {
          await dispatch(updateProduct(productId,formData)).then(()=> dispatch(getAllProducts()))
          closeModal()
        }

  }



    return (
        <div className='update-form-container'>
            <div className='prod-form-bg'>
            <form className="prod-form" onSubmit={submitForm} style={{color: 'white'}}>

                <i onClick={() => closeModal()} class="fa-solid fa-skull-crossbones"></i>

                <h2>Update Product</h2>
                <div className="update-prod-house">
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
                </div>
                <div className='update-prod-btn-container'>
                <button type="submit" className='update-prod-btn'>Submit</button>
                </div>
            </form >
            </div>
        </div>
)

}

export default UpdateProductModal
