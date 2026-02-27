'use client';

import React from 'react';
import {
    Card,
    CardContent,
    Typography,
    Box,
    Divider,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    SelectChangeEvent,
    Chip,
    List,
    ListItem,
    ListItemText,
} from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { OrderCardProps, OrderStatus, statusColors } from '@/app/auth/admin/order/type';




// Extracted reusable Status Chip element for the dropdown
const StatusLabel = ({ status }: { status: OrderStatus }) => (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Chip
            size="small"
            label={status}
            color={statusColors[status]}
            sx={{ mr: 1, cursor: 'pointer', minWidth: 80, fontWeight: 500 }}
        />
    </Box>
);

export default function OrderCard({ order, onStatusChange }: OrderCardProps) {
    const handleStatusChange = (event: SelectChangeEvent) => {
        if (onStatusChange) {
            onStatusChange(order.id, event.target.value as OrderStatus);
        }
    };

    return (
        <Card sx={{ mb: 2, borderRadius: 2, boxShadow: '0 2px 10px rgba(0,0,0,0.06)' }}>
            <CardContent>
                {/* Header: Order Number and Status Dropdown */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Box>
                        <Typography variant="h6" fontWeight="bold">
                            Order #{order.orderNumber}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary', mt: 0.5 }}>
                            <AccessTimeIcon sx={{ fontSize: 16, mr: 0.5 }} />
                            <Typography variant="body2">{order.orderTime}</Typography>
                        </Box>
                    </Box>
                    <Box sx={{ minWidth: 160 }}>
                        <FormControl fullWidth size="small">
                            <InputLabel id={`status-label-${order.id}`}>Status</InputLabel>
                            <Select
                                labelId={`status-label-${order.id}`}
                                value={order.status}
                                label="Status"
                                onChange={handleStatusChange}
                                sx={{
                                    bgcolor: 'background.paper',
                                    fontWeight: 500,
                                    '& .MuiSelect-select': {
                                        display: 'flex',
                                        alignItems: 'center',
                                        py: 1,
                                    }
                                }}
                            >
                                <MenuItem value="Received"><StatusLabel status="Received" /></MenuItem>
                                <MenuItem value="Preparing"><StatusLabel status="Preparing" /></MenuItem>
                                <MenuItem value="Ready"><StatusLabel status="Ready" /></MenuItem>
                                <MenuItem value="Completed"><StatusLabel status="Completed" /></MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </Box>

                <Divider sx={{ my: 1.5 }} />

                {/* Customer Information */}
                <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom sx={{ fontSize: '0.75rem', fontWeight: 600 }}>
                        CUSTOMER DETAILS
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <PersonOutlineIcon sx={{ mr: 1, color: 'text.secondary', fontSize: 20 }} />
                        <Typography variant="body2" fontWeight="medium">
                            {order.customerName}
                        </Typography>
                        {order.customerPhone && (
                            <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                                ({order.customerPhone})
                            </Typography>
                        )}
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
                            <ListItem key={item.id} disableGutters sx={{ py: 0.5 }}>
                                <ListItemText
                                    disableTypography
                                    primary={
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <Typography variant="body2">
                                                <Box component="span" sx={{ fontWeight: 600, mr: 1 }}>{item.quantity}x</Box>
                                                {item.name}
                                            </Typography>
                                            <Typography variant="body2" fontWeight="medium">
                                                ${(item.price * item.quantity).toFixed(2)}
                                            </Typography>
                                        </Box>
                                    }
                                />
                            </ListItem>
                        ))}
                    </List>
                </Box>

                {/* Special Instructions */}
                {order.specialInstructions && (
                    <Box sx={{ mt: 2, p: 1.5, bgcolor: '#fff8e1', borderRadius: 1, border: '1px solid #ffe082' }}>
                        <Typography variant="caption" color="text.secondary" fontWeight="bold" display="block" sx={{ mb: 0.5 }}>
                            SPECIAL INSTRUCTIONS
                        </Typography>
                        <Typography variant="body2" color="text.primary">
                            {order.specialInstructions}
                        </Typography>
                    </Box>
                )}

                {/* Total Amount */}
                <Box sx={{ mt: 2, pt: 2, borderTop: '1px dashed #e0e0e0', display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                    <Typography variant="subtitle2" color="text.secondary" sx={{ mr: 1, textTransform: 'uppercase' }}>
                        Total:
                    </Typography>
                    <Typography variant="h6" color="primary.main" fontWeight="bold">
                        ${order.totalAmount.toFixed(2)}
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );
}
