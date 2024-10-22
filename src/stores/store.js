import { configureStore } from '@reduxjs/toolkit'
import { blogApi } from '../features/api/blogApi'

export const store = configureStore({
  reducer: {
		[blogApi.reducerPath]: blogApi.reducer
	},
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(blogApi.middleware),
})
