import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPosts, createPost } from '../../store/posts';
import { useHistory } from 'react-router-dom';
import { Redirect } from "react-router-dom";
import OpenModalButton from '../OpenModalButton';
import UpdatePostModal from '../UpdatePostModal';
import DeletePostModal from '../UpdatePostModal/DeletePostModal';


const PostsLanding = () => {
    const dispatch = useDispatch()
    const posts = Object.values(useSelector(state => state.posts));

    const user = useSelector(state => state.session);

    const [text, setText] = useState('')
    const [url, setUrl] = useState('')
    const [errors, setErrors] = useState('');
    const [submitted, setSubmitted] = useState(false)
    const [isUpdated, setIsUpdated] = useState(false)
    const [isDeleted, setIsDeleted] = useState(false)


    const submitForm = async (e) => {
        e.preventDefault()

        setSubmitted(true)

        const formData = new FormData()
        formData.append("text", text)

        const data = await dispatch(createPost(formData))

        if (data) {
            return setErrors(data[0]);
        }

        if (submitted && errors) {
            console.log('errors was reset!')
            setErrors('');
        }

        reset()
    }


    useEffect(() => {
        dispatch(getAllPosts());
        setIsUpdated(false);
        setIsDeleted(false);
    }, [dispatch, submitted, isUpdated, isDeleted]);



    const reset = () => {
        setText('');
        setUrl('');
        setSubmitted(false);
    }


    if (!user.user) {
        return <Redirect to="/login" />
    }


    if (!posts) return null;

    return (
        <div>
            <h1>FearFace landing page...</h1>
            <form onSubmit={submitForm}>
                <div style={{ border: '2px solid green', marginBottom: '20px' }}>
                    <h2>Make a new post!</h2>
                    <ul>
                        {errors && (
                            <p style={{ color: "red" }}>{errors}</p>
                        )}
                    </ul>
                    <textarea
                        style={{ height: '200px', width: '800px' }}
                        value={text}
                        placeholder='Write your status here....'
                        required
                        onChange={(e) => setText(e.target.value)}
                        minLength={5}
                        maxLength={5000}
                    />
                    <div style={{ marginTop: '20px' }}>
                        <button style={{ padding: '10px 20px' }}>Post</button>
                    </div>
                </div>
            </form >
            {
                posts.toReversed().map(post => {
                    let isCurrentUsers = post.user.id === user.user.id;
                    const comments = Object.values(post.comments)
                    return (
                        <div key={post.id} style={{ border: '1px solid black', marginBottom: '10px' }}>
                            {isCurrentUsers && (
                                <OpenModalButton
                                    buttonText="Edit"
                                    modalComponent={<UpdatePostModal setter={setIsUpdated} postId={post.id} />}
                                />
                            )}
                            {isCurrentUsers && (
                                <OpenModalButton
                                    buttonText="Delete"
                                    modalComponent={<DeletePostModal setter={setIsDeleted} postId={post.id} />}
                                />
                            )}
                            <span>{post.user.first_name} </span>
                            <span>{post.user.last_name}...</span>
                            <p>{post.text}</p>
                            <div>
                                {comments.toReversed().map(comment => {
                                    return (
                                        <div key={comment.id} style={{ border: '1px solid red', fontSize: '12px' }}>
                                            <span>{comment.user.first_name} </span>
                                            <span>{comment.user.last_name}</span>
                                            <p>{comment.text}</p>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    )
                })
            }
        </div >
    )





}


export default PostsLanding;
