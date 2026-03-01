'use client';
import React from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import AllInclusiveIcon from '@mui/icons-material/AllInclusive';
import TapasIcon from '@mui/icons-material/Tapas';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import CakeIcon from '@mui/icons-material/Cake';
import LocalCafeIcon from '@mui/icons-material/LocalCafe';
import { Category } from '../../auth/user/types';

const categories: { label: Category; icon: React.ReactElement }[] = [
    { label: 'All', icon: <AllInclusiveIcon fontSize="small" /> },
    { label: 'Appetizers', icon: <TapasIcon fontSize="small" /> },
    { label: 'Main Course', icon: <RestaurantMenuIcon fontSize="small" /> },
    { label: 'Desserts', icon: <CakeIcon fontSize="small" /> },
    { label: 'Beverages', icon: <LocalCafeIcon fontSize="small" /> },
];

interface Props {
    selectedCategory: Category;
    onSelectCategory: (category: Category) => void;
}

export default function CategoryTabs({ selectedCategory, onSelectCategory }: Props) {
    const handleTabChange = (_: React.SyntheticEvent, newValue: Category) => {
        onSelectCategory(newValue);
    };

    return (
        <Box sx={{ width: '100%', mb: 3, borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
                value={selectedCategory}
                onChange={handleTabChange}
                variant="scrollable"
                scrollButtons="auto"
                sx={{
                    '& .MuiTabs-indicator': {
                        backgroundColor: '#f26a1b',
                        height: 3,
                        borderRadius: '3px 3px 0 0',
                    },
                    '& .MuiTab-root': {
                        textTransform: 'none',
                        minHeight: 48,
                        fontWeight: 600,
                        fontSize: '0.9rem',
                        color: '#757575',
                        '&.Mui-selected': {
                            color: '#111827',
                        },
                    },
                }}
            >
                {categories.map((cat) => (
                    <Tab
                        key={cat.label}
                        value={cat.label}
                        icon={cat.icon}
                        iconPosition="start"
                        label={cat.label}
                    />
                ))}
            </Tabs>
        </Box>
    );
}
