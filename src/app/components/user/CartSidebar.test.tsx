import { describe, expect, test, beforeEach, afterEach, vi } from 'vitest'
import { screen, fireEvent, waitFor, act } from '@testing-library/react'
import { renderWithStore } from '@/tests/utils/renderWithStore'
import { mockNextRouter, pushMock } from '@/tests/mocks/router'
import { mockApi, getCartItemsMock, checkoutMock } from '@/tests/mocks/api'
import CartSidebar from './CartSidebar'

mockNextRouter()
mockApi()

const mockCartData = {
    items: [
        {
            id: '1',
            item_id: '101',
            name: 'Test Burger',
            base_price: 10.00,
            total_price: 10.00,
            quantity: 1,
            image: 'test-image.jpg',
            options: { addons: [] }
        }
    ],
    summary: {
        subtotal: 10.00,
        tax: 2.00,
        delivery_fee: 0,
        total: 12.00
    }
}

describe('CartSidebar Component', () => {
    beforeEach(() => {
        getCartItemsMock.mockReset()
        checkoutMock.mockReset()
        pushMock.mockReset()
        vi.useFakeTimers()
    })

    afterEach(() => {
        vi.runOnlyPendingTimers()
        vi.useRealTimers()
    })

    test('component should render without exploding', () => {
        getCartItemsMock.mockReturnValue({ data: mockCartData })
        const { container } = renderWithStore(<CartSidebar />)
        expect(container).toBeTruthy()
        expect(screen.getByText('My Orders')).toBeTruthy()
    })

    test('Add item price calculation should be correct', () => {
        getCartItemsMock.mockReturnValue({ data: mockCartData })
        renderWithStore(<CartSidebar />)

        const priceElements = screen.getAllByText(/\$\d+\.\d{2}/)
        const pricesText = priceElements.map(el => el.textContent)

        expect(pricesText).toContain('$10.00')
        expect(pricesText).toContain('$2.00')
        expect(pricesText).toContain('$12.00')
    })

    test('Upon clicking checkout it should place order correctly and show order placed screen', async () => {
        getCartItemsMock.mockReturnValue({ data: mockCartData })
        checkoutMock.mockReturnValue({
            unwrap: () => Promise.resolve()
        })

        renderWithStore(<CartSidebar />)

        const checkoutButton = screen.getByRole('button', { name: /check out/i })

        await act(async () => {
            fireEvent.click(checkoutButton)
        })

        expect(checkoutMock).toHaveBeenCalled()

        await act(async () => {
            vi.advanceTimersByTime(1500)
        })

        expect(pushMock).toHaveBeenCalledWith('/order-placed')
    })
})
