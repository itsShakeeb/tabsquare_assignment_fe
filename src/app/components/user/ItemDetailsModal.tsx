'use client';
import React, { useState, useEffect } from 'react';
import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    Button, Typography, Box, IconButton, Divider, FormControlLabel, Checkbox, TextField,
    FormControl, Select, MenuItem
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Item, ItemSize } from '../../auth/user/types';
import { useAddToCartMutation, useGetAddonsQuery } from '../../../lib/api';
import { Addon, ItemResposne } from '../../../lib/features/item/type';

interface Props {
    open: boolean;
    food: ItemResposne | null;
    onClose: () => void;
}

export default function ItemDetailsModal({ open, food, onClose }: Props) {

    const [selectedAddons, setSelectedAddons] = useState<Addon[]>([]);
    const [selectedSize, setSelectedSize] = useState<ItemSize>('regular');
    const { data: addons = [] } = useGetAddonsQuery();
    const [addToCart, { isLoading }] = useAddToCartMutation();
    const [specialInstructions, setSpecialInstructions] = useState('');
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        if (open && food) {
            setSelectedAddons([]);
            setSpecialInstructions('');
            setQuantity(1);
        }
    }, [open, food]);

    if (!food) return null;

    const handleAddonChange = (addon: Addon) => {
        if (selectedAddons.find(a => a.id === addon.id)) {
            setSelectedAddons(selectedAddons.filter(a => a.id !== addon.id));
        } else {
            setSelectedAddons([...selectedAddons, addon]);
        }
    };

    const addonsTotal = selectedAddons.reduce((sum, addon) => sum + Number(addon.price), 0);
    const basePrice = (Number(food.base_price)) + addonsTotal;
    const itemTotal = basePrice * quantity;

    const handleAddToCart = async () => {
        const cartItem: Pick<Item, 'item_id' | 'size' | 'quantity' | 'options'> = {
            item_id: food.id,
            size: selectedSize,
            quantity: quantity,
            options: {
                addons: selectedAddons.map(a => ({ id: a.id })),
                instruction: specialInstructions || undefined,
            }
        };
        try {
            await addToCart(cartItem).unwrap();
            onClose();
        } catch (error) {
            console.error('Failed to add item to cart:', error);
        }
    };


    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm" PaperProps={{ sx: { borderRadius: 3 } }}>
            <DialogTitle sx={{ m: 0, p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6" fontWeight={700}>Customize Item</Typography>
                <IconButton onClick={onClose} size="small"><CloseIcon /></IconButton>
            </DialogTitle>
            <Divider />

            <DialogContent dividers sx={{ p: 0 }}>

                <Box sx={{ p: 3, display: 'flex', gap: 2 }}>
                    <Box component="img" src={food.image} sx={{ width: 100, height: 100, borderRadius: 2, objectFit: 'cover' }} />
                    <Box>
                        <Typography variant="h6" fontWeight={700} sx={{ lineHeight: 1.2, mb: 0.5 }}>{food.name}</Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>{food.description}</Typography>
                        <Typography variant="subtitle1" fontWeight={700} color="primary.main">${Number(food.base_price).toFixed(2)} Base</Typography>
                    </Box>
                </Box>
                <Divider />

                <Box sx={{ p: 3 }}>
                    <Typography variant="subtitle2" fontWeight={700} sx={{ mb: 1 }}>Size</Typography>
                    <FormControl fullWidth size="small">
                        <Select
                            value={selectedSize}
                            onChange={(e) => setSelectedSize(e.target.value as ItemSize)}
                            sx={{ borderRadius: 2 }}
                        >
                            <MenuItem value="regular">Regular</MenuItem>
                            <MenuItem value="medium">Medium</MenuItem>
                            <MenuItem value="large">Large</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                <Divider />

                {addons && addons.length > 0 && (
                    <Box sx={{ p: 3 }}>
                        <Typography variant="subtitle2" fontWeight={700} sx={{ mb: 1 }}>Add-ons</Typography>
                        {addons.map(addon => (
                            <Box key={addon.id} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={!!selectedAddons.find(a => a.id === addon.id)}
                                            onChange={() => handleAddonChange(addon)}
                                            sx={{ color: '#bdbdbd', '&.Mui-checked': { color: '#f26a1b' } }}
                                        />
                                    }
                                    label={<Typography variant="body2">{addon.name}</Typography>}
                                />
                                <Typography variant="body2" fontWeight={600} color="text.secondary">+${Number(addon.price).toFixed(2)}</Typography>
                            </Box>
                        ))}
                    </Box>
                )}
                {addons.length > 0 && <Divider />}


                <Box sx={{ p: 3 }}>
                    <Typography variant="subtitle2" fontWeight={700} sx={{ mb: 1 }}>Special Instructions</Typography>
                    <TextField
                        fullWidth
                        multiline
                        rows={3}
                        placeholder="E.g. No mayo, extra spicy..."
                        variant="outlined"
                        value={specialInstructions}
                        onChange={(e) => setSpecialInstructions(e.target.value)}
                        InputProps={{
                            sx: { borderRadius: 2, fontSize: '0.875rem' }
                        }}
                    />
                </Box>
            </DialogContent>


            <DialogActions sx={{ p: 3, display: 'flex', justifyContent: 'space-between', bgcolor: '#fafafa' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', bgcolor: '#fff', border: '1px solid #e0e0e0', borderRadius: 2 }}>
                    <IconButton size="small" onClick={() => setQuantity(Math.max(1, quantity - 1))} sx={{ color: quantity > 1 ? '#000' : '#bdbdbd' }}>
                        <RemoveIcon fontSize="small" />
                    </IconButton>
                    <Typography sx={{ px: 2, fontWeight: 600 }}>{quantity}</Typography>
                    <IconButton size="small" onClick={() => setQuantity(quantity + 1)} sx={{ color: '#000' }}>
                        <AddIcon fontSize="small" />
                    </IconButton>
                </Box>
                <Button
                    variant="contained"
                    onClick={handleAddToCart}
                    disabled={isLoading}
                    sx={{
                        bgcolor: '#f26a1b',
                        color: '#fff',
                        textTransform: 'none',
                        fontWeight: 700,
                        px: 4,
                        py: 1.5,
                        borderRadius: 2,
                        boxShadow: 'none',
                        '&:hover': { bgcolor: '#d95d16', boxShadow: 'none' }
                    }}
                >
                    Add ${itemTotal.toFixed(2)}
                </Button>
            </DialogActions>
        </Dialog>
    );
}
