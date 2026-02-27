import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const api = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/api/v1` }),
    tagTypes: ['Auth'],
    endpoints: (build) => ({
        signin: build.mutation({
            query: (body) => ({ url: `/auth/signin`, method: 'POST', body }),
            invalidatesTags: ['Auth'],
        }),
    }),
})

// Export hooks for usage in functional components
export const { useSigninMutation } = api
