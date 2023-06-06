import React, { useState } from "react";
import { updatePost } from "../../store/posts";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function UpdateProductModal({ postId, setter }) {
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
    setter(true);

    const formData = new FormData()
    formData.append("text", text)

    const data = await dispatch(updatePost(postId, formData));
    if (data) {
      return setErrors(data);
    }
    if (submitted && errors) {
      setErrors('');
    }

    return closeModal()
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
        <button type="submit">Update</button>
      </form>
    </>
  );
}

export default UpdatePostModal;
