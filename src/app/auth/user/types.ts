
export type Category = 'All' | 'Appetizers' | 'Main Course' | 'Desserts' | 'Beverages';
export type DietaryPreference = string;
export type ItemSize = 'regular' | 'large' | 'large';

export interface FoodAddon {
    id: string;
    name: string;
    price: number;
}


export interface CartItemOption {
    size?: ItemSize;
    addons: Pick<FoodAddon, 'id'>[];
    instruction?: string;
}

export interface Item {
    item_id: string;
    name: string;
    size: ItemSize;
    base_price: number;
    total_price: number;
    quantity: number;
    image: string;
    options: CartItemOption;

}

export interface CartItem {
    cart_id: string
    items: {
        cart_item_id: string,
        quantity: number,
        size: ItemSize,
        instruction: string,
        item_id: string,
        item_name: string,
        base_price: number,
        image: string,
        add_ons: any[],
        calculated_price: {
            base: number,
            size_adjusted: number,
            add_ons_total: number,
            unit_total: number,
            quantity_total: number
        }
    }[],
    summary: {
        subtotal: number;
        delivery_fee: number;
        total: number;
        tax: number;
    }
}

export interface UserOrderItem {
    order_item_id: string;
    quantity: number;
    size: string | null;
    instruction: string | null;
    price_at_purchase: string;
    item_id: string;
    item_name: string;
    image: string;
    add_ons: unknown[];
}

export interface UserOrder {
    id: string;
    customer_id: string;
    status: string;
    created_at: string;
    updated_at: string;
    customer_name: string;
    email: string;
    phone_no: string;
    items: UserOrderItem[];
    summary: {
        subtotal: number;
        tax: number;
        total: number;
    };
}
