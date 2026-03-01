export interface SigninRequest {
    email: string
    password: string
}

export interface SigninResponse {

    id: string
    email: string,
    role: 'admin' | 'user'
    token: string,
    isLoggedIn: boolean
}