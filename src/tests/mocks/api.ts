import { vi } from 'vitest'

export const signinMock = vi.fn()

export const mockSigninMutation = () => {
    vi.mock('@/lib/api', async () => {
        const actual = await vi.importActual<any>('@/lib/api')
        return {
            ...actual,
            useSigninMutation: () => [
                signinMock,
                { isLoading: false, reset: vi.fn() },
            ],
        }
    })
}