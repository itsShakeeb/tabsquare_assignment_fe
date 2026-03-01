'use client';
import React from 'react';
import { Box, Typography, Button, IconButton, Divider, Select, MenuItem, Chip } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useAppSelector, useAppDispatch } from '../../../lib/hooks';
import { updateQuantity, removeFromCart } from '../../../lib/features/cart/cartSlice';

export default function CartSidebar() {
    const dispatch = useAppDispatch();
    const items = useAppSelector(state => state.cart.items);

    const handleQuantityChange = (id: string, newQuantity: number) => {
        dispatch(updateQuantity({ id, quantity: newQuantity }));
    };

    const handleRemoveItem = (id: string) => {
        dispatch(removeFromCart(id));
    };

    const subTotal = items.reduce((sum, item) => sum + item.totalPrice, 0);
    const deliveryFee = items.length > 0 ? 9 : 0;
    const total = subTotal + deliveryFee;

    return (
        <Box sx={{ width: 350, bgcolor: '#fff', borderRadius: 4, p: 3, boxShadow: '0 4px 24px rgba(0,0,0,0.04)', display: 'flex', flexDirection: 'column', height: '100%' }}>
            <Typography variant="h5" fontWeight={700} sx={{ mb: 3 }}>
                My Orders
            </Typography>

            {/* Delivery Info */}
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

            {/* Cart Items */}
            <Box sx={{ flexGrow: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 3 }}>
                {items.length === 0 ? (
                    <Box sx={{ textAlign: 'center', color: 'text.secondary', mt: 4 }}>
                        <Typography variant="body1">Your cart is empty.</Typography>
                    </Box>
                ) : (
                    items.map((item) => (
                        <Box key={item.id} sx={{ display: 'flex', gap: 2 }}>
                            <Box
                                component="img"
                                src={item.imageUrl}
                                sx={{ width: 64, height: 64, borderRadius: 3, objectFit: 'cover' }}
                            />
                            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Typography variant="subtitle2" fontWeight={700} sx={{ lineHeight: 1.2, pr: 1 }}>
                                        {item.name}
                                    </Typography>
                                    <Typography variant="subtitle2" fontWeight={800} color="primary.main">
                                        ${item.totalPrice.toFixed(2)}
                                    </Typography>
                                </Box>

                                {/* Customizations */}
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                    {item.options.size && (
                                        <Chip label={item.options.size} size="small" sx={{ height: 18, fontSize: '0.65rem' }} />
                                    )}
                                    {item.options.addons.map(addon => (
                                        <Chip key={addon.id} label={'+ ' + addon.name} size="small" sx={{ height: 18, fontSize: '0.65rem', bgcolor: '#f5f5f5' }} />
                                    ))}
                                </Box>
                                {item.options.specialInstructions && (
                                    <Typography variant="caption" color="text.secondary" sx={{ fontStyle: 'italic', fontSize: '0.7rem' }}>
                                        Wait: "{item.options.specialInstructions}"
                                    </Typography>
                                )}

                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5, justifyContent: 'space-between' }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>Qty:</Typography>
                                        <Select
                                            value={item.quantity}
                                            onChange={(e) => handleQuantityChange(item.id, Number(e.target.value))}
                                            size="small"
                                            sx={{
                                                width: 65, height: 30, borderRadius: 2, bgcolor: '#fafafa',
                                                fontSize: '0.875rem', fontWeight: 600,
                                                '& fieldset': { border: 'none' },
                                            }}
                                        >
                                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => <MenuItem key={n} value={n} sx={{ fontSize: '0.875rem' }}>{n}</MenuItem>)}
                                        </Select>
                                    </Box>
                                    <IconButton size="small" color="error" onClick={() => handleRemoveItem(item.id)}>
                                        <DeleteOutlineIcon fontSize="small" />
                                    </IconButton>
                                </Box>
                            </Box>
                        </Box>
                    ))
                )}
            </Box>

            {/* Pricing Details */}
            <Box sx={{ mt: 4 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" color="text.secondary">Sub Total</Typography>
                    <Typography variant="subtitle2" fontWeight={700}>${subTotal.toFixed(2)}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                    <Typography variant="body2" color="text.secondary">Delivery Fee</Typography>
                    <Typography variant="subtitle2" fontWeight={700}>${deliveryFee.toFixed(2)}</Typography>
                </Box>



                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3, alignItems: 'center' }}>
                    <Typography variant="body1" color="text.secondary" fontWeight={500}>Total</Typography>
                    <Typography variant="h5" fontWeight={800}>${total.toFixed(2)}</Typography>
                </Box>

                <Button
                    variant="contained"
                    fullWidth
                    disabled={items.length === 0}
                    sx={{
                        bgcolor: '#f26a1b', color: '#fff', textTransform: 'none', fontWeight: 700, fontSize: '1rem', borderRadius: 3, py: 2, boxShadow: 'none',
                        '&:hover': { bgcolor: '#d95d16', boxShadow: 'none' },
                        '&.Mui-disabled': { bgcolor: '#ffccb3', color: '#fff' }
                    }}
                >
                    Check out
                </Button>
            </Box>
        </Box>
    );
}
