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
import { getAllPostImages } from '../../store/post_images';
import { createPostImage } from '../../store/post_images';


const PostsLanding = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const posts = Object.values(useSelector(state => state.posts));

    const user = useSelector(state => state.session.user);
    const user_details = useSelector(state => state.session.user_details);
    const comments = Object.values(useSelector(state => state.comments));
    const postImages = Object.values(useSelector(state => state.postImages))


    const [text, setText] = useState('');
    const [url, setUrl] = useState('');
    const [errors, setErrors] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [image, setImage] = useState(null);

    useEffect(() => {
        dispatch(getAllPosts());
        dispatch(getComments());
        dispatch(getUserDetail(user?.id))
        dispatch(getAllPostImages())
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

        const formImgData = new FormData();
        formImgData.append('file', image)

        const data = await dispatch(createPost(formData));
        // if data is sent back set errors to the data
        if (data) {
            // return out and display errors on form
            if (image) {
                dispatch(createPostImage(data.id, formImgData))
            }
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

    if (!postImages) return null;


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
            <h3>My friends: </h3>
            <div>
                {Object.values(friends).map((friend) => {
                    return (
                        <div key={friend.id} style={{ border: '1px solid black' }}>
                            <NavLink to={`/users/${friend.id}`}>{friend.first_name} {friend.last_name}</NavLink>
                        </div>
                    )
                })}
            </div>
            <div>
                <button onClick={() => history.push(`/users/${user.id}`)} style={{color: 'whitesmoke'}}>My Profile</button>
                <h3>Check out the <NavLink to='/marketplace'>Marketplace!</NavLink></h3>
            </div>
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
                        maxLength={5000}
                    />
                    <label>
                        <div>Add an Image</div>
                        <input
                            type='file'
                            accept='image/*'
                            onChange={(e) => setImage(e.target.files[0])}
                        ></input>
                    </label>
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
                        {postImages.map(image => {
                            if (image.post_id === post.id) {
                                return (
                                    <div key={image.id} >
                                        <img style={{height: '100px', width: '100px'}}src={`${image.url}`} alt='post image'></img>
                                    </div>
                                )
                            }
                        })}
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
