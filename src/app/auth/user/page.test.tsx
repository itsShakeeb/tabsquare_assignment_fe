import { describe, expect, test, beforeEach, beforeAll, afterAll, vi } from 'vitest'
import { screen, fireEvent, waitFor, act } from '@testing-library/react'
import { renderWithStore } from '@/tests/utils/renderWithStore'
import { mockNextRouter } from '@/tests/mocks/router'
import { mockApi, getItemsMock, getCategoriesMock, getDietaryMock, getAddonsMock, getMyOrdersMock } from '@/tests/mocks/api'
import UserFoodOrderPage from './page'

mockNextRouter()
mockApi()

const mockCategories = [
    { id: 'appetizer_id', name: 'Appetizers' },
    { id: 'main_id', name: 'Main Course' },
]

const mockDietary = [
    { id: 'veg_id', name: 'Vegetarian' },
]

const mockItems = [
    {
        id: 'food_1',
        name: 'Pizza Margherita',
        description: 'Classic cheese pizza',
        price: 12,
        base_price: '12.00',
        image: '/pizza.jpg',
        category: 'Main Course',
        preparation_time: 15,
        is_available: true,
        category_id: 'main_id',
        created_at: '2023-01-01',
    }
]

describe('UserFoodOrderPage', () => {

    afterAll(() => {
        vi.restoreAllMocks();
    });

    beforeEach(() => {
        vi.clearAllMocks()
        vi.useFakeTimers({ shouldAdvanceTime: true })

        getCategoriesMock.mockReturnValue({ data: mockCategories, isLoading: false })
        getDietaryMock.mockReturnValue({ data: mockDietary, isLoading: false })
        getAddonsMock.mockReturnValue({ data: [], isLoading: false })
        getItemsMock.mockReturnValue({ data: [], isLoading: false })
        getMyOrdersMock.mockReturnValue({ data: [], isLoading: false })
    })

    test('should render without exploding', () => {
        const { container } = renderWithStore(<UserFoodOrderPage />)
        expect(container).toBeTruthy()
    })

    test('should show spinner when loading', () => {
        getItemsMock.mockReturnValue({ isLoading: true, data: undefined })
        renderWithStore(<UserFoodOrderPage />)
        expect(screen.getByRole('progressbar')).toBeInTheDocument()
    })

    test('should fetch data render card when loading false data is there', async () => {
        getItemsMock.mockReturnValue({ data: mockItems, isLoading: false })
        renderWithStore(<UserFoodOrderPage />)

        await waitFor(() => {
            expect(screen.getByText('Pizza Margherita')).toBeInTheDocument()
            expect(screen.getByText('Classic cheese pizza')).toBeInTheDocument()
        })
    })

    test('should search with name and display data', async () => {
        getItemsMock.mockReturnValue({ data: mockItems, isLoading: false })
        renderWithStore(<UserFoodOrderPage />)

        const searchInput = screen.getByPlaceholderText(/Search menu items by name.../i)

        fireEvent.change(searchInput, { target: { value: 'Pizza' } })

        act(() => {
            vi.advanceTimersByTime(500)
        })

        await waitFor(() => {
            expect(getItemsMock).toHaveBeenCalledWith(expect.objectContaining({ name: 'Pizza' }))
        })
    })

    test('should search with category like Appetizer', async () => {
        renderWithStore(<UserFoodOrderPage />)

        const appetizerTab = screen.getByRole('tab', { name: /Appetizers/i })
        fireEvent.click(appetizerTab)

        await waitFor(() => {
            expect(getItemsMock).toHaveBeenCalledWith(expect.objectContaining({ category: 'appetizer_id' }))
        })
    })

    test('should search with dietary', async () => {
        renderWithStore(<UserFoodOrderPage />)

        const filterIcon = screen.getByTestId('FilterListIcon')
        const filterButton = filterIcon.closest('button')
        if (filterButton) {
            fireEvent.click(filterButton)
        }

        await waitFor(() => {
            expect(screen.getByText('Dietary Preferences')).toBeInTheDocument()
        })

        const vegLabel = screen.getByText('Vegetarian')
        fireEvent.click(vegLabel)


        await waitFor(() => {
            expect(getItemsMock).toHaveBeenCalledWith(expect.objectContaining({ dietary: ['veg_id'] }))
        })
    })
})
