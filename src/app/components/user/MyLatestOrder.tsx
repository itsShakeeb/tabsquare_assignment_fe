'use client';
import React from 'react';
import { Box, Typography } from '@mui/material';
import { useGetMyOrdersQuery } from '@/lib/api';
import UserOrderCard from './UserOrderCard';

export default function MyLatestOrder() {
    const { data: orders = [], isLoading } = useGetMyOrdersQuery(undefined, {
        pollingInterval: 20000,
    });

    if (isLoading) {
        return null;
    }

    if (!orders || orders.length === 0) {
        return null; // Return null if there are no orders
    }

    // Assuming the first order is the latest order
    const latestOrder = orders[0];

    return (
        <Box sx={{ mb: 4 }}>
            <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
                Latest Order Status
            </Typography>
            <UserOrderCard order={latestOrder} />
        </Box>
    );
}
