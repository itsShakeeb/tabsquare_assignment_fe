'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/lib/hooks';
import { RootState } from '@/lib/store';
import { Box, CircularProgress } from '@mui/material';

interface AuthGuardProps {
    children: React.ReactNode;
    allowedRoles: Array<'admin' | 'user'>;
}

export default function AuthGuard({ children, allowedRoles }: AuthGuardProps) {
    const router = useRouter();
    const { isLoggedIn, user } = useAppSelector((state: RootState) => state.auth);
    const [isChecking, setIsChecking] = useState(false);

    useEffect(() => {
        if (!isLoggedIn || !user) {
            router.replace('/');
        } else if (!allowedRoles.includes(user.role)) {
            router.replace(user.role === 'admin' ? '/auth/admin' : '/auth/user');
        } else {
            setIsChecking(false);
        }
    }, [isLoggedIn, user, router, allowedRoles]);

    if (isChecking) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    return <>{children}</>;
}
