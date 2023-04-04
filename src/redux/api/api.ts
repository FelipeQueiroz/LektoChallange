import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {
  ICreateUser,
  IRequestLogin,
  IResponseLogin,
  ISendMessage,
  IUpdateUser,
  User,
} from './types'

const baseQuery = fetchBaseQuery({
  baseUrl: `http://localhost:5211/api`,
})

// Define a service using a base URL and expected endpoints
export const api = createApi({
  reducerPath: `api`,
  tagTypes: [`user`],
  baseQuery,
  endpoints: (builder) => ({
    login: builder.mutation<IResponseLogin, IRequestLogin>({
      query: ({ email, password }) => ({
        url: `User/Login?email=${email}&password=${password}`,
        method: `POST`,
      }),
    }),
    createUser: builder.mutation<void, ICreateUser>({
      query: (user) => ({
        url: `User`,
        method: `POST`,
        body: user,
      }),
    }),
    updateUser: builder.mutation<User, IUpdateUser>({
      query: (user) => ({
        url: `User/${user.id}`,
        method: `PUT`,
        body: user,
      }),
    }),
    deleteUser: builder.mutation<void, { id: string }>({
      query: ({ id }) => ({
        url: `User/${id}`,
        method: `DELETE`,
      }),
    }),
    sendMessage: builder.mutation<void, ISendMessage>({
      query: (message) => ({
        url: `Message`,
        method: `POST`,
        body: message,
      }),
    }),
  }),
})

export const {
  useDeleteUserMutation,
  useLoginMutation,
  useCreateUserMutation,
  useUpdateUserMutation,
  useSendMessageMutation,
} = api
