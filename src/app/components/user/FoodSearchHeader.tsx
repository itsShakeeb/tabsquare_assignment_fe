'use client';
import React, { useState } from 'react';
import {
    Box, InputBase, IconButton, Popover, Typography,
    FormGroup, FormControlLabel, Checkbox, Slider, Button
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import { DietaryPreference } from '../../auth/user/types';

interface Props {
    searchQuery: string;
    onSearchChange: (query: string) => void;
    priceRange: number[];
    onPriceRangeChange: (range: number[]) => void;
    dietaryPrefs: DietaryPreference[];
    onDietaryPrefsChange: (prefs: DietaryPreference[]) => void;
}

export default function FoodSearchHeader({
    searchQuery, onSearchChange, priceRange, onPriceRangeChange, dietaryPrefs, onDietaryPrefsChange
}: Props) {
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleDietaryChange = (pref: DietaryPreference) => {
        if (dietaryPrefs.includes(pref)) {
            onDietaryPrefsChange(dietaryPrefs.filter(p => p !== pref));
        } else {
            onDietaryPrefsChange([...dietaryPrefs, pref]);
        }
    };

    const open = Boolean(anchorEl);
    const id = open ? 'filter-popover' : undefined;

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                bgcolor: '#fff',
                borderRadius: '12px',
                px: 2,
                py: 1,
                mb: 3,
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                border: '1px solid #f0f0f0',
            }}
        >
            <SearchIcon sx={{ color: '#9e9e9e', mr: 1, fontSize: '1.5rem' }} />
            <InputBase
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search menu items by name..."
                sx={{ ml: 1, flex: 1, fontSize: '0.95rem', fontWeight: 500 }}
            />
            <IconButton size="small" sx={{ color: dietaryPrefs.length > 0 || priceRange[1] < 100 ? '#f26a1b' : '#616161' }} onClick={handleClick}>
                <FilterListIcon />
            </IconButton>

            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                PaperProps={{
                    sx: { width: 300, p: 2, mt: 1, borderRadius: 2 }
                }}
            >
                <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 2 }}>
                    Filters
                </Typography>

                <Typography variant="body2" color="text.secondary" fontWeight={600} sx={{ mb: 1 }}>
                    Price Range ($)
                </Typography>
                <Box sx={{ px: 1, mb: 3 }}>
                    <Slider
                        value={priceRange}
                        onChange={(_, newValue) => onPriceRangeChange(newValue as number[])}
                        valueLabelDisplay="auto"
                        min={0}
                        max={100}
                        sx={{ color: '#f26a1b' }}
                    />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', color: 'text.secondary', fontSize: '0.8rem' }}>
                        <span>${priceRange[0]}</span>
                        <span>${priceRange[1]}</span>
                    </Box>
                </Box>

                <Typography variant="body2" color="text.secondary" fontWeight={600} sx={{ mb: 1 }}>
                    Dietary Preferences
                </Typography>
                <FormGroup>
                    {(['Vegetarian', 'Vegan', 'Gluten-Free'] as DietaryPreference[]).map((pref) => (
                        <FormControlLabel
                            key={pref}
                            control={
                                <Checkbox
                                    checked={dietaryPrefs.includes(pref)}
                                    onChange={() => handleDietaryChange(pref)}
                                    sx={{
                                        color: '#bdbdbd',
                                        '&.Mui-checked': { color: '#f26a1b' }
                                    }}
                                />
                            }
                            label={<Typography variant="body2">{pref}</Typography>}
                        />
                    ))}
                </FormGroup>

                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
                    <Button
                        onClick={() => {
                            onPriceRangeChange([0, 100]);
                            onDietaryPrefsChange([]);
                            handleClose();
                        }}
                        sx={{ color: '#757575', textTransform: 'none', mr: 1 }}
                    >
                        Reset
                    </Button>
                    <Button
                        variant="contained"
                        onClick={handleClose}
                        sx={{ bgcolor: '#f26a1b', textTransform: 'none', boxShadow: 'none', '&:hover': { bgcolor: '#d95d16', boxShadow: 'none' } }}
                    >
                        Apply
                    </Button>
                </Box>
            </Popover>
        </Box>
    );
}
