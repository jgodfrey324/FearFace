import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { removePost } from "../../store/posts";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { useHistory, Redirect } from 'react-router-dom';
import "./LoginForm.css";
import { deletePost } from "../../store/posts";

function DeletePostModal({ postId, setter }) {
    const current_post = useSelector(state => state.posts[postId])
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const [isDeleted, setIsDeleted] = useState(false)


    // useEffect(() => {
    //     dispatch(getAllPosts());
    //     setIsDeleted(false);
    // }, [dispatch, isDeleted]);


    const deleteButton = async (postId) => {
        // dispatch(getAllPosts())
        // dispatch(removePost(current_post.id));

        const response = await fetch(`/api/posts/${postId}/delete`, {
            method: "DELETE"
        })
        if (response.ok) {
            dispatch(deletePost(postId))
        }

        return closeModal()
    }


    // const handleDelete = async (e) => {
    //     e.preventDefault();
    //     return dispatch(deleteReview(reviewId))
    //             .then(setDeleted(true))
    //             .then(closeModal());
    // };

    return (
        <>
            <h1>Are you sure you want to delete your post?</h1>
            <button onClick={() => deleteButton(postId)}>Yes (delete this post)</button>
            <button onClick={() => closeModal()}>No (don't delete)</button>
        </>
    );
}

export default DeletePostModal;
