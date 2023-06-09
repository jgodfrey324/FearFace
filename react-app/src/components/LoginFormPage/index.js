import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, NavLink } from "react-router-dom";
import { login } from "../../store/session";
import './LoginForm.css';

function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }

  };

  const demoUser = (e) => {
    e.preventDefault()
    return dispatch(login("annabelle@higgins.io", "password"))
  }

  return (
    <div className="login-house">
      <img id="logo" src="https://i.imgur.com/rwR3GBq.png" alt='page logo'></img>
      <p>Don't have an account? Sign up <NavLink to='/signup'>here.</NavLink></p>
      <form onSubmit={handleSubmit}>
        <span>
          {errors.map((error, idx) => (
            <li id="error-li" key={idx}>{error}</li>
          ))}
        </span>
        <label>
          Email
          <input
            style={{ color: 'whitesmoke' }}
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            style={{ color: 'whitesmoke' }}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button style={{ color: 'whitesmoke' }} onClick={demoUser} className="normal-demo-button">Demo User</button>
        <button type="submit" style={{ color: 'whitesmoke' }}>Log In</button>
      </form>

      <div class="candle">
        <div class="flame">
          <div class="shadows"></div>
          <div class="top"></div>
          <div class="middle"></div>
          <div class="bottom"></div>
        </div>
        <div class="wick"></div>
        <div class="wax"></div>
      </div>

    </div>


  );
}

export default LoginFormPage;
