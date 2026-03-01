'use client';
import React, { useState } from 'react';
import { Card, CardContent, CardMedia, Typography, Box, IconButton, Chip } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { FoodItem } from '../../auth/user/types';

interface Props {
    item: FoodItem;
    onClick: (item: FoodItem) => void;
}

export default function FoodCard({ item, onClick }: Props) {
    const [isFavorite, setIsFavorite] = useState(false);

    return (
        <Card
            sx={{
                borderRadius: 4,
                boxShadow: 'none',
                position: 'relative',
                bgcolor: 'transparent',
                cursor: item.isAvailable ? 'pointer' : 'default',
                opacity: item.isAvailable ? 1 : 0.6,
                transition: 'transform 0.2s',
                '&:hover': {
                    transform: item.isAvailable ? 'translateY(-4px)' : 'none',
                }
            }}
            onClick={() => { if (item.isAvailable) onClick(item); }}
        >
            <Box sx={{ position: 'relative' }}>
                <CardMedia
                    component="img"
                    height="160"
                    image={item.imageUrl}
                    alt={item.name}
                    sx={{ borderRadius: 4, objectFit: 'cover' }}
                />

                {/* Dietary Tags */}
                <Box sx={{ position: 'absolute', top: 8, left: 8, display: 'flex', gap: 0.5, flexWrap: 'wrap', maxWidth: '80%' }}>
                    {item.dietaryPreferences.map(pref => (
                        <Chip
                            key={pref}
                            label={pref}
                            size="small"
                            sx={{
                                bgcolor: 'rgba(255,255,255,0.9)',
                                color: pref === 'Vegetarian' || pref === 'Vegan' ? '#2e7d32' : '#ed6c02',
                                fontWeight: 600,
                                fontSize: '0.65rem',
                                height: 20,
                            }}
                        />
                    ))}
                </Box>

                {/* Availability Overlay */}
                {!item.isAvailable && (
                    <Box sx={{
                        position: 'absolute',
                        top: 0, left: 0, right: 0, bottom: 0,
                        bgcolor: 'rgba(255,255,255,0.6)',
                        borderRadius: 4,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <Chip label="Sold Out" color="error" size="small" sx={{ fontWeight: 600 }} />
                    </Box>
                )}

                <IconButton
                    onClick={(e) => { e.stopPropagation(); setIsFavorite(!isFavorite); }}
                    sx={{
                        position: 'absolute',
                        bottom: -16,
                        right: 16,
                        bgcolor: '#fff',
                        '&:hover': { bgcolor: '#f5f5f5' },
                        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                        width: 36,
                        height: 36,
                        zIndex: 2,
                    }}
                >
                    {isFavorite ? (
                        <FavoriteIcon sx={{ color: '#f26a1b', fontSize: '1.2rem' }} />
                    ) : (
                        <FavoriteBorderIcon sx={{ color: '#f26a1b', fontSize: '1.2rem' }} />
                    )}
                </IconButton>
            </Box>

            <CardContent sx={{ px: 0, pt: 2.5, pb: '12px !important' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <Box sx={{ pr: 2 }}>
                        <Typography variant="subtitle1" fontWeight={700} sx={{ lineHeight: 1.2, mb: 0.5 }}>
                            {item.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.8rem', mb: 1, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                            {item.description}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary', fontSize: '0.75rem', fontWeight: 500 }}>
                            <AccessTimeIcon sx={{ fontSize: '1rem', mr: 0.5 }} />
                            {item.preparationTime} mins
                        </Box>
                    </Box>
                    <Typography variant="subtitle1" fontWeight={800} sx={{ color: '#111827' }}>
                        ${item.price.toFixed(2)}
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );
}
