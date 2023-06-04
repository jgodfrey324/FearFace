import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { updatePost } from "../../store/posts";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function UpdatePostModal({ postId, setter }) {
  const current_post = useSelector(state => state.posts[postId])

  const dispatch = useDispatch();
  const [text, setText] = useState(current_post?.text);
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState('');
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSubmitted(true);

    const formData = new FormData()
    formData.append("text", text)

    const data = await dispatch(updatePost(postId, formData));
    if (data) {
      return setErrors(data);
    } else {
      closeModal()
    }

    if (submitted && errors) {
      setErrors('');
    }

  };

  return (
    <>
      <h1>Update Post</h1>
      <form onSubmit={handleSubmit}>
        <ul>
          {errors && (
            <p style={{ color: "red" }}>{errors}</p>
          )}
        </ul>
        <label>
          Write your post here...
          <textarea
            placeholder={current_post?.text}
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
            minLength={5}
            maxLength={5000}
          />
        </label>
        <button
          type="submit"
          onClick={() => setter(true)}
        >Update</button>
      </form>
    </>
  );
}

export default UpdatePostModal;
