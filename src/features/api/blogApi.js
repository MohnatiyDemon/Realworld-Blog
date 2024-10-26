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
      query: (page) => `articles?limit=5&offset=${page}`,
      providesTags: ['Articles'],
    }),
		getAnArticle: builder.query({
			query: (slug) => `/articles/${slug}`,
			providesTags: ['Article']
		}),
    registerANewUser: builder.mutation({
      query: ({username, email, password}) => ({
        url: '/users ',
        method: 'POST',
        body: {
          user: {
            username: username,
            email: email,
            password: password,
          }
        }
      }),
    }),
    ExistingUserLogin: builder.mutation({
      query: ({email, password}) => ({
        url: '/users/login',
        method: 'POST',
        body: {
          user: {
            email: email,
            password: password,
          }
        }
      })
    })
  }),
})

export const {useGetArticlesQuery, useGetAnArticleQuery, useRegisterANewUserMutation, useExistingUserLoginMutation} = blogApi
