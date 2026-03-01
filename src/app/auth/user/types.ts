import { ItemResposne } from "@/lib/features/item/type";

export type Category = 'All' | 'Appetizers' | 'Main Course' | 'Desserts' | 'Beverages';
export type DietaryPreference = string;
export type ItemSize = 'Regular' | 'Large' | 'Extra Large';

export interface FoodAddon {
    id: string;
    name: string;
    price: number;
}

export interface FoodItem extends ItemResposne {
    // id: string;
    // name: string;
    // description: string;
    // price: number;
    // image: string;
    // category: Category;
    // dietary_preferences: DietaryPreference[];
    // preparation_time: number; // in minutes
    // is_available: boolean;
    // available_sizes?: ItemSize[];
    // available_addons?: FoodAddon[];
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
