'use client';

import React from 'react';
import { Box } from '@mui/material';
import SideBar from '../../components/admin/SideBar';
import Header from '../../components/admin/Header';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: '#f4f6f8' }}>
            <Header />
            <Box sx={{ display: 'flex', flexGrow: 1, mt: '64px' }}>
                <Box
                    component="nav"
                    sx={{ width: 250, flexShrink: 0 }}
                >
                    <SideBar />
                </Box>
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    {children}
                </Box>
            </Box>
        </Box>
    );
}
