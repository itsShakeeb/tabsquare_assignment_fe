import { describe, expect, test, beforeEach, afterEach, vi } from 'vitest'
import { screen, waitFor } from '@testing-library/react'
import { renderWithStore } from '@/tests/utils/renderWithStore'
import { mockApi, getMyOrdersMock } from '@/tests/mocks/api'
import MyLatestOrder from './MyLatestOrder'

mockApi()

const mockUserOrderData = [
    {
        id: "17b79202-b54b-44aa-98a7-42af4b60ec4f",
        customer_id: "5bc63d53-dcca-4796-9edb-0af7c7d51cb8",
        status: "received",
        created_at: "2026-03-01T14:01:46.181Z",
        updated_at: "2026-03-01T14:01:46.181Z",
        customer_name: "Shakeeb Buyer",
        email: "shakeeb@gmail.com",
        phone_no: "9999988888",
        items: [
            {
                order_item_id: "509f43dc-2007-4a4a-9fc7-0133ac4407fe",
                quantity: 2,
                size: null,
                instruction: "Extra spicy",
                price_at_purchase: "349.00",
                item_id: "c1cff5e1-88e0-48fd-a244-b23e85bef2a1",
                item_name: "Paneer Butter Masala Chatpata",
                image: "https://myfoodstory.com/wp-content/uploads/2021/07/Paneer-Butter-Masala-3.jpg",
                add_ons: []
            }
        ],
        summary: {
            subtotal: 698,
            tax: 55.84,
            total: 753.84
        }
    }
]

describe('MyLatestOrder Component', () => {
    beforeEach(() => {
        getMyOrdersMock.mockReset()
    })

    test('1. component should render without exploding', () => {
        getMyOrdersMock.mockReturnValue({ data: mockUserOrderData, isLoading: false })
        const { container } = renderWithStore(<MyLatestOrder />)
        expect(container).toBeTruthy()
        expect(screen.getByText('Latest Order Status')).toBeTruthy()
    })

    test('2. should show list of latest order', () => {
        getMyOrdersMock.mockReturnValue({ data: mockUserOrderData, isLoading: false })
        renderWithStore(<MyLatestOrder />)

        // Assert the component renders item name, quantity, and instruction
        expect(screen.getByText(/Paneer Butter Masala Chatpata/)).toBeTruthy()
        expect(screen.getByText(/2x/)).toBeTruthy()
        expect(screen.getByText(/Note:/)).toBeTruthy()
        expect(screen.getByText(/Extra spicy/)).toBeTruthy()
    })

    test('3. should show the latest status', () => {
        getMyOrdersMock.mockReturnValue({ data: mockUserOrderData, isLoading: false })
        renderWithStore(<MyLatestOrder />)

        // Ensure "Received" status chip is displayed (capitalized)
        expect(screen.getByText('Received')).toBeTruthy()
        // Check order receipt text
        expect(screen.getByText('Order Receipt')).toBeTruthy()
        // Check formatted total price 
        const totalElements = screen.getAllByText(/\$753\.84/)
        expect(totalElements.length).toBeGreaterThan(0)
    })

    test('displays null if isLoading is true', () => {
        getMyOrdersMock.mockReturnValue({ data: undefined, isLoading: true })
        const { container } = renderWithStore(<MyLatestOrder />)
        expect(container.firstChild).toBeNull()
    })

    test('displays null if data is empty', () => {
        getMyOrdersMock.mockReturnValue({ data: [], isLoading: false })
        const { container } = renderWithStore(<MyLatestOrder />)
        expect(container.firstChild).toBeNull()
    })
})
