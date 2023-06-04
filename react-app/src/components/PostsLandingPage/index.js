import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPosts, createPost } from '../../store/posts';
import { useHistory } from 'react-router-dom';



const PostsLanding = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const posts = Object.values(useSelector(state => state.posts));
    const user = useSelector(state => state.session);


    const [text, setText] = useState('')
    const [url, setUrl] = useState('')
    const [validationErrors, setValidationErrors] = useState([])
    const [submitted, setSubmitted] = useState(false)


    const submitForm = async (e) => {
        e.preventDefault()

        setSubmitted(true)
        if (validationErrors.length) return alert("Cannot submit")

        const formData = new FormData()
        formData.append("text", text)

        await dispatch(createPost(formData))

        reset()
    }


    useEffect(() => {
        dispatch(getAllPosts());
        setSubmitted(false)
    }, [dispatch, submitted]);



    const reset = () => {
        setText('');
        setUrl('');
        setValidationErrors([]);
    }




    if (!user.user) {
        console.log('there isnt a user session')
        return history.push('/login')
    }

    console.log('went past user check')
    console.log('user-------------> ', user.user)





    if (!posts) return null;

    return (
        <div>
            <h1>FearFace landing page...</h1>
            <form onSubmit={submitForm}>
                <div style={{ border: '2px solid green', marginBottom: '20px' }}>
                    <h2>Make a new post!</h2>
                    <textarea
                        style={{ height: '200px', width: '800px' }}
                        value={text}
                        placeholder='Write your status here....'
                        required
                        onChange={(e) => setText(e.target.value)}
                        minLength={3}
                        maxLength={5000}
                    />
                    <div style={{ marginTop: '20px' }}>
                        <button style={{ padding: '10px 20px' }}>Post</button>
                    </div>
                </div>
            </form>
            {posts.toReversed().map(post => {
                const comments = Object.values(post.comments)
                return (
                    <div key={post.id} style={{ border: '1px solid black', marginBottom: '10px' }}>
                        <span>{post.user.first_name} </span>
                        <span>{post.user.last_name}...</span>
                        <p>{post.text}</p>
                        <div>
                            {comments.map(comment => {
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
            })}
        </div>
    )





}


export default PostsLanding;
