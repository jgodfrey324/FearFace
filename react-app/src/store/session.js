// constants
const SET_USER = "session/SET_USER";
const REMOVE_USER = "session/REMOVE_USER";
const ALL_USER = "session/ALL_USER"
const USER_DETAILS = 'session/USER_DETAILS';

const setUser = (user) => ({
	type: SET_USER,
	payload: user,
});

const removeUser = () => ({
	type: REMOVE_USER,
});

const getAllUser = (users) => ({
	type: ALL_USER,
	users
})

const userDetail = (userDetail) => ({
	type: USER_DETAILS,
	userDetail

})

export const getAllUserThunk = () => async (dispatch) => {
	const response = await fetch("/api/users/");
	if (response.ok) {
		const data = await response.json()
		dispatch(getAllUser(data))
		return data
	} else {
		const data = await response.json()
		if (data.errors) {
			return data.errors
		}
	}
}


export const getUserDetail = (userId) => async (dispatch) => {
	const res = await fetch(`/api/users/${userId}/all`)
	if (res.ok) {
		const data = await res.json()
		// console.log('data from user detail ============================> ', data)
		dispatch(userDetail(data))
		return data
	}
}



export const authenticate = () => async (dispatch) => {
	const response = await fetch("/api/auth/", {
		headers: {
			"Content-Type": "application/json",
		},
	});
	if (response.ok) {
		const data = await response.json();
		if (data.errors) {
			return;
		}

		dispatch(setUser(data));
	}
};

export const login = (email, password) => async (dispatch) => {
	const response = await fetch("/api/auth/login", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			email,
			password,
		}),
	});

	if (response.ok) {
		const data = await response.json();
		dispatch(setUser(data));
		return null;
	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
};

export const logout = () => async (dispatch) => {
	const response = await fetch("/api/auth/logout", {
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (response.ok) {
		const data = await response.json();
		dispatch(removeUser());
		return data;
	}
};

export const signUp = (username, email, password, first_name, last_name) => async (dispatch) => {

	console.log('firstName from thunk', first_name)
	console.log('lastName from thunk', last_name)


	const response = await fetch("/api/auth/signup", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			username,
			email,
			password,
			first_name,
			last_name
		}),
		// body: JSON.stringify(payload)
	});


	if (response.ok) {
		const data = await response.json();
		dispatch(setUser(data));
		return null;
	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
};

const initialState = { user: null, all_users: {}, user_details: {} };

export default function reducer(state = initialState, action) {
	let newState;
	switch (action.type) {
		case SET_USER:
			return { user: action.payload };
		case REMOVE_USER:
			return { user: null };
		case ALL_USER:
			newState = { ...state }
			newState.all_users = {...action.users}
			return newState
		case USER_DETAILS:
			newState = { ...state }
			newState.user_details = { ...action.userDetail }
			return newState
		default:
			return state;
	}
}
