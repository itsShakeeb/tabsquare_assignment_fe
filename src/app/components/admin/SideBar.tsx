'use client';
import React, { useState, useEffect } from 'react';
import {
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    ListSubheader,
    Box,
} from '@mui/material';

import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import { usePathname, useRouter } from 'next/navigation';
import { NavSection } from './type';

const navConfig: NavSection[] = [
    {
        title: 'Navigation',
        items: [
            { name: 'Dashboard', icon: <DashboardOutlinedIcon sx={{ fontSize: '1.25rem' }} />, path: '/auth/admin' },
            { name: 'Orders', icon: <ShoppingBagOutlinedIcon sx={{ fontSize: '1.25rem' }} />, path: '/auth/admin/order' },
        ],
    },
];

export default function SideBar() {
    const router = useRouter();
    const location = usePathname();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleNavigation = (path: string) => {
        router.push(path);
    };

    if (!mounted) return null;

    console.log(location);

    return (
        <Box
            sx={{
                width: 250,
                height: 'calc(100vh - 64px)',
                bgcolor: '#fafafa',
                borderRight: '1px solid #f0f0f0',
                overflowY: 'auto',
                position: 'fixed',
            }}
        >
            <List
                sx={{ width: '100%', px: 2, py: 2 }}
                component="nav"
            >
                {navConfig.map((section, sectionIndex) => (
                    <React.Fragment key={sectionIndex}>
                        {section.title && (
                            <ListSubheader
                                disableSticky
                                sx={{
                                    bgcolor: 'transparent',
                                    lineHeight: '32px',
                                    fontWeight: 500,
                                    fontSize: '0.75rem',
                                    color: '#9e9e9e',
                                    textTransform: 'none',
                                    px: 1,
                                    mt: 1,
                                }}
                            >
                                {section.title}
                            </ListSubheader>
                        )}
                        {section.items.map((item) => {
                            const isActive = location === item.path;
                            return (
                                <ListItem key={item.name} disablePadding sx={{ mb: 0.5 }}>
                                    <ListItemButton
                                        onClick={() => handleNavigation(item.path)}
                                        sx={{
                                            borderRadius: '8px',
                                            bgcolor: isActive ? '#f5f5f5' : 'transparent',
                                            color: isActive ? '#000' : '#616161',
                                            '&:hover': {
                                                bgcolor: '#f5f5f5',
                                            },
                                            py: 0.75,
                                            px: 1.5,
                                            transition: 'background-color 0.2s',
                                        }}
                                    >
                                        <ListItemIcon
                                            sx={{
                                                minWidth: 36,
                                                color: isActive ? '#000' : '#757575',
                                            }}
                                        >
                                            {item.icon}
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={item.name}
                                            primaryTypographyProps={{
                                                fontSize: '0.875rem',
                                                fontWeight: isActive ? 600 : 500,
                                            }}
                                        />
                                        {item.badge && (
                                            <Box
                                                sx={{
                                                    bgcolor: '#1c2434',
                                                    color: '#fff',
                                                    fontSize: '0.65rem',
                                                    fontWeight: 600,
                                                    px: 1,
                                                    py: 0.25,
                                                    borderRadius: '12px',
                                                    ml: 1,
                                                }}
                                            >
                                                {item.badge}
                                            </Box>
                                        )}
                                    </ListItemButton>
                                </ListItem>
                            );
                        })}
                    </React.Fragment>
                ))}
            </List>
        </Box>
    );
}
