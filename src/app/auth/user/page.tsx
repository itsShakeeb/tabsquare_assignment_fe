'use client';
import React, { useState, useMemo } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import FoodSearchHeader from '../../components/user/FoodSearchHeader';
import CategoryTabs from '../../components/user/CategoryTabs';
import FoodCard from '../../components/user/FoodCard';
import ItemDetailsModal from '../../components/user/ItemDetailsModal';
import { FoodItem, Category, DietaryPreference } from './types';

const mockFoods: FoodItem[] = [
    {
        id: '1',
        name: 'Burger Mozzo XL',
        description: 'Double beef patty, extra cheese, secret sauce, lettuce, tomato.',
        price: 39,
        imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=400&q=80',
        category: 'Main Course',
        dietaryPreferences: [],
        preparationTime: 15,
        isAvailable: true,
        availableSizes: ['Regular', 'Large', 'Extra Large'],
        availableAddons: [{ id: 'a1', name: 'Extra Bacon', price: 3 }, { id: 'a2', name: 'Extra Cheese', price: 1.5 }]
    },
    {
        id: '4',
        name: 'Margherita Pizza',
        description: 'Classic delight with 100% real mozzarella cheese.',
        price: 32,
        imageUrl: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=400&q=80',
        category: 'Main Course',
        dietaryPreferences: ['Vegetarian'],
        preparationTime: 20,
        isAvailable: true,
        availableSizes: ['Regular', 'Large'],
        availableAddons: [{ id: 'a3', name: 'Extra Cheese', price: 2 }, { id: 'a4', name: 'Jalapenos', price: 1 }]
    },
    {
        id: '2',
        name: 'Garlic Bread Sticks',
        description: 'Freshly baked garlic bread with herbs and cheese dip.',
        price: 12,
        imageUrl: 'https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?auto=format&fit=crop&w=400&q=80',
        category: 'Appetizers',
        dietaryPreferences: ['Vegetarian'],
        preparationTime: 10,
        isAvailable: true,
    },
    {
        id: '3',
        name: 'Mediterranean Salad',
        description: 'Fresh veggies, feta cheese, olives with olive oil dressing.',
        price: 25,
        imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=400&q=80',
        category: 'Appetizers',
        dietaryPreferences: ['Vegetarian', 'Gluten-Free'],
        preparationTime: 5,
        isAvailable: true,
    },
    {
        id: '5',
        name: 'Vegan Sushi Roll',
        description: 'Avocado, cucumber, carrot, and tofu wrapped in seaweed.',
        price: 28,
        imageUrl: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=400&q=80',
        category: 'Main Course',
        dietaryPreferences: ['Vegan', 'Gluten-Free'],
        preparationTime: 12,
        isAvailable: true,
    },
    {
        id: '6',
        name: 'Chocolate Lava Cake',
        description: 'Warm chocolate cake with a gooey molten center.',
        price: 15,
        imageUrl: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?auto=format&fit=crop&w=400&q=80',
        category: 'Desserts',
        dietaryPreferences: ['Vegetarian'],
        preparationTime: 10,
        isAvailable: true,
    },
    {
        id: '7',
        name: 'Iced Caramel Macchiato',
        description: 'Espresso mixed with vanilla syrup, milk and ice, topped with caramel drizzle.',
        price: 8,
        imageUrl: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&w=400&q=80',
        category: 'Beverages',
        dietaryPreferences: ['Vegetarian'],
        preparationTime: 3,
        isAvailable: false,
        availableSizes: ['Regular', 'Large']
    },
];

export default function UserFoodOrderPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [priceRange, setPriceRange] = useState<number[]>([0, 100]);
    const [dietaryPrefs, setDietaryPrefs] = useState<DietaryPreference[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<Category>('All');
    const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);

    const filteredFoods = useMemo(() => {
        return mockFoods.filter((food) => {
            // Category Filter
            const matchesCategory = selectedCategory === 'All' || food.category === selectedCategory;

            // Search Filter
            const matchesSearch = food.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                food.description.toLowerCase().includes(searchQuery.toLowerCase());

            // Price Filter
            const matchesPrice = food.price >= priceRange[0] && food.price <= priceRange[1];

            // Dietary Filter (item must have ALL selected preferences)
            const matchesDietary = dietaryPrefs.length === 0 ||
                dietaryPrefs.every(pref => food.dietaryPreferences.includes(pref));

            return matchesCategory && matchesSearch && matchesPrice && matchesDietary;
        });
    }, [searchQuery, priceRange, dietaryPrefs, selectedCategory]);

    const handleFoodClick = (item: FoodItem) => {
        setSelectedFood(item);
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
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
                {filteredFoods.length > 0 ? (
                    filteredFoods.map(food => (
                        <Grid key={food.id}>
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

            {/* Modals */}
            <ItemDetailsModal
                open={!!selectedFood}
                food={selectedFood}
                onClose={() => setSelectedFood(null)}
            />
        </Box>
    );
}
