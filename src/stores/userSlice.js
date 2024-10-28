import { createSlice } from '@reduxjs/toolkit'

const userData = localStorage.getItem('user-data')

const initialState = {
	user: userData ? JSON.parse(userData) : null,
}

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		signInUser(state, action) {
			state.user = {...action.payload}
			localStorage.setItem('user-data', JSON.stringify(action.payload))
		},
		logOutUser(state) {
			state.user = null
			localStorage.removeItem('user-data')
		},
		checkUserAuth(state) {
			if (!state.user && userData) {
				state.user = JSON.parse(userData)
			}
		},
	},
})

export const { signInUser, logOutUser, checkUserAuth } = userSlice.actions

export default userSlice.reducer