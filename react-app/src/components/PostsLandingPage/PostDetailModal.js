import { useEffect, useState } from 'react';
import { removePost } from "../../store/posts";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import UpdatePostModal from "../UpdatePostModal";
import DeletePostModal from "../UpdatePostModal/DeletePostModal";
import DeleteCommentModal from "./DeleteCommentModal"
import { getPostComments } from '../../store/comments';
import { postComment } from '../../store/comments';
import OpenModalButton from '../OpenModalButton';
import "./PostDetailModal.css";


function PostDetailModal({ postId }) {
    const dispatch = useDispatch();
    // const { closeModal } = useModal();
    const [submitted, setSubmitted] = useState(false);
    const [text, setText] = useState('')
    const [errors, setErrors] = useState('');

    const post = useSelector(state => state.posts[postId])
    const commentObj = useSelector(state => state.comments.post);
    const comments = Object.values(commentObj)
    const user = useSelector(state => state.session.user)


    const isPostOwner = post.user.id === user.id




    useEffect(() => {
        dispatch(getPostComments(postId));

        return (() => null)
    }, [dispatch])





    const submitForm = async (e) => {
        e.preventDefault()
        setSubmitted(true)
        const formData = new FormData()
        formData.append('text', text)
        const data = await dispatch(postComment(post.id, formData));

        if(data){
            return setErrors(data[0])
        }

        if (submitted && errors) {
            console.log('errors was reset!')
            setErrors('');
        }

        setText('')
        setSubmitted(false)
    }




    if (!comments) return null;



    return (
        <div className='post-modal-house'>
            <div className='post-modal-top-bar'>
                <div className='post-modal-menu-buttons'>
                    {isPostOwner && (
                        <OpenModalButton
                            buttonText="Edit"
                            modalComponent={<UpdatePostModal postId={postId} />}
                        />
                    )}
                    {isPostOwner && (
                        <OpenModalButton
                            buttonText="Delete"
                            modalComponent={<DeletePostModal postId={postId} />}
                        />
                    )}
                </div>
                <div className='user-name'>
                    <span>{post.user.first_name} </span>
                    <span>{post.user.last_name}...</span>
                </div>
            </div>
            <div className='post-modal-text-house'>
                <p>{post.text}</p>
            </div>
            <form onSubmit={submitForm}>
                <div className='new-comment-house'>
                    <ul>
                        {errors && (
                            <p style={{ color: "red" }}>{errors}</p>
                        )}
                    </ul>
                    <textarea
                        value={text}
                        placeholder='Write a comment....'
                        required
                        onChange={(e) => setText(e.target.value)}
                        minLength={5}
                        maxLength={5000}
                    />
                    <button>Post</button>
                </div>
            </form >
            <div>
                {comments.toReversed().map(comment => {
                    let isCommentOwner = comment.user.id === user.id
                    return (
                        <div key={comment.id} className='post-modal-comment-house'>
                            <div className='modal-comment-top-bar'>
                                <span>{comment.user.first_name} </span>
                                <span>{comment.user.last_name}</span>
                            </div>
                            <div className='modal-comment-menu-buttons'>
                                {(isPostOwner || isCommentOwner) && (
                                    <OpenModalButton
                                        buttonText="Delete"
                                        modalComponent={<DeleteCommentModal commentId={comment.id} />}
                                    />
                                )}
                            </div>
                            <div className='modal-comment-text-house'>
                                <p>{comment.text}</p>
                            </div>
                        </div>
                    )
                })
                }
            </div>
        </div>


    )
}


export default PostDetailModal;
