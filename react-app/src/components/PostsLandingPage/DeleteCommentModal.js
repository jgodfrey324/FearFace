import React from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
// import "./LoginForm.css";
import { deleteComment } from "../../store/comments";


function DeleteCommentModal({ commentId }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();



    const deleteButton = async (e) => {
        e.preventDefault();

        await dispatch(deleteComment(commentId));
        closeModal();
    }



    return (
        <>
            <h1 style={{ color: '#d4bebe' }}>Are you sure you want to delete your comment?</h1>
            <button onClick={deleteButton} style={{ color: '#d4bebe' }}>Yes (delete this comment)</button>
            <button onClick={() => closeModal()} style={{ color: '#d4bebe' }}>No (don't delete)</button>
        </>
    );
}

export default DeleteCommentModal;
