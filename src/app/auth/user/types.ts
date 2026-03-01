export type Category = 'All' | 'Appetizers' | 'Main Course' | 'Desserts' | 'Beverages';
export type DietaryPreference = 'Vegetarian' | 'Vegan' | 'Gluten-Free';
export type ItemSize = 'Regular' | 'Large' | 'Extra Large';

export interface FoodAddon {
    id: string;
    name: string;
    price: number;
}

export interface FoodItem {
    id: string;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    category: Category;
    dietaryPreferences: DietaryPreference[];
    preparationTime: number; // in minutes
    isAvailable: boolean;
    availableSizes?: ItemSize[];
    availableAddons?: FoodAddon[];
}

export interface CartItemOption {
    size?: ItemSize;
    addons: FoodAddon[];
    specialInstructions?: string;
}

export interface CartItem {
    id: string; // unique ID for cart entry (since same food item can be added with different options)
    foodItemId: string;
    name: string;
    basePrice: number;
    totalPrice: number;
    quantity: number;
    imageUrl: string;
    options: CartItemOption;
}
