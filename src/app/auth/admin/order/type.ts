export type OrderStatus = 'Received' | 'Preparing' | 'Ready' | 'Completed';
export interface OrderItem {
    id: string;
    item_name: string;
    quantity: number;
    price_at_purchase: number | string;
    instruction?: string;
}

export interface OrderDetail {
    id: string;
    order_number: string;
    customer_name: string;
    customer_phone?: string;
    items: OrderItem[];
    created_at: string;
    status: OrderStatus;
    summary: {
        total: number;
    }
}

export interface OrderCardProps {
    order: OrderDetail;
    onStatusChange?: (orderId: string, newStatus: OrderStatus) => void;
}

export const statusColors: Record<OrderStatus, 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning'> = {
    Received: 'info',
    Preparing: 'warning',
    Ready: 'primary',
    Completed: 'success',
};