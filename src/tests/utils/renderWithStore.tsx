import { ReactElement } from 'react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import authReducer from '@/lib/features/auth/authSlice'
import { api } from '@/lib/api'
import { render } from '@testing-library/react'

export const createTestStore = () =>
    configureStore({
        reducer: {
            auth: authReducer,
            [api.reducerPath]: api.reducer,
        },
        middleware: (gDM) => gDM().concat(api.middleware),
    })

export const renderWithStore = (ui: ReactElement) => {
    const store = createTestStore()
    return render(
        <Provider store={store}>
            {ui}
        </Provider>
    )
}