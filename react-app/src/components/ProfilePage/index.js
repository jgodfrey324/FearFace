import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, NavLink, useParams, useHistory } from "react-router-dom";
import { getUserDetail } from '../../store/session';
import { createPost, getAllPosts } from '../../store/posts';
import { getComments } from '../../store/comments';
import OpenModalButton from '../OpenModalButton';
import DeletePostModal from '../UpdatePostModal/DeletePostModal';
import UpdatePostModal from '../UpdatePostModal';
import PostDetailModal from '../PostsLandingPage/PostDetailModal';
import { getAllPostImages } from '../../store/post_images';
import './ProfilePage.css'




const ProfilePage = () => {
    const { userId } = useParams()
    const history = useHistory()
    const dispatch = useDispatch()
    const userDetails = useSelector(state => state.session.user_details)
    const current_user = useSelector(state => state.session.user);
    const comments = Object.values(useSelector(state => state.comments))
    const posts = Object.values(useSelector(state => state.posts))
    const postImages = Object.values(useSelector(state => state.postImages))

    const [text, setText] = useState('');
    // const [url, setUrl] = useState('');
    const [errors, setErrors] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [postsChanged, setPostsChanged] = useState(false);
    const [user, setUser] = useState({})



    useEffect(() => {
        dispatch(getAllPosts());
        dispatch(getComments())
        dispatch(getAllPostImages())
        const timeout = setTimeout(() => {
            async function data() {
                const ress = await dispatch(getUserDetail(userId));
                if (!ress) {
                    console.log("im  inside something")
                    return <h1 style={{ color: "white" }}>LOADING....</h1>
                }

            }
            data()
        }, 500)
        return (() => {
            clearTimeout(timeout)
        })

    }, [dispatch, userId])



    useEffect(() => {
        dispatch(getUserDetail(current_user?.id));
        setPostsChanged(false);
    }, [dispatch, current_user?.id, postsChanged])


    useEffect(() => {
        async function fetchData() {
            const res = await fetch('/api/users');
            const data = await res.json();

            const user_fetch = data[userId]

            setUser(user_fetch)
        }

        fetchData();

    }, [dispatch, userId])



    const reset = () => {
        setText('');
        // setUrl('');
        setSubmitted(false);
    }


    const handleFollow = async (e) => {
        const res = await fetch(`/api/users/${userId}/friends`, {
            method: "POST"
        });
        await res.json();
        setPostsChanged(true)
    }


    const handleUnfollow = async (e) => {
        const res = await fetch(`/api/users/${userId}/friends`, {
            method: "DELETE"
        });
        await res.json();
        setPostsChanged(true)
    }


    const submitForm = async (e) => {
        e.preventDefault();

        setSubmitted(true);
        setPostsChanged(true);

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
    if (!current_user) {
        return <Redirect to="/login" />
    }
    // wait for posts to load
    if (!userDetails) return null;

    if (!userDetails[userId]) return null;

    if (!userDetails[current_user.id]) return null;

    if (!comments) return null;


    console.log(postImages, 'fuuuuuuuuuuuuuuuuuuuuuuuuuuck')

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



    const userPosts = []

    for (const post of posts) {
        if (post.user.id === parseInt(userId)) {
            userPosts.push(post)
        }
    }



    const visiting_profile_friends = Object.values(userDetails[userId]['is_following']);
    const current_user_friends = Object.values(userDetails[current_user.id]['is_following']);

    const friendId = []
    for (const user of current_user_friends) {
        friendId.push(user.id)
    }



    return (
        <div className='profile-house'>
            <div className='profile-intro-house'>
                <img id="profile-pic-main" src={user.profile_pic}></img>
                <div className='intro-house-text'>
                    <h1>{user.first_name} {user.last_name}</h1>
                    <p>{user.bio}</p>
                </div>
                <div className='intro-house-button'>
                    {!friendId.includes(parseInt(userId)) && current_user.id !== parseInt(userId) && (
                    <button onClick={handleFollow}>Follow</button>
                    )}
                </div>
                <div className='intro-house-button'>
                    {friendId.includes(parseInt(userId)) && current_user.id !== parseInt(userId) && (
                    <button onClick={handleUnfollow}>Unfollow</button>
                    )}
                </div>
            </div>
            <div className='my-profile-side-bar'>
                <div className="user-about" style={{color:'white'}}>
                    {visiting_profile_friends.map((friend) => {
                        return (
                            <div></div>
                        )
                    })}
                </div>
                <div className='user-following-house'>
                    <h3>following</h3>
                    {visiting_profile_friends.map((friend) => {
                        return (
                            <div key={friend.id} className='following-house-user-link'><img id="profile-side-pic" src={friend.profile_pic}></img>
                                <NavLink to={`/users/${friend.id}`}>{friend.first_name} {friend.last_name}</NavLink>
                            </div>
                        )
                    })}
                {/* </div>
                <div className='marketplace-button'>
                    <button onClick={() => history.push('/marketplace')}>MarketPlace</button>
                </div>
                    {current_user.id !== parseInt(userId) ? <button onClick={() => history.push(`/users/${current_user.id}`)}>My Profile</button> : null}
                <div> */}

                </div>
            </div>
            <div className='my-products-button'>
                {/* {current_user.id === parseInt(userId) && (
                    <button onClick={() => history.push(`/users/${userId}/products`)}>My Products</button>
                )} */}
            </div>
            <div className='profile-content-house'>
                {current_user.id === parseInt(userId) && (
                    <form onSubmit={submitForm} id='profile-form'>
                        <div className='new-post-house'>
                        <img id="make-post" src="https://i.imgur.com/ERn5sIv.png" alt='post form title'></img>
                            <ul>
                                {errors && (
                                    <p style={{ color: "red" }}>{errors}</p>
                                )}
                            </ul>
                            <textarea
                                style={{ color: "whitesmoke" }}
                                value={text}
                                placeholder=
                                {`What's on your mind, ${user.first_name}?`}
                                required
                                onChange={(e) => setText(e.target.value)}
                                minLength={5}
                                maxLength={5000}
                            />
                            <button className='glowing-btn glowing-txt' style={{ color: "whitesmoke" }}>Post</button>
                        </div>
                    </form >
                )}
                {userPosts.toReversed().map(post => {
                    const isCurrentUsers = post.user.id === current_user.id;

                    return (
                        <div key={post.id} className='post-house'>
                            <div className='post-top-bar'>
                                <div className='post-menu-buttons'>
                                    {isCurrentUsers && (
                                        <OpenModalButton
                                            buttonText="Edit"
                                            modalComponent={<UpdatePostModal postId={post.id} setter={setPostsChanged} />}
                                        />
                                    )}
                                    {isCurrentUsers && (
                                        <OpenModalButton
                                            buttonText="Delete"
                                            modalComponent={<DeletePostModal postId={post.id} setter={setPostsChanged} />}
                                        />
                                    )}
                                </div>
                                {postImages.map(image => {
                            if (image.post_id === post.id) {
                                return (
                                    <div key={image.id} >
                                        <img style={{ height: '500px', width: '500px', objectFit:'cover'}} src={`${image.url}`} alt='post'></img>
                                    </div>
                                )
                            }
                        })}
                            </div>
                            <div className='post-text-house'>
                                <p>{post.text}</p>
                            </div>
                            <div className="lp-comments">
                                <OpenModalButton style={{ color: 'whitesmoke' }}
                                    buttonText="Comments"
                                    modalComponent={<PostDetailModal postId={post.id} />}
                                />
                                {commentsCount[post.id] > 0 && (
                                    <span> {commentsCount[post.id]}</span>
                                )}
                            </div>
                        </div>
                    )
                })}

            </div>
        </div>
    )
}




export default ProfilePage
