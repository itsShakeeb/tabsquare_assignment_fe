import { describe, expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import UserOrderCard from './UserOrderCard'

const mockUserOrderData = {
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

describe('UserOrderCard Component', () => {
    test('Component should render without exploding', () => {
        const { container } = render(<UserOrderCard order={mockUserOrderData} />)
        expect(container).toBeTruthy()
        expect(screen.getByText('Order Receipt')).toBeTruthy()
    })

    test('should show order items details correctly', () => {
        render(<UserOrderCard order={mockUserOrderData} />)

        expect(screen.getByText(/Paneer Butter Masala Chatpata/)).toBeTruthy()
        expect(screen.getByText(/2x/)).toBeTruthy()
        expect(screen.getByText(/Note:/)).toBeTruthy()
        expect(screen.getByText(/Extra spicy/)).toBeTruthy()
    })

    test('should show the order status and subtotal correctly', () => {
        render(<UserOrderCard order={mockUserOrderData} />)

        expect(screen.getByText('Received')).toBeTruthy()

        expect(screen.getAllByText('$698.00').length).toBeGreaterThan(0)
        expect(screen.getByText('$55.84')).toBeTruthy()
        expect(screen.getByText('$753.84')).toBeTruthy()
    })
})
