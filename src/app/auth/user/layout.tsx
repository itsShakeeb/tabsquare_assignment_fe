'use client';
import { Box } from '@mui/material';
import CartSidebar from '../../components/user/CartSidebar';

import AuthGuard from '../../components/AuthGuard';

export default function UserLayout({ children }: { children: React.ReactNode }) {
    return (
        <AuthGuard allowedRoles={['user']}>
            <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#f9fafb', p: 3, gap: 3 }}>
                <Box component="main" sx={{ flexGrow: 1, minWidth: 0 }}>
                    {children}
                </Box>
                <Box component="aside" sx={{ width: 350, flexShrink: 0, position: 'sticky', top: 24, height: 'calc(100vh - 48px)' }}>
                    <CartSidebar />
                </Box>
            </Box>
        </AuthGuard>
    );
}
