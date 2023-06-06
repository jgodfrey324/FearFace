import React from "react";
import { removePost } from "../../store/posts";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";


function DeletePostModal({ postId, setter }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();



    const deleteButton = async (e) => {
        e.preventDefault();

        setter(true);

        await dispatch(removePost(postId));
        closeModal();
    }



    return (
        <>
            <h1>Are you sure you want to delete your post?</h1>
            <button onClick={deleteButton}>Yes (delete this post)</button>
            <button onClick={() => closeModal()}>No (don't delete)</button>
        </>
    );
}

export default DeletePostModal;
