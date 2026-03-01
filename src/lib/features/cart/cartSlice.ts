import { createSlice, PayloadAction } from '@reduxjs/toolkit';
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
        addToCart: (state, action: PayloadAction<CartItem>) => {
            const newItem = action.payload;

            // Check if exact same item with exact same options exists
            const existingItemIndex = state.items.findIndex(
                (item) => item.id === newItem.id
            );

            if (existingItemIndex >= 0) {
                // Update quantity of existing item
                state.items[existingItemIndex].quantity += newItem.quantity;
            } else {
                // Add new item
                state.items.push(newItem);
            }
        },
        updateQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
            const { id, quantity } = action.payload;
            const item = state.items.find((i) => i.id === id);
            if (item) {
                item.quantity = quantity;
            }
        },
        removeFromCart: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter((item) => item.id !== action.payload);
        },
        clearCart: (state) => {
            state.items = [];
        }
    },
});

export const { addToCart, updateQuantity, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
