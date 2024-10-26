import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	user: null,
}

const userData = localStorage.getItem('user-data')

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		signInUser(state, action) {
			state.user = {...action.payload}
		},
		logOutUser(state) {
			state.user = null;
			if(userData) {
				localStorage.removeItem('user-data')
			}
		},
		checkUserAuth(state) {
			if(userData) {
				state.user = JSON.parse(userData)
			}
		}
	}
})

export const {signInUser, logOutUser, checkUserAuth} = userSlice.actions

export default userSlice.reducer