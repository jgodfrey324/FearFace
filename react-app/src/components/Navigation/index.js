import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
	const sessionUser = useSelector(state => state.session.user);

	if (!sessionUser) return null;

	return (
		<div className='top-container'>
			<div className='logo-and-name' >
				<div className='fearface-logo'>
				<NavLink style={{color:"whitesmoke"}} exact to="/"><img id="fearfaceimage" src="https://i.imgur.com/rwR3GBq.png" alt='page logo'></img></NavLink>
				</div>
			</div>
			{isLoaded && (
				<div className='topright-nav'>
					<ProfileButton user={sessionUser} />
				</div>
			)}
		</div>
	);
}

export default Navigation;
