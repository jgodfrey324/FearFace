import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPosts } from '../../store/posts';




const PostsLanding = () => {
    const dispatch = useDispatch()
    const posts = Object.values(useSelector(state => state.posts));

    useEffect(() => {
        dispatch(getAllPosts());
    }, [dispatch]);


    if (!posts) return null;

    return (
        <div>
            <h1>FearFace landing page...</h1>
            {posts.map(post => {
                const comments = Object.values(post.comments)
                return (
                    <div key={post.id} style={{border: '1px solid black', marginBottom: '10px'}}>
                        <span>{post.user.first_name} </span>
                        <span>{post.user.last_name}...</span>
                        <p>{post.text}</p>
                        <div>
                            {comments.map(comment => {
                                return (
                                    <div key={comment.id} style={{border: '1px solid red', fontSize: '12px'}}>
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
