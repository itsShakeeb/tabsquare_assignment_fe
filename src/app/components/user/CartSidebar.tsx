'use client';
import React, { useState } from 'react';
import { Box, Typography, Button, IconButton, Divider, Select, MenuItem, Chip, CircularProgress } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useAppDispatch } from '../../../lib/hooks';
import { removeFromCart } from '../../../lib/features/cart/cartSlice';
import { useGetCartItemsQuery, useDeleteCartItemMutation, useCheckoutMutation } from '../../../lib/api';
import { useRouter } from 'next/navigation';

export default function CartSidebar() {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const [deleteCartItem] = useDeleteCartItemMutation();
    const [checkout] = useCheckoutMutation();
    const { data: cartItems = { items: [], summary: { subtotal: 0, delivery_fee: 0, total: 0, tax: 0 } } } = useGetCartItemsQuery();

    const [isCheckingOut, setIsCheckingOut] = useState(false);


    const handleRemoveItem = async (id: string) => {
        try {
            await deleteCartItem(id).unwrap();
            dispatch(removeFromCart(id));
        } catch (error) {
            console.error('Failed to remove item from cart:', error);
        }
    };

    const subTotal = Number(cartItems?.summary?.subtotal) || 0;
    const tax = Number(cartItems?.summary?.tax) || 0;
    const total = Number(cartItems?.summary?.total) || 0;

    const handleCheckout = async () => {
        try {
            setIsCheckingOut(true);
            await checkout().unwrap();

            setTimeout(() => {
                router.push('/order-placed');
            }, 1000);
        } catch (error) {
            setIsCheckingOut(false);
        }
    }

    return (
        <Box sx={{ width: 350, bgcolor: '#fff', borderRadius: 4, p: 3, boxShadow: '0 4px 24px rgba(0,0,0,0.04)', display: 'flex', flexDirection: 'column', height: '100%' }}>
            <Typography variant="h5" fontWeight={700} sx={{ mb: 3 }}>
                My Orders
            </Typography>

            <Box sx={{ mb: 3 }}>
                <Typography variant="body2" color="text.secondary" fontWeight={600} sx={{ mb: 0.5 }}>
                    Delivery address
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Typography variant="h6" fontWeight={700} fontSize="1.1rem">
                        1341 Morris Street
                    </Typography>
                    <IconButton size="small"><KeyboardArrowDownIcon /></IconButton>
                </Box>
                <Box sx={{ display: 'flex', gap: 2, color: 'text.secondary', fontSize: '0.75rem', alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <AccessTimeIcon sx={{ fontSize: '1rem' }} /> 40 mins
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <LocationOnOutlinedIcon sx={{ fontSize: '1rem' }} /> 4 Kms
                    </Box>
                </Box>
            </Box>

            <Divider sx={{ mb: 3 }} />

            <Box sx={{ flexGrow: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 3 }}>
                {cartItems.items.length === 0 ? (
                    <Box sx={{ textAlign: 'center', color: 'text.secondary', mt: 4 }}>
                        <Typography variant="body1">Your cart is empty.</Typography>
                    </Box>
                ) : (
                    cartItems.items.map((item) => (
                        <Box key={item.id} sx={{ display: 'flex', gap: 2 }}>
                            <Box
                                component="img"
                                src={item.image}
                                sx={{ width: 64, height: 64, borderRadius: 3, objectFit: 'cover' }}
                            />
                            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Typography variant="subtitle2" fontWeight={700} sx={{ lineHeight: 1.2, pr: 1 }}>
                                        {item.name}
                                    </Typography>
                                    <Typography variant="subtitle2" fontWeight={800} color="primary.main">
                                        ${Number(item.base_price).toFixed(2)}
                                    </Typography>
                                </Box>

                                {item.options?.instructions && (
                                    <Typography variant="caption" color="text.secondary" sx={{ fontStyle: 'italic', fontSize: '0.7rem' }}>
                                        Wait: "{item.options.instructions}"
                                    </Typography>
                                )}

                                <IconButton size="small" color="error" onClick={() => handleRemoveItem(item.item_id)} sx={{ alignSelf: 'flex-end' }}>
                                    <DeleteOutlineIcon fontSize="small" />
                                </IconButton>
                            </Box>
                        </Box>
                    ))
                )}
            </Box>

            <Box sx={{ mt: 4 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" color="text.secondary">Sub Total</Typography>
                    <Typography variant="subtitle2" fontWeight={700}>${subTotal.toFixed(2)}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                    <Typography variant="body2" color="text.secondary">Tax</Typography>
                    <Typography variant="subtitle2" fontWeight={700}>${tax.toFixed(2)}</Typography>
                </Box>



                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3, alignItems: 'center' }}>
                    <Typography variant="body1" color="text.secondary" fontWeight={500}>Total</Typography>
                    <Typography variant="h5" fontWeight={800}>${total.toFixed(2)}</Typography>
                </Box>

                <Button
                    variant="contained"
                    fullWidth
                    onClick={handleCheckout}
                    disabled={cartItems.items.length === 0 || isCheckingOut}
                    sx={{
                        bgcolor: '#f26a1b', color: '#fff', textTransform: 'none', fontWeight: 700, fontSize: '1rem', borderRadius: 3, py: 2, boxShadow: 'none',
                        '&:hover': { bgcolor: '#d95d16', boxShadow: 'none' },
                        '&.Mui-disabled': { bgcolor: '#ffccb3', color: '#fff' }
                    }}
                >
                    {isCheckingOut ? <CircularProgress size={24} color="inherit" /> : 'Check out'}
                </Button>
            </Box>
        </Box>
    );
}
