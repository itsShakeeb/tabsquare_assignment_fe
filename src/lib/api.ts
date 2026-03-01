import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { SigninRequest, SigninResponse } from './features/auth/type'

export const api = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/v1` }),
    tagTypes: ['Auth'],
    endpoints: (build) => ({
        signin: build.mutation<SigninResponse, SigninRequest>({
            query: (body) => ({ url: `/auth/login`, method: 'POST', body }),
            invalidatesTags: ['Auth'],
        }),
    }),
})

export const { useSigninMutation } = api
