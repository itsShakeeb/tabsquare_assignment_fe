'use client';
import React from 'react';
import {
    AppBar,
    Toolbar,
    Box,
    Typography,
    InputBase,
    Badge,
    Avatar,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import WidgetsIcon from '@mui/icons-material/Widgets';

export default function Header() {
    return (
        <AppBar
            position="fixed"
            elevation={0}
            sx={{
                bgcolor: '#fff',
                color: '#000',
                borderBottom: '1px solid #f0f0f0',
                zIndex: (theme) => theme.zIndex.drawer + 1,
            }}
        >
            <Toolbar disableGutters sx={{ minHeight: '64px', padding: 0 }}>
                {/* Logo and Sidebar Header Area */}
                <Box
                    sx={{
                        width: 250,
                        display: 'flex',
                        alignItems: 'center',
                        borderRight: '1px solid #f0f0f0',
                        height: '64px',
                        px: 3,
                        flexShrink: 0,
                    }}
                >
                    <Box
                        sx={{
                            width: 32,
                            height: 32,
                            bgcolor: '#f26a1b',
                            borderRadius: '6px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            mr: 1.5,
                        }}
                    >
                        <WidgetsIcon sx={{ color: '#fff', fontSize: '1.25rem' }} />
                    </Box>
                    <Typography variant="h6" fontWeight={700} sx={{ letterSpacing: '-0.02em', fontSize: '1.1rem' }}>
                        RestroBit
                    </Typography>
                </Box>

                {/* Right Area: Search and Actions */}
                <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 3 }}>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            bgcolor: '#fff',
                            border: '1px solid #e0e0e0',
                            borderRadius: '8px',
                            px: 1.5,
                            py: 0.5,
                            width: 250,
                            transition: 'border-color 0.2s',
                            '&:hover': {
                                borderColor: '#c0c0c0',
                            },
                        }}
                    >
                        <SearchIcon sx={{ color: '#bdbdbd', mr: 1, fontSize: '1.25rem' }} />
                        <InputBase
                            placeholder="Search"
                            sx={{ ml: 0.5, flex: 1, fontSize: '0.875rem' }}
                        />
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>


                        <Badge
                            overlap="circular"
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                            variant="dot"
                        >
                            <Avatar
                                alt="User"
                                src="https://mui.com/static/images/avatar/2.jpg"
                                sx={{ width: 34, height: 34 }}
                            />
                        </Badge>
                    </Box>
                </Box>
            </Toolbar>
        </AppBar>
    );
}
