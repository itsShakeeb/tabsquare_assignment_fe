import { vi } from 'vitest'

export const pushMock = vi.fn()
export const replaceMock = vi.fn()
export const refreshMock = vi.fn()


export const mockNextRouter = () => {
    vi.mock('next/navigation', () => ({
        useRouter: () => ({
            push: pushMock,
            replace: replaceMock,
            refresh: refreshMock,
        }),
        usePathname: () => '/',
        useSearchParams: () => new URLSearchParams(),
    }))
}