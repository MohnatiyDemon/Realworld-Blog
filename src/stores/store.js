import { configureStore } from '@reduxjs/toolkit'
import { blogApi } from '../features/api/blogApi'
import userReducer from './userSlice'

export const store = configureStore({
  reducer: {
		user: userReducer,
		[blogApi.reducerPath]: blogApi.reducer
	},
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(blogApi.middleware),
})
