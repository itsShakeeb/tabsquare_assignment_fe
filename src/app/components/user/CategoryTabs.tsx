'use client';
import React from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import AllInclusiveIcon from '@mui/icons-material/AllInclusive';
import TapasIcon from '@mui/icons-material/Tapas';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import CakeIcon from '@mui/icons-material/Cake';
import LocalCafeIcon from '@mui/icons-material/LocalCafe';
import { useGetCategoriesQuery } from '@/lib/api';
import { Category } from '@/lib/features/item/type';



const categoriesIcons = (category: Category) => {
    switch (category.name.toLowerCase()) {
        case 'appetizers':
            return <TapasIcon fontSize="small" />;
        case 'main course':
            return <RestaurantMenuIcon fontSize="small" />;
        case 'desserts':
            return <CakeIcon fontSize="small" />;
        case 'beverages':
            return <LocalCafeIcon fontSize="small" />;
        default:
            return <AllInclusiveIcon fontSize="small" />;
    }
}

interface Props {
    selectedCategory: string;
    onSelectCategory: (category: string) => void;
}

export default function CategoryTabs({ selectedCategory, onSelectCategory }: Props) {

    const { data: allCategories = [] } = useGetCategoriesQuery();

    const categories = [
        { label: 'All', icon: <AllInclusiveIcon fontSize="small" />, id: 'all' },
        ...allCategories.map((cat) => ({ label: cat.name, icon: categoriesIcons(cat), id: cat.id })),
    ];

    const handleTabChange = (_: React.SyntheticEvent, newValue: string) => {
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
                        value={cat.id}
                        icon={cat.icon}
                        iconPosition="start"
                        label={cat.label}
                    />
                ))}
            </Tabs>
        </Box>
    );
}
