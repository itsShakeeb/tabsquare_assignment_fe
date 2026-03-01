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
    instructions?: string;
}

export interface Item {

    id: string;
    item_id: string;
    name: string;
    base_price: number;
    total_price: number;
    quantity: number;
    image: string;
    options: CartItemOption;

}

export interface CartItem {
    cart_id: string
    items: Item[],
    summary: {
        subtotal: number;
        delivery_fee: number;
        total: number;
        tax: number;
    }
}
