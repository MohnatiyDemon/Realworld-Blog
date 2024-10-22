import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const URL = 'https://blog-platform.kata.academy/api'

export const blogApi = createApi({
  tagTypes: ['Articles', 'Article', 'User'],
  reducerPath: 'blogApi',
  baseQuery: fetchBaseQuery({
    baseUrl: URL,
  }),
  endpoints: (builder) => ({
    getArticles: builder.query({
      query: () => '/articles',
      providesTags: ['Articles'],
    }),
		getAnArticle: builder.query({
			query: (slug) => `/articles/${slug}`,
			providesTags: ['Article']
		})
  }),
})

export const {useGetArticlesQuery, useGetAnArticleQuery} = blogApi
