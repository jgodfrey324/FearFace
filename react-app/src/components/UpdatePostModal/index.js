import React, { useState } from "react";
import { updatePost } from "../../store/posts";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function UpdatePostModal({ postId }) {
  const current_post = useSelector(state => state.posts[postId])

  const { closeModal } = useModal();
  const dispatch = useDispatch();
  // fill state with old post text
  const [text, setText] = useState(current_post?.text);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState('');



  const handleSubmit = async (e) => {
    e.preventDefault();

    setSubmitted(true);


    const formData = new FormData()
    formData.append("text", text)

    const data = await dispatch(updatePost(postId, formData));
    if (data.errors) {
      return setErrors(data.errors[0]);
    }
    if (submitted && errors) {
      setErrors('');
    }

    return closeModal()
  };




  return (
    <div className="update-post-modal-container">
      <h1 style={{ color: '#d4bebe' }}>Update Post</h1>
      <div className="update-post-modal-form">
        <form onSubmit={handleSubmit}>
          <ul>
            {errors && (
              <p style={{ color: "red" }}>{errors}</p>
            )}
          </ul>
          <div className="update-post-content">
            <div id="update-label">
              Write your post here...
            </div>
            <div id="update-textarea">
              <textarea
                style={{ color: 'whitesmoke' }}
                placeholder={current_post?.text}
                value={text}
                onChange={(e) => setText(e.target.value)}
                required
                minLength={5}
                maxLength={5000}
                rows={5}
              />
            </div>
          </div>
          <button type="submit" id="update-modal-button" style={{ color: '#d4bebe' }}>Update</button>
        </form>
      </div>
    </div >
  );
}

export default UpdatePostModal;
