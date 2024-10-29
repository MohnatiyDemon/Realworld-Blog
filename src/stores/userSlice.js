import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	user: localStorage.getItem('user-data') ? JSON.parse(localStorage.getItem('user-data')) : null,
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
				state.user = {...JSON.parse(localStorage.getItem('user-data'))}
		},
	},
})

export const { signInUser, logOutUser, checkUserAuth } = userSlice.actions

export default userSlice.reducer