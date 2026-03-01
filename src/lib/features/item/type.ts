export interface ItemResposne {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    base_price: string;
    category: string;
    preparation_time: number;
    is_available: boolean;
    category_id: string;
    created_at: string;
}


export interface Category {
    id: string;
    name: string;
}

export interface Dietary {
    id: string;
    name: string;
}

export interface Addon {
    id: string;
    name: string;
    price: string | number;
}

