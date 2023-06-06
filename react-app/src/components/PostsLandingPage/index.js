import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPosts, createPost } from '../../store/posts';
import { Redirect, NavLink } from "react-router-dom";
import OpenModalButton from '../OpenModalButton';
import UpdatePostModal from '../UpdatePostModal';
import DeletePostModal from '../UpdatePostModal/DeletePostModal';
import PostDetailModal from './PostDetailModal';
import './PostsLanding.css';
import { getUserDetail } from '../../store/session';


const PostsLanding = () => {
    const dispatch = useDispatch()
    const posts = Object.values(useSelector(state => state.posts));

    const user = useSelector(state => state.session.user);
    const user_details = useSelector(state => state.session.user_details);


    console.log('current user from session state on landing page ================> ', user);


    const [text, setText] = useState('');
    const [url, setUrl] = useState('');
    const [errors, setErrors] = useState('');
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        dispatch(getAllPosts());
        dispatch(getUserDetail(user?.id))
    }, [dispatch, user?.id]);



    const reset = () => {
        setText('');
        setUrl('');
        setSubmitted(false);
    }


    const submitForm = async (e) => {
        e.preventDefault();

        setSubmitted(true);

        const formData = new FormData();
        formData.append("text", text);

        const data = await dispatch(createPost(formData));
        // if data is sent back set errors to the data
        if (data) {
            // return out and display errors on form
            return setErrors(data[0]);
        }
        if (submitted && errors) {
            console.log('errors was reset!')
            setErrors('');
        }

        // reset fields
        reset()
    }


    // if user isn't logged in then redirect to log in form
    if (!user) {
        return <Redirect to="/login" />
    }
    // wait for posts to load
    if (!posts) return null;
    // wait for user details
    if (!user_details) return null;
    // make friends object
    const friends = user_details[user.id]['is_following']
    console.log('friends on landing page ============================> ', friends);



    return (
        <div className='landing-house'>
            <div className="logo-container">
            <img id="logo" src="https://i.imgur.com/rwR3GBq.png"></img>
            </div>
            <div>
                {Object.values(friends).map((friend) => {
                    return (
                        <div key={friend.id} style={{border: '1px solid black'}}>
                            <NavLink to={`/users/${friend.id}`}>{friend.first_name} {friend.last_name}</NavLink>
                        </div>
                    )
                })}
            </div>
            <form id="lp-form"onSubmit={submitForm}>
                <div className='new-post-house'>
                    <img id="make-post" src="https://i.imgur.com/ERn5sIv.png"></img>
                    <ul>
                        {errors && (
                            <p style={{ color: "red" }}>{errors}</p>
                        )}
                    </ul>
                    <textarea
                        style={{color: '#d4bebe'}}
                        value={text}
                        placeholder='Write your status here....'
                        required
                        onChange={(e) => setText(e.target.value)}
                        minLength={5}
                        maxLength={5000}
                    />
                    <button disabled={text.length < 5} className={text.length < 5 ? 'offbtn' : 'onbtn'}>P o s t</button>
                </div>
            </form >
            {posts.toReversed().map(post => {
                const isCurrentUsers = post.user.id === user.id;
                return (
                    <div key={post.id} className='post-house'>
                        <div className='post-top-bar'>
                            <div className='post-menu-buttons'>
                                {isCurrentUsers && (
                                    <OpenModalButton
                                        buttonText="Edit"
                                        modalComponent={<UpdatePostModal postId={post.id} />}
                                    />
                                )}
                                {isCurrentUsers && (
                                    <OpenModalButton
                                        buttonText="Delete"
                                        modalComponent={<DeletePostModal postId={post.id} />}
                                    />
                                )}
                            </div>
                            <div className='user-name'>
                                <span>{post.user.first_name} </span>
                                <span>{post.user.last_name}...</span>
                            </div>
                        </div>
                        <div className='post-text-house'>
                            <p>{post.text}</p>
                        </div>
                        <div className="lp-comments">
                            <OpenModalButton
                                buttonText="Comments"
                                modalComponent={<PostDetailModal postId={post.id} />}
                            />
                            {Object.values(post.comments).length > 0 && (
                                <span> {Object.values(post.comments).length}</span>
                            )}

                        </div>
                    </div>
                )
            })
            }
        </div>
    )
}


export default PostsLanding;
