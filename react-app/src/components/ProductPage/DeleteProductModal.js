import React from "react";
import { useEffect, useState } from 'react';
import { useModal } from "../../context/Modal";
import { useDispatch, useSelector } from 'react-redux';
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
        <>
            <h1>Are you sure you want to delete your product?</h1>
            <button onClick={deleteButton}>Yes (delete this product)</button>
            <button onClick={() => closeModal()}>No (don't delete)</button>
        </>
    );
}

export default DeleteProductModal;
