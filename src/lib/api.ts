import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { SigninRequest, SigninResponse } from './features/auth/type'
import { Category, ItemResposne, Dietary, Addon } from './features/item/type'
import { buildQueryParams } from './utils'
import { CartItem, Item, UserOrder } from '@/app/auth/user/types'
import { OrderDetail } from '@/app/auth/admin/order/type'

export const api = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/v1`,
        prepareHeaders: (headers, { getState }) => {
            // @ts-ignore
            const token = getState().auth?.user?.access_token;
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        }
    }),
    tagTypes: ['Auth', 'Item', 'Category', 'Dietary', 'Addon'],
    endpoints: (build) => ({
        signin: build.mutation<SigninResponse, SigninRequest>({
            query: (body) => ({ url: `/auth/login`, method: 'POST', body }),
            invalidatesTags: ['Auth'],
        }),
        getItems: build.query<ItemResposne[], { category?: string, dietary?: string[], name?: string }>({
            query: (params) => {
                const queryString = buildQueryParams(params);
                return { url: `/item${queryString}`, method: 'GET' };
            },
            providesTags: ['Item'],
        }),
        getCategories: build.query<Category[], void>({
            query: () => ({ url: `/category`, method: 'GET' }),
            providesTags: ['Category'],
        }),
        getDietary: build.query<Dietary[], void>({
            query: () => ({ url: `/dietary`, method: 'GET' }),
            providesTags: ['Dietary'],
        }),
        getAddons: build.query<Addon[], void>({
            query: () => ({ url: `/add_ons`, method: 'GET' }),
            providesTags: ['Addon'],
        }),
        addToCart: build.mutation<void, Item>({
            query: (body) => ({ url: `/cart/items`, method: 'POST', body }),
            invalidatesTags: ['Item'],
        }),
        getCartItems: build.query<CartItem, void>({
            query: () => ({ url: `/cart`, method: 'GET' }),
            providesTags: ['Item'],
        }),
        deleteCartItem: build.mutation<void, string>({
            query: (id) => ({ url: `/cart/items/${id}`, method: 'DELETE' }),
            invalidatesTags: ['Item'],
        }),
        checkout: build.mutation<void, void>({
            query: () => ({ url: `/order/checkout`, method: 'POST' }),
            invalidatesTags: ['Item'],
        }),
        getMyOrders: build.query<UserOrder[], void>({
            query: () => ({ url: `/order/my-orders`, method: 'GET' }),
            providesTags: ['Item'], // or creating a new tag 'Order'
        }),
    }),
})

export const {
    useSigninMutation,
    useGetItemsQuery,
    useGetCategoriesQuery,
    useGetDietaryQuery,
    useGetAddonsQuery,
    useAddToCartMutation,
    useGetCartItemsQuery,
    useDeleteCartItemMutation,
    useCheckoutMutation,
    useGetMyOrdersQuery
} = api
