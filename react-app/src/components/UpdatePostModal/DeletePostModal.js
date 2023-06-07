import React from "react";
import { removePost } from "../../store/posts";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";


function DeletePostModal({ postId }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();



    const deleteButton = async (e) => {
        e.preventDefault();


        await dispatch(removePost(postId));
        closeModal();
    }



    return (
        <>
            <h1 style={{color: 'whitesmoke'}}>Are you sure you want to delete your post?</h1>
            <button onClick={deleteButton} style={{color: 'whitesmoke'}}>Yes (delete this post)</button>
            <button onClick={() => closeModal()} style={{color: 'whitesmoke'}}>No (don't delete)</button>
        </>
    );
}

export default DeletePostModal;
