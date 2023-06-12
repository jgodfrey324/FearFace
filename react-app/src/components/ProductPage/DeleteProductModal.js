import React from "react";
import { useModal } from "../../context/Modal";
import { useDispatch } from 'react-redux';
// import "./LoginForm.css";
import { deleteProduct } from "../../store/product";



function DeleteProductModal({ productId }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();



    const deleteButton = async (e) => {
        e.preventDefault();

        await dispatch(deleteProduct(productId));
        closeModal();
    }



    return (
        <div className="my-product-delete">
            <h1 style={{ color: '#d4bebe' }}>Are you sure you want to delete your product?</h1>
            <button onClick={deleteButton} style={{ color: '#d4bebe' }}>Yes (delete this product)</button>
            <button style={{ color: '#d4bebe' }} onClick={() => closeModal()}>No (don't delete)</button>
        </div>
    );
}

export default DeleteProductModal;
