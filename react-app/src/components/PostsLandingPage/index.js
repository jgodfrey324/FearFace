import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPosts, createPost } from '../../store/posts';
import { Redirect, NavLink, useHistory } from "react-router-dom";
import OpenModalButton from '../OpenModalButton';
import UpdatePostModal from '../UpdatePostModal';
import DeletePostModal from '../UpdatePostModal/DeletePostModal';
import PostDetailModal from './PostDetailModal';
import './PostsLanding.css';
import { getUserDetail } from '../../store/session';
import { getComments } from '../../store/comments';


const PostsLanding = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const posts = Object.values(useSelector(state => state.posts));

    const user = useSelector(state => state.session.user);
    const user_details = useSelector(state => state.session.user_details);
    const comments = Object.values(useSelector(state => state.comments));

    // try adding dispatch for get all comments here
    // make count obj that counts all comments per post and use that count for display



    const [text, setText] = useState('');
    const [url, setUrl] = useState('');
    const [errors, setErrors] = useState('');
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        dispatch(getAllPosts());
        dispatch(getComments());
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

    if (!comments) return null;

    const commentsCount = {}

    for (const post of posts) {
        for (const comment of comments) {
            if (comment.post_id === post.id) {
                if (commentsCount[post.id]) {
                    commentsCount[post.id] += 1
                } else {
                    commentsCount[post.id] = 1
                }
            }
        }
    }

    // console.log(commentsCount, 'comments count obj ....................................');

    // make friends object
    const friends = user_details[user.id]['is_following']
    // console.log('friends on landing page ============================> ', friends);



    return (
        <div className='landing-house'>
            <div className="logo-container">
            <img id="logo" src="https://i.imgur.com/rwR3GBq.png" alt='page logo'></img>
            </div>
            <h3>My friends: </h3>
            <div>
                {Object.values(friends).map((friend) => {
                    return (
                        <div key={friend.id} style={{border: '1px solid black'}}>
                            <NavLink to={`/users/${friend.id}`}>{friend.first_name} {friend.last_name}</NavLink>
                        </div>
                    )
                })}
            </div>
            <div>
                <button onClick={() => history.push(`/users/${user.id}`)}>My Profile</button>
                <h3>Check out the <NavLink to='/marketplace'>Marketplace!</NavLink></h3>
            </div>
            <form id="lp-form"onSubmit={submitForm}>
                <div className='new-post-house'>
                    <img id="make-post" src="https://i.imgur.com/ERn5sIv.png" alt='post form title'></img>
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
                            {commentsCount[post.id] > 0 && (
                                <span> {commentsCount[post.id]}</span>
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
