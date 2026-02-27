export type OrderStatus = 'Received' | 'Preparing' | 'Ready' | 'Completed';
export interface OrderItem {
    id: string;
    name: string;
    quantity: number;
    price: number;
}

export interface OrderDetail {
    id: string;
    orderNumber: string;
    customerName: string;
    customerPhone?: string;
    items: OrderItem[];
    specialInstructions?: string;
    orderTime: string;
    status: OrderStatus;
    totalAmount: number;
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