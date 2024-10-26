import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	user: null,
}

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		signInUser(state, action) {
			state.user = {...action.payload}
		},
		logOutUser(state) {
			state.user = null;
		},
		checkUserAuth(state) {
			const userData = localStorage.getItem('user-data')
			if(userData) {
				state.user = JSON.parse(userData)
			}
		}
	}
})

export const {signInUser, logOutUser, checkUserAuth} = userSlice.actions

export default userSlice.reducer