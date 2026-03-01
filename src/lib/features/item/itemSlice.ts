import { createSlice } from '@reduxjs/toolkit'
import { ItemResposne } from './type'
import { api } from '@/lib/api'

const itemSlice = createSlice({
    name: 'item',
    initialState: {
        items: [] as ItemResposne[],
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addMatcher(api.endpoints.getItems.matchFulfilled, (state, action) => {
            state.items = action.payload
        })
    },
})

export default itemSlice.reducer