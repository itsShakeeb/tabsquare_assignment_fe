"use client"

import { Box, Button, FormControl, TextField, Typography, Paper, InputAdornment, IconButton } from "@mui/material"
import { useEffect, useState } from "react"
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import { useSigninMutation } from "@/lib/api";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setCredentials } from "@/lib/features/auth/authSlice";
import { useRouter } from "next/navigation";
import { RootState } from "@/lib/store";

const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false);
    const [signin, { isLoading }] = useSigninMutation()
    const dispatch = useAppDispatch()
    const router = useRouter()
    const { user, isLoggedIn } = useAppSelector((state: RootState) => state.auth)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const res = await signin({ email, password }).unwrap()
            const role = res.role

            dispatch(setCredentials(res))
            router.push(role === 'admin' ? '/auth/admin' : '/auth/user')
        } catch (error) {
            console.log(error)
        }
    }

    const handleClickShowPassword = () => setShowPassword((show) => !show);


    useEffect(() => {
        if (user && isLoggedIn) {
            router.replace(user.role === 'admin' ? '/auth/admin' : '/auth/user')
        }
    }, [user, isLoggedIn, router])

    return (
        <Box sx={{
            width: '100%',
            minHeight: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            bgcolor: '#f9fafb'
        }}>
            <Paper
                elevation={3}
                sx={{
                    p: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 3,
                    width: '100%',
                    maxWidth: 400,
                    borderRadius: '16px',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.05)'
                }}
            >
                <Box textAlign="center">
                    <Typography variant="h4" fontWeight={700} sx={{ color: '#333', mb: 1 }}>
                        Welcome Back
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Please enter your details to sign in.
                    </Typography>
                </Box>

                <FormControl
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}
                >
                    <TextField
                        label="Email Address"
                        variant="outlined"
                        fullWidth
                        id="email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <EmailIcon sx={{ color: '#9e9e9e' }} />
                                    </InputAdornment>
                                ),
                                sx: { borderRadius: '8px' }
                            }
                        }}
                    />

                    <TextField
                        label="Password1"
                        variant="outlined"
                        fullWidth
                        type={showPassword ? 'text' : 'password'}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <LockIcon sx={{ color: '#9e9e9e' }} />
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                                sx: { borderRadius: '8px' }
                            }
                        }}
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        fullWidth
                        disabled={isLoading}
                        sx={{
                            mt: 1,
                            bgcolor: '#f26a1b',
                            color: '#fff',
                            fontWeight: 600,
                            borderRadius: '8px',
                            py: 1.5,
                            textTransform: 'none',
                            fontSize: '1rem',
                            boxShadow: '0 4px 12px rgba(242, 106, 27, 0.2)',
                            '&:hover': {
                                bgcolor: '#d95d16',
                                boxShadow: '0 6px 16px rgba(242, 106, 27, 0.3)'
                            }
                        }}
                    >
                        {isLoading ? 'Logging in...' : 'Login'}
                    </Button>
                </FormControl>
            </Paper>
        </Box>
    )
}

export default Login