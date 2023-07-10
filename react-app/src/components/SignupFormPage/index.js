import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, NavLink } from "react-router-dom";
import { signUp } from "../../store/session";
import './SignupForm.css';

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  // const [selected, setSelected] = useState('');


  const pic1 = "https://images-ext-1.discordapp.net/external/zhxa2dTWchJ_tE1xmUySwcDE57OflnMUwdmKrEnRyyM/https/static1.dualshockersimages.com/wordpress/wp-content/uploads/2022/01/Nezukos-New-Demon-Form-in-Demon-Slayer-Explained.jpg?width=1836&height=1034"
  const pic2 = "https://images-ext-2.discordapp.net/external/Rl4I8LML5XaL5bbiQ4eR2mSatuZxXWzOawNMn1F_NsI/https/pbs.twimg.com/media/DXjlEkKV4AA-I_S.jpg?width=1034&height=1034"
  const pic3 = "https://images-ext-2.discordapp.net/external/goFUdKoDcnXOveVgy4Mq0zvl4legaJEDZYUVhXgeLZQ/https/e0.pxfuel.com/wallpapers/582/659/desktop-wallpaper-junji-ito-horror-manga-thumbnail.jpg?width=700&height=1034"
  const pic4 = "https://media.discordapp.net/attachments/1113249761743618210/1116871749980655708/image.png?width=786&height=814"



  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      const data = await dispatch(signUp(profilePic, username, email, password, firstName, lastName));
      if (data) {
        // setErrors(data[0].split(":")[1]);
        setErrors(data)
      }
    } else {
      setErrors(['password: * Confirm Password field must be the same as the Password field']);
    }
  };

  return (
    <div className="signup-house">
      <img id="logo" src="https://i.imgur.com/rwR3GBq.png" alt='page logo' ></img>
      <p>Already have an account? Log in <NavLink to='/login'>here.</NavLink></p>
      <form onSubmit={handleSubmit}>
        {/* <li id="error-li">{errors}</li> */}
        <div className="choose-avatar">
          <label>
            Choose an avatar:
            <div className="avatar-pics">
                <input
                id='pic1'
                hidden={true}
                type="radio"
                value={pic1}
                checked={profilePic === pic1}
                name="pics"
                // checked={seeds === 'yes'}
                onChange={(e) => {
                  setProfilePic(e.target.value)
                }}
                />
              <label htmlFor="pic1">
                <img style={{height: '100px', width: '100px', borderRadius: '50px', objectFit: 'cover'}}src={pic1} alt='default 1'></img>
              </label>

                <input
                id='pic2'
                hidden={true}
                type="radio"
                value={pic2}
                checked={profilePic === pic2}
                name="pics"
                // checked={seeds === 'yes'}
                onChange={(e) => {
                  setProfilePic(e.target.value)
                }}
                />
              <label htmlFor="pic2">
                <img style={{height: '100px', width: '100px', borderRadius: '50px', objectFit: 'cover'}}src={pic2} alt='default 2'></img>
              </label>

                <input
                id='pic3'
                hidden={true}
                type="radio"
                value={pic3}
                checked={profilePic === pic3}
                name="pics"
                // checked={seeds === 'yes'}
                onChange={(e) => {
                  setProfilePic(e.target.value)
                }}
                />
              <label htmlFor="pic3">
                <img style={{height: '100px', width: '100px', borderRadius: '50px', objectFit: 'cover'}}src={pic3} alt='default 3'></img>
              </label>

                <input
                id='pic4'
                hidden={true}
                type="radio"
                value={pic4}
                checked={profilePic === pic4}
                name="pics"
                // checked={seeds === 'yes'}
                onChange={(e) => {
                  setProfilePic(e.target.value)
                }}
                />
              <label htmlFor="pic4">
                <img style={{height: '100px', width: '100px', borderRadius: '50px', objectFit: 'cover'}}src={pic4} alt='default 4'></img>
              </label>
            </div>
          </label>
        </div>
        <span>
          {errors.map((error, idx) => (
            <li id="error-li" key={idx}>{error.split(':')[1]}</li>
          ))}
        </span>
        <label>
          Email
          <input
            style={{color: 'whitesmoke'}}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Username
          <input
            style={{color: 'whitesmoke'}}
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <label>
          First Name
          <input
            style={{color: 'whitesmoke'}}
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </label>
        <label>
          Last Name
          <input
            style={{color: 'whitesmoke'}}
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            style={{color: 'whitesmoke'}}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength='8'
						maxLength='30'
            required
          />
        </label>
        <label>
          Confirm Password
          <input
            style={{color: 'whitesmoke'}}
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit" style={{color: 'whitesmoke'}}>Sign Up</button>
      </form>
    </div>
  );
}

export default SignupFormPage;
