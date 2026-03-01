'use client';
import React, { useState, useEffect } from 'react';
import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    Button, Typography, Box, IconButton, Divider,
    RadioGroup, Radio, FormControlLabel, Checkbox, TextField
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { FoodItem, ItemSize, FoodAddon, CartItem } from '../../auth/user/types';
import { useAppDispatch } from '../../../lib/hooks';
import { addToCart } from '../../../lib/features/cart/cartSlice';

interface Props {
    open: boolean;
    food: FoodItem | null;
    onClose: () => void;
}

export default function ItemDetailsModal({ open, food, onClose }: Props) {
    const dispatch = useAppDispatch();

    const [selectedSize, setSelectedSize] = useState<ItemSize | undefined>();
    const [selectedAddons, setSelectedAddons] = useState<FoodAddon[]>([]);
    const [specialInstructions, setSpecialInstructions] = useState('');
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        if (open && food) {
            setSelectedSize(food.availableSizes ? food.availableSizes[0] : undefined);
            setSelectedAddons([]);
            setSpecialInstructions('');
            setQuantity(1);
        }
    }, [open, food]);

    if (!food) return null;

    const handleAddonChange = (addon: FoodAddon) => {
        if (selectedAddons.find(a => a.id === addon.id)) {
            setSelectedAddons(selectedAddons.filter(a => a.id !== addon.id));
        } else {
            setSelectedAddons([...selectedAddons, addon]);
        }
    };

    const addonsTotal = selectedAddons.reduce((sum, addon) => sum + addon.price, 0);
    // Rough size pricing logic for demo purposes:
    const sizeMultiplier = selectedSize === 'Large' ? 1.25 : selectedSize === 'Extra Large' ? 1.5 : 1;
    const basePrice = (food.price * sizeMultiplier) + addonsTotal;
    const itemTotal = basePrice * quantity;

    const handleAddToCart = () => {
        const cartItem: CartItem = {
            id: `${food.id}-${selectedSize || 'default'}-${selectedAddons.map(a => a.id).sort().join('-')}-${specialInstructions}`,
            foodItemId: food.id,
            name: food.name,
            basePrice: basePrice,
            totalPrice: itemTotal,
            quantity: quantity,
            imageUrl: food.imageUrl,
            options: {
                size: selectedSize,
                addons: selectedAddons,
                specialInstructions: specialInstructions || undefined,
            }
        };

        dispatch(addToCart(cartItem));
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm" PaperProps={{ sx: { borderRadius: 3 } }}>
            <DialogTitle sx={{ m: 0, p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6" fontWeight={700}>Customize Item</Typography>
                <IconButton onClick={onClose} size="small"><CloseIcon /></IconButton>
            </DialogTitle>
            <Divider />

            <DialogContent dividers sx={{ p: 0 }}>
                {/* Header Info */}
                <Box sx={{ p: 3, display: 'flex', gap: 2 }}>
                    <Box component="img" src={food.imageUrl} sx={{ width: 100, height: 100, borderRadius: 2, objectFit: 'cover' }} />
                    <Box>
                        <Typography variant="h6" fontWeight={700} sx={{ lineHeight: 1.2, mb: 0.5 }}>{food.name}</Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>{food.description}</Typography>
                        <Typography variant="subtitle1" fontWeight={700} color="primary.main">${food.price.toFixed(2)} Base</Typography>
                    </Box>
                </Box>
                <Divider />

                {/* Size Selection */}
                {food.availableSizes && food.availableSizes.length > 0 && (
                    <Box sx={{ p: 3 }}>
                        <Typography variant="subtitle2" fontWeight={700} sx={{ mb: 1 }}>Choose Size</Typography>
                        <RadioGroup
                            value={selectedSize}
                            onChange={(e) => setSelectedSize(e.target.value as ItemSize)}
                        >
                            {food.availableSizes.map(size => (
                                <FormControlLabel
                                    key={size}
                                    value={size}
                                    control={<Radio sx={{ color: '#f26a1b', '&.Mui-checked': { color: '#f26a1b' } }} />}
                                    label={<Typography variant="body2">{size}</Typography>}
                                    sx={{ mb: 0.5 }}
                                />
                            ))}
                        </RadioGroup>
                    </Box>
                )}
                {food.availableSizes && <Divider />}

                {/* Add-ons */}
                {food.availableAddons && food.availableAddons.length > 0 && (
                    <Box sx={{ p: 3 }}>
                        <Typography variant="subtitle2" fontWeight={700} sx={{ mb: 1 }}>Add-ons</Typography>
                        {food.availableAddons.map(addon => (
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
                                <Typography variant="body2" fontWeight={600} color="text.secondary">+${addon.price.toFixed(2)}</Typography>
                            </Box>
                        ))}
                    </Box>
                )}
                {food.availableAddons && <Divider />}

                {/* Special Instructions */}
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

            {/* Footer / Actions */}
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
