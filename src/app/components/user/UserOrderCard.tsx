'use client';

import React from 'react';
import {
    Card,
    CardContent,
    Typography,
    Box,
    Divider,
    Chip,
    List,
    ListItem,
    ListItemText,
} from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import { UserOrder } from '@/app/auth/user/types';

// Using common colors matching Admin OrderCard where possible, tailored for the strings in UserOrder UI
const getStatusColor = (status: string): 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning' => {
    switch (status.toLowerCase()) {
        case 'received': return 'info';
        case 'preparing': return 'warning';
        case 'ready': return 'primary';
        case 'completed': return 'success';
        default: return 'default';
    }
};

export default function UserOrderCard({ order }: { order: UserOrder }) {

    // Formatting the created_at ISO string
    const orderDate = new Date(order.created_at);
    const timeString = isNaN(orderDate.getTime())
        ? order.created_at
        : new Intl.DateTimeFormat('en-US', {
            hour: 'numeric', minute: 'numeric', month: 'short', day: 'numeric'
        }).format(orderDate);

    return (
        <Card sx={{ mb: 2, borderRadius: 2, boxShadow: '0 2px 10px rgba(0,0,0,0.06)' }}>
            <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Box>
                        <Typography variant="h6" fontWeight="bold" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <ReceiptLongIcon color="action" />
                            Order Receipt
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary', mt: 0.5 }}>
                            <AccessTimeIcon sx={{ fontSize: 16, mr: 0.5 }} />
                            <Typography variant="body2">{timeString}</Typography>
                        </Box>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Chip
                            size="small"
                            label={order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                            color={getStatusColor(order.status)}
                            sx={{ fontWeight: 600, px: 1 }}
                        />
                    </Box>
                </Box>

                <Divider sx={{ my: 1.5 }} />

                {/* Order Items */}
                <Box>
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom sx={{ fontSize: '0.75rem', fontWeight: 600 }}>
                        ORDER ITEMS
                    </Typography>
                    <List disablePadding>
                        {order.items.map((item) => (
                            <ListItem key={item.order_item_id} disableGutters sx={{ py: 1, alignItems: 'flex-start' }}>
                                <Box
                                    component="img"
                                    src={item.image}
                                    sx={{ width: 48, height: 48, borderRadius: 2, objectFit: 'cover', mr: 2 }}
                                />
                                <ListItemText
                                    disableTypography
                                    primary={
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                                <Box component="span" sx={{ fontWeight: 700, mr: 1, color: 'primary.main' }}>
                                                    {item.quantity}x
                                                </Box>
                                                {item.item_name}
                                            </Typography>
                                            <Typography variant="body2" fontWeight="medium">
                                                ${(Number(item.price_at_purchase) * item.quantity).toFixed(2)}
                                            </Typography>
                                        </Box>
                                    }
                                    secondary={
                                        item.instruction && (
                                            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.5, fontStyle: 'italic' }}>
                                                Note: {item.instruction}
                                            </Typography>
                                        )
                                    }
                                />
                            </ListItem>
                        ))}
                    </List>
                </Box>

                <Divider sx={{ my: 1.5 }} />

                {/* Subtotal & Tax */}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', mb: 0.5 }}>
                    <Typography variant="body2" color="text.secondary" sx={{ mr: 2 }}>
                        Subtotal:
                    </Typography>
                    <Typography variant="body2" fontWeight="medium">
                        ${order.summary.subtotal.toFixed(2)}
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', mb: 1 }}>
                    <Typography variant="body2" color="text.secondary" sx={{ mr: 2 }}>
                        Tax:
                    </Typography>
                    <Typography variant="body2" fontWeight="medium">
                        ${order.summary.tax.toFixed(2)}
                    </Typography>
                </Box>

                {/* Total */}
                <Box sx={{ pt: 1, borderTop: '1px dashed #e0e0e0', display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                    <Typography variant="subtitle2" color="text.secondary" sx={{ mr: 2, textTransform: 'uppercase' }}>
                        Total:
                    </Typography>
                    <Typography variant="h6" color="primary.main" fontWeight="bold">
                        ${order.summary.total.toFixed(2)}
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );
}
