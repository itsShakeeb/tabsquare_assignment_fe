import { describe, expect, test, beforeEach } from 'vitest'
import { screen, fireEvent, waitFor } from '@testing-library/react'
import { renderWithStore } from '@/tests/utils/renderWithStore'
import { mockNextRouter, pushMock } from '@/tests/mocks/router'
import { mockSigninMutation, signinMock } from '@/tests/mocks/api'

mockNextRouter()
mockSigninMutation()

import Login from './index';

describe('Login Page', () => {
    beforeEach(() => {
        signinMock.mockReset()
        pushMock.mockReset()
    })


    test('Login Page should render without exploding', () => {
        const { container } = renderWithStore(<Login />)
        expect(container).toBeTruthy()
    })


    test('Login and redirect based on role', async () => {
        signinMock.mockReturnValue({
            unwrap: () =>
                Promise.resolve({
                    token: 'test-token',
                    role: 'admin',
                }),
        })

        renderWithStore(<Login />)

        const emailInput = screen.getByLabelText(/email address/i)
        const passwordInput = screen.getByLabelText(/password1/i)
        const loginButton = screen.getByRole('button', { name: /login/i })

        fireEvent.change(emailInput, {
            target: { value: 'test@gmail.com' },
        })

        fireEvent.change(passwordInput, {
            target: { value: 'Test@1234' },
        })

        fireEvent.click(loginButton)

        expect(signinMock).toHaveBeenCalledWith({
            email: 'test@gmail.com',
            password: 'Test@1234',
        })

        await waitFor(() => {
            expect(pushMock).toHaveBeenCalledWith('/auth/admin')
        })
    })
})