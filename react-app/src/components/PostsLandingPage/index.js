import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPosts, createPost } from '../../store/posts';
import { Redirect, NavLink } from "react-router-dom";
import OpenModalButton from '../OpenModalButton';
// import { useModal } from "../../context/Modal";
import PostDetailModal from './PostDetailModal';
import { getUserDetail } from '../../store/session';
import { getComments } from '../../store/comments';
import { getAllPostImages } from '../../store/post_images';
// import { createPostImage } from '../../store/post_images';
import EditDeleteDrop from './EditDeleteDrop';
import './PostsLanding.css';


const PostsLanding = () => {
    const dispatch = useDispatch()
    // const history = useHistory()
    // const { closeModal } = useModal();
    const posts = Object.values(useSelector(state => state.posts));
    const user = useSelector(state => state.session.user);
    const user_details = useSelector(state => state.session.user_details);
    const comments = Object.values(useSelector(state => state.comments));
    const postImages = Object.values(useSelector(state => state.postImages))

    const [text, setText] = useState('');
    // const [url, setUrl] = useState('');
    const [errors, setErrors] = useState('');
    const [submitted, setSubmitted] = useState(false);
    // const [image, setImage] = useState(null);

    useEffect(() => {
        dispatch(getAllPosts());
        dispatch(getComments());
        dispatch(getUserDetail(user?.id))
        dispatch(getAllPostImages())
    }, [dispatch, user?.id]);



    const submitForm = async (e) => {
        e.preventDefault();
        setSubmitted(true);

        const formData = new FormData();
        formData.append("text", text);

        const data = await dispatch(createPost(formData));
        // if data is sent back set errors to the data
        if (data.errors) {
            return setErrors(data.errors[0]);
        }

        if (submitted && errors) {
            setErrors('');
        }
        setText('')
        setSubmitted(false)
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


    // make friends object
    const friends = user_details[user.id]['is_following']



    return (
        <div className='landing-house'>
            <div className="lp-posts">
                <form id="lp-form" onSubmit={submitForm} encType="multipart/form-data">
                    <div className='new-post-house'>
                        <img id="make-post" src="https://i.imgur.com/ERn5sIv.png" alt='post form title'></img>
                        <ul>
                            {errors && (
                                <p style={{ color: "red" }}>{errors}</p>
                            )}
                        </ul>
                        <textarea
                            style={{ color: '#d4bebe' }}
                            value={text}
                            placeholder='Write your status here....'
                            required
                            onChange={(e) => setText(e.target.value)}
                            minLength={5}
                        // maxLength={5000}
                        />
                        <button className='glowing-btn'>POST</button>

                    </div>
                </form >
                {posts.toReversed().map(post => {
                    const isCurrentUsers = post.user.id === user.id;
                    return (
                        <div key={post.id} className='post-house'>
                            <div className='post-top-bar'>
                                <div className='post-menu-buttons'>
                                    {isCurrentUsers && (
                                        <EditDeleteDrop user={user} postId={post.id}
                                        />
                                    )}
                                </div>
                                <div className='user-name'>
                                    <img src={post.user.profile_pic} alt='user'></img>
                                    <NavLink to={`/users/${post.user.id}`}>{post.user.first_name} {post.user.last_name}</NavLink>
                                </div>
                            </div>
                            {postImages.map(image => {
                                if (image.post_id === post.id) {
                                    return (
                                        <div key={image.id} className='post-image-house'>
                                            <img src={`${image.url}`} alt='post'></img>
                                        </div>
                                    )
                                }
                            })}
                            <div className='post-text-house'>
                                <p>{post.text}</p>
                            </div>
                            <div className="lp-comments">
                                <OpenModalButton
                                    buttonText={<i id="comment-icon" class="fa-regular fa-comment-dots"></i>}
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
            <div className="lp-friends">
                <h3>my friends  </h3>
                {Object.values(friends).map((friend) => {
                    return (
                        <div key={friend.id} className='lp-friends-tag'>
                            <span>🟢</span>
                            <NavLink id="friend-name" to={`/users/${friend.id}`}>{friend.first_name} {friend.last_name}</NavLink>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}


export default PostsLanding;
