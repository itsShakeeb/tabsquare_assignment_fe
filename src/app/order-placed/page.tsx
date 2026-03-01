'use client';

import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useRouter } from 'next/navigation';

export default function OrderPlaced() {
    const router = useRouter();

    return (
        <Container maxWidth="sm">
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '80vh',
                textAlign: 'center',
                gap: 3
            }}>
                <CheckCircleOutlineIcon sx={{ fontSize: 100, color: 'success.main' }} />

                <Typography variant="h3" fontWeight={800} color="text.primary">
                    Order Placed!
                </Typography>

                <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                    Thank you for your order. We are preparing your delicious food and it will be delivered to you soon!
                </Typography>

                <Button
                    variant="contained"
                    size="large"
                    onClick={() => router.push('/auth/user')}
                    sx={{
                        bgcolor: '#f26a1b',
                        color: '#fff',
                        textTransform: 'none',
                        fontWeight: 700,
                        fontSize: '1rem',
                        borderRadius: 3,
                        py: 1.5,
                        px: 4,
                        boxShadow: 'none',
                        '&:hover': { bgcolor: '#d95d16', boxShadow: 'none' },
                    }}
                >
                    Back to Menu
                </Button>
            </Box>
        </Container>
    );
}
