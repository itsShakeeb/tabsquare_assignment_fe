'use client';
import { Box } from '@mui/material';
import OrderCard from '../../../components/admin/OrderCard';
import { useState } from 'react';
import { OrderDetail } from './type';

const DUMMY_ORDER: OrderDetail[] = [
    {
        id: '1',
        orderNumber: '1042',
        customerName: 'John Doe',
        customerPhone: '+1 (555) 123-4567',
        items: [
            { id: 'i1', name: 'Margherita Pizza', quantity: 2, price: 14.00 },
            { id: 'i2', name: 'Garlic Bread', quantity: 1, price: 5.50 },
            { id: 'i3', name: 'Coca-Cola 500ml', quantity: 2, price: 2.25 },
        ],
        specialInstructions: 'Please leave the food at the front door. Do not ring the bell.',
        orderTime: 'Today at 07:45 PM',
        status: 'Received',
        totalAmount: 38.00,

    }, {
        id: '2',
        orderNumber: '1042',
        customerName: 'John Doe',
        customerPhone: '+1 (555) 123-4567',
        items: [
            { id: 'i1', name: 'Margherita Pizza', quantity: 2, price: 14.00 },
            { id: 'i2', name: 'Garlic Bread', quantity: 1, price: 5.50 },
            { id: 'i3', name: 'Coca-Cola 500ml', quantity: 2, price: 2.25 },
        ],
        specialInstructions: 'Please leave the food at the front door. Do not ring the bell.',
        orderTime: 'Today at 07:45 PM',
        status: 'Received',
        totalAmount: 38.00,
    }];

const Order = () => {
    const [order, setOrder] = useState(DUMMY_ORDER);

    const handleStatusChange = (id: string, newStatus: any) => {
        setOrder(order.map((order) => (order.id === id ? { ...order, status: newStatus } : order)));
    };

    return (
        <Box sx={{ maxWidth: 600, margin: '0 auto' }}>
            {order.map((order) => (
                <OrderCard
                    key={order.id}
                    order={order}
                    onStatusChange={handleStatusChange}
                />
            ))}
        </Box>
    );
};

export default Order;
