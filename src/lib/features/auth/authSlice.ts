import { api } from "@/lib/api"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { SigninResponse } from "./type"

interface AuthState {
    user: SigninResponse | null
    token: string | null
    isLoggedIn: boolean
}

const initialState: AuthState = {
    user: null,
    token: null,
    isLoggedIn: false
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state: AuthState, action: PayloadAction<SigninResponse>) => {
            state.user = action.payload
            state.token = action.payload.token
            state.isLoggedIn = true
        },
        logout: (state: AuthState) => {
            state.user = null
            state.token = null
            state.isLoggedIn = false
        }
    },
})

export const { setCredentials, logout } = authSlice.actions
export default authSlice.reducer