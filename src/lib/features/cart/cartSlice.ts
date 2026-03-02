import { createSlice } from '@reduxjs/toolkit';
import { CartItem } from '../../../app/auth/user/types';

interface CartState {
    items: CartItem[];
}

const initialState: CartState = {
    items: [],
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {

    },
});

export default cartSlice.reducer;
