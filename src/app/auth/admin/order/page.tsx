'use client';
import { Box, CircularProgress } from '@mui/material';
import OrderCard from '../../../components/admin/OrderCard';
import { OrderStatus } from './type';
import { useGetAllOrdersFromAdminQuery, useUpdateOrderStatusMutation } from '@/lib/api';


const Order = () => {
    const { data: order = [], isLoading } = useGetAllOrdersFromAdminQuery();
    const [updateOrderStatus] = useUpdateOrderStatusMutation();

    const handleStatusChange = async (id: string, newStatus: OrderStatus) => {
        try {
            await updateOrderStatus({ orderId: id, status: newStatus }).unwrap();
        } catch (error) {
            console.error('Failed to update order status:', error);
        }
    };

    return (
        <Box sx={{ maxWidth: 600, margin: '0 auto' }}>
            {isLoading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                    <CircularProgress />
                </Box>
            ) : (
                order.map((order) => (
                    <OrderCard
                        key={order.id}
                        order={order}
                        onStatusChange={handleStatusChange}
                    />
                ))
            )}
        </Box>
    );
};

export default Order;
