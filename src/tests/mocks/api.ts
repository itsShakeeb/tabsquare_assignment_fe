import { vi } from 'vitest'

export const signinMock = vi.fn()
export const getItemsMock = vi.fn()
export const getCategoriesMock = vi.fn()
export const getDietaryMock = vi.fn()
export const getAddonsMock = vi.fn()
export const getCartItemsMock = vi.fn()
export const deleteCartItemMock = vi.fn()
export const checkoutMock = vi.fn()

export const mockApi = () => {
    vi.mock('@/lib/api', async () => {
        const actual = await vi.importActual<any>('@/lib/api')
        return {
            ...actual,
            useSigninMutation: () => [
                signinMock,
                { isLoading: false, reset: vi.fn() },
            ],
            useGetItemsQuery: getItemsMock,
            useGetCategoriesQuery: getCategoriesMock,
            useGetDietaryQuery: getDietaryMock,
            useGetAddonsQuery: getAddonsMock,
            useGetCartItemsQuery: getCartItemsMock,
            useDeleteCartItemMutation: () => [
                deleteCartItemMock,
                { isLoading: false, reset: vi.fn() },
            ],
            useCheckoutMutation: () => [
                checkoutMock,
                { isLoading: false, reset: vi.fn() },
            ],
        }
    })
}

// Keep it for backward compatibility
export const mockSigninMutation = mockApi;
