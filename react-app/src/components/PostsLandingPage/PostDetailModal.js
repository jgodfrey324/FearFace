import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from 'react-router-dom';
import UpdatePostModal from "../UpdatePostModal";
import DeletePostModal from "../UpdatePostModal/DeletePostModal";
import DeleteCommentModal from "./DeleteCommentModal"
import { getComments } from '../../store/comments';
import { postComment } from '../../store/comments';
import OpenModalButton from '../OpenModalButton';
import { getAllPostImages } from '../../store/post_images';
import EditDeleteDrop from './EditDeleteDrop';
import "./PostDetailModal.css";
import { useModal } from '../../context/Modal';


function PostDetailModal({ postId }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const [submitted, setSubmitted] = useState(false);
    const [text, setText] = useState('')
    const [errors, setErrors] = useState('');

    const post = useSelector(state => state.posts[postId])
    const comments = Object.values(useSelector(state => state.comments));
    // const comments = Object.values(commentObj)
    const user = useSelector(state => state.session.user)
    const postImages = Object.values(useSelector(state => state.postImages))



    useEffect(() => {
        dispatch(getComments());
        dispatch(getAllPostImages());
        // return (() => null)
    }, [dispatch])





    const submitForm = async (e) => {
        e.preventDefault()
        setSubmitted(true)
        const formData = new FormData()
        formData.append('text', text)
        const data = await dispatch(postComment(post.id, formData));

        if (data.errors) {
            return setErrors(data.errors[0])
        }

        if (submitted && errors) {
            console.log('errors was reset!')
            setErrors('');
        }

        setText('')
        setSubmitted(false)
    }



    // if (!comments) return null;

    if (!post) return null;

    if (!comments) return null;

    if (!postImages) return null;

    // const postImage = postImages[post.id]

    // if (!postImage) return null;

    const postComments = []

    for (const comment of comments) {
        if (comment.post_id === postId) {
            postComments.push(comment)
        }
    }


    const isPostOwner = post.user.id === user.id


    return (
        <div className='post-modal-house'>
            {/* {console.log('am i being pranked ????????????')} */}
            <div className='post-modal-top-bar'>
                <div className='post-modal-menu-buttons'>
                    {isPostOwner && (
                        // <EditDeleteDrop user={user} postId={post.id}
                        // />

                        <OpenModalButton
                            buttonText={<i className="fa-regular fa-pen-to-square"></i>}
                            modalComponent={<UpdatePostModal postId={postId} />}
                        />
                    )}
                    {isPostOwner && (
                        <OpenModalButton
                            buttonText={<i className="fa-solid fa-trash"></i>}
                            modalComponent={<DeletePostModal postId={postId} />}
                        />
                    )}
                    <i onClick={() => closeModal()} class="fa-solid fa-skull-crossbones"></i>
                </div>
                <div className='user-name' onClick={() => closeModal()}>
                    <img src={post.user.profile_pic} alt='user'></img>
                    <NavLink to={`/users/${post.user.id}`}>{post.user.first_name} {post.user.last_name}</NavLink>
                </div>
            </div>
            {/* {console.log('right above image map ===============> ')} */}
            {postImages.map(image => {
                // console.log(typeof postId, '---------------------------------')
                // console.log(image.post_id, '---------------------------------------')
                if (image.post_id === postId) {
                    return (
                        <div key={image.id} className='detail-image-house'>
                            <img src={`${image.url}`} alt='post'></img>
                        </div>
                    )
                }
            })}
            <div className='post-modal-text-house'>
                <p>{post.text}</p>
            </div>
            {/* <form onSubmit={submitForm}>
                <div className='new-comment-house'>
                    <ul>
                        {errors && (
                            <p style={{ color: "red" }}>{errors}</p>
                        )}
                    </ul>
                    <div id="update-comment-textarea">
                        <div id="comment-area">
                            <textarea
                                style={{ color: 'whitesmoke' }}
                                value={text}
                                placeholder='Write a comment....'
                                required
                                onChange={(e) => setText(e.target.value)}
                                minLength={5}
                                // maxLength={5000}
                                rows={5}
                            />
                        </div>
                        <div id="comment-button">
                            <button style={{ color: "whitesmoke" }}><i class="fa-solid fa-skull"></i></button>
                        </div>
                    </div>
                </div>
            </form > */}
            <div className='comment-box'>
                {postComments.map(comment => {
                    let isCommentOwner = comment.user.id === user.id
                    return (
                        <div key={comment.id} className='post-modal-comment-house'>
                            <div id="comment-div">
                                <div id="comment-name-delete">
                                    <div className='modal-comment-top-bar'>
                                        <NavLink to={`/user/${comment.user.id}`}>{comment.user.first_name} {comment.user.last_name}</NavLink>
                                    </div>
                                    <div className='modal-comment-menu-buttons'>
                                        {(isPostOwner || isCommentOwner) && (
                                            <OpenModalButton
                                                buttonText={<i className="fa-solid fa-skull-crossbones"></i>}
                                                modalComponent={<DeleteCommentModal commentId={comment.id} />}
                                            />
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className='modal-comment-text-house'>
                                <p>{comment.text}</p>
                            </div>
                        </div>
                    )
                })
                }
            </div>
            <form onSubmit={submitForm}>
                <div className='new-comment-house'>
                    <ul>
                        {errors && (
                            <p style={{ color: "red" }}>{errors}</p>
                        )}
                    </ul>
                    <div id="update-comment-textarea">
                        <div id="comment-area">
                            <textarea
                                style={{ color: 'whitesmoke' }}
                                value={text}
                                placeholder='Write a comment....'
                                required
                                onChange={(e) => setText(e.target.value)}
                                minLength={5}
                                // maxLength={5000}
                                rows={5}
                            />
                        </div>
                        <div id="comment-button">
                            <button style={{ color: "whitesmoke" }}><i class="fa-solid fa-skull"></i></button>
                        </div>
                    </div>
                </div>
            </form >
        </div >


    )
}


export default PostDetailModal;
