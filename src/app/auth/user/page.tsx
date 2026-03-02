'use client';
import React, { useState } from 'react';
import { Box, CircularProgress, Grid, Typography } from '@mui/material';
import FoodSearchHeader from '../../components/user/FoodSearchHeader';
import CategoryTabs from '../../components/user/CategoryTabs';
import FoodCard from '../../components/user/FoodCard';
import MyLatestOrder from '../../components/user/MyLatestOrder';
import ItemDetailsModal from '../../components/user/ItemDetailsModal';
import { useGetItemsQuery } from '@/lib/api';
import { useDebounce } from '@/hooks/useDebounce';
import { ItemResposne } from '@/lib/features/item/type';


export default function UserFoodOrderPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const debouncedSearchQuery = useDebounce(searchQuery, 500);
    const [priceRange, setPriceRange] = useState<number[]>([0, 100]);
    const [dietaryPrefs, setDietaryPrefs] = useState<string[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [selectedFood, setSelectedFood] = useState<ItemResposne | null>(null);
    const { data: items = [], isLoading } = useGetItemsQuery({ category: selectedCategory, dietary: dietaryPrefs, name: debouncedSearchQuery })

    const handleFoodClick = (item: ItemResposne) => {
        setSelectedFood(item);
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <MyLatestOrder />

            <FoodSearchHeader
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                priceRange={priceRange}
                onPriceRangeChange={setPriceRange}
                dietaryPrefs={dietaryPrefs}
                onDietaryPrefsChange={setDietaryPrefs}
            />

            <CategoryTabs
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
            />

            <Grid container spacing={3}>
                {isLoading ? (
                    <Box sx={{ width: '100%', py: 8, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <CircularProgress />
                    </Box>
                ) : items.length > 0 ? (
                    items.map(food => (
                        <Grid key={food.id} size={4}>
                            <FoodCard item={food} onClick={handleFoodClick} />
                        </Grid>
                    ))
                ) : (
                    <Box sx={{ width: '100%', py: 8, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Typography variant="h6" color="text.secondary">
                            No menu items found matching your filters.
                        </Typography>
                    </Box>
                )}
            </Grid>

            <ItemDetailsModal
                open={!!selectedFood}
                food={selectedFood}
                onClose={() => setSelectedFood(null)}
            />
        </Box>
    );
}
