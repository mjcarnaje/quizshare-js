import { createSlice } from '@reduxjs/toolkit';
import jwtDecode from 'jwt-decode';

const authInitialState = {
	user: null,
};

const token = localStorage.getItem('token');
if (token) {
	const decodedToken = jwtDecode(token);
	if (decodedToken.exp * 1000 < Date.now()) {
		localStorage.removeItem('token');
	} else {
		authInitialState.user = decodedToken;
	}
}

const authSlice = createSlice({
	name: 'auth',
	initialState: authInitialState,
	reducers: {
		loginUser: (state, { payload }) => {
			localStorage.setItem('token', payload.token);
			state.user = payload;
		},
		logoutUser: (state, { payload }) => {
			localStorage.removeItem('token');
			state.user = null;
		},
		loadCurrentUser: (state, { payload }) => {
			state.user = payload;
		},
	},
});

export const { loginUser, logoutUser, loadCurrentUser } = authSlice.actions;

export default authSlice.reducer;
