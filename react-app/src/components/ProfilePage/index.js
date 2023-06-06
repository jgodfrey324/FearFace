import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, NavLink,useParams, useHistory } from "react-router-dom";
import { getUserDetail } from '../../store/session';
import { createPost, getAllPosts } from '../../store/posts';
import OpenModalButton from '../OpenModalButton';
import DeletePostModal from '../UpdatePostModal/DeletePostModal';
import UpdatePostModal from '../UpdatePostModal';
import PostDetailModal from '../PostsLandingPage/PostDetailModal';




const ProfilePage = () => {
    const { userId } = useParams()
    const dispatch = useDispatch()
    const userDetails = useSelector(state => state.session.user_details)
    const current_user = useSelector(state => state.session.user);
    const history = useHistory()

    const [text, setText] = useState('');
    const [url, setUrl] = useState('');
    const [errors, setErrors] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [postsChanged, setPostsChanged] = useState(false);



    // console.log('current user from state ===========================> ', current_user);
    // if (users isnt around) {
        //     return daddy just chill
        // I got legs day today Raoul
        //I willnap
    // lets trade life. I can nap very well
        // }



    useEffect(() => {
        dispatch(getAllPosts());
        dispatch(getUserDetail(userId));
    }, [dispatch, userId])



    useEffect(() => {
        dispatch(getUserDetail(current_user.id));
        setPostsChanged(false);
    }, [dispatch, current_user.id, postsChanged])



    const reset = () => {
        setText('');
        setUrl('');
        setSubmitted(false);
    }


    const handleFollow = async (e) => {
        const res = await fetch(`/api/users/${userId}/friends`, {
            method: "POST"
        });
        await res.json();
    }


    const handleUnfollow = async (e) => {
        const res = await fetch(`/api/users/${userId}/friends`, {
            method: "DELETE"
        });
        await res.json();
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

    const visiting_profile_friends = Object.values(userDetails[userId]['is_following']);
    const current_user_friends = Object.values(userDetails[current_user.id]['is_following']);

    const user_posts = Object.values(userDetails[userId]['posts']);
    const user = user_posts[0]['user']



    return (
        <div>
            <h1 style={{color: 'whitesmoke'}}>This is {user.first_name} {user.last_name} profile</h1>
            {current_user_friends.find((user) => user.id !== parseInt(userId)) && current_user.id !== parseInt(userId) && (
                <button onClick={handleFollow} style={{backgroundColor: 'white'}}>Follow</button>
            )}
            {current_user_friends.find((user) => user.id === parseInt(userId)) && current_user.id !== parseInt(userId) && (
                <button onClick={handleUnfollow} style={{backgroundColor: 'white'}}>Unfollow</button>
            )}
            <h3 style={{color: 'whitesmoke'}}>{user.first_name}'s friends: </h3>
            {visiting_profile_friends.map((friend) => {
                return (
                    <div key={friend.id}>
                        <NavLink to={`/users/${friend.id}`}>{friend.first_name} {friend.last_name}</NavLink>
                    </div>
                )
            })}
            {current_user.id === parseInt(userId) && (
                <button onClick={() => history.push(`/users/${userId}/products`) } style={{color: 'whitesmoke'}}>My Products</button>
            )}
            {current_user.id === parseInt(userId) && (
                <form onSubmit={submitForm}>
                    <div className='new-post-house'>
                        <h2>Make a new post!</h2>
                        <ul>
                            {errors && (
                                <p style={{ color: "red" }}>{errors}</p>
                            )}
                        </ul>
                        <textarea
                            value={text}
                            placeholder='Write your status here....'
                            required
                            onChange={(e) => setText(e.target.value)}
                            minLength={5}
                            maxLength={5000}
                        />
                        <button>Post</button>
                    </div>
                </form >
            )}
            {user_posts.toReversed().map(post => {
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
                            <div className='user-name'>
                                <span>{post.user.first_name} </span>
                                <span>{post.user.last_name}...</span>
                            </div>
                        </div>
                        <div className='post-text-house'>
                            <p>{post.text}</p>
                        </div>
                        <div>
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
            })}
        </div>
    )
}




export default ProfilePage
