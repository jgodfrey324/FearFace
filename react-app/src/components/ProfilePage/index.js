import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, NavLink,useParams } from "react-router-dom";
import { getAllUserThunk,getUserDetail } from '../../store/session';
import { createPost, getAllPosts } from '../../store/posts';
import OpenModalButton from '../OpenModalButton';
import DeletePostModal from '../UpdatePostModal/DeletePostModal';
import UpdatePostModal from '../UpdatePostModal';
import PostDetailModal from '../PostsLandingPage/PostDetailModal';




const ProfilePage = () => {
    const { userId } = useParams()
    console.log('user id from params -----> ', userId);
    const dispatch = useDispatch()
    const userDetails = useSelector(state => state.session.user_details)

    console.log('use details from store ======================> ', userDetails)
    // if (users isnt around) {
        //     return daddy just chill
        // I got legs day today Raoul
        //I willnap
    // lets trade life. I can nap very well
        // }

    const current_user = useSelector(state => state.session.user);
    const posts = Object.values(useSelector(state => state.posts));

    const user_posts = []

    // for (const post of posts) {
    //     if (post.user.id === user?.id) {
    //         user_posts.push(post)
    //     }
    // }


    const [friends, setFriends] = useState({})
    const [text, setText] = useState('');
    const [url, setUrl] = useState('');
    const [errors, setErrors] = useState('');
    const [submitted, setSubmitted] = useState(false);


    useEffect(() => {
        dispatch(getAllPosts());
        dispatch(getAllUserThunk());
        dispatch(getUserDetail(userId));
        // return (() => null)
    }, [dispatch])


    useEffect(async () => {
        const res = await fetch(`/api/users/${userId}/friends`)
        const data = await res.json()

        setFriends({ ...data })

    }, [])


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
    if (!current_user) {
        return <Redirect to="/login" />
    }
    // wait for posts to load
    if (!posts) return null;


    return (
        <div>
            {/* <h1>This is {user?.first_name} {user?.last_name} profile</h1> */}
            {Object.values(friends).map((friend) => {
                return (
                    <div key={friend.id}>
                        <NavLink to={`/users/${friend.id}`}>{friend.first_name} {friend.last_name}</NavLink>
                    </div>
                )
            })}
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
            {/* {user_posts.toReversed().map(post => {
                const isCurrentUsers = post.user?.id === user?.id;
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
                        <div>
                            <OpenModalButton
                                buttonText="Comments"
                                modalComponent={<PostDetailModal postId={post.id} />}
                            />
                            {Object.values(post.comments).length > 0 && (
                                <span> {Object.values(post.comments).length}</span>
                            )}
                        </div>
                    </div> */}
                {/* )
            })
            } */}




        </div>
    )



}




export default ProfilePage