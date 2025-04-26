import React, { useState } from 'react';
import {
    Box,
    Typography,
    List,
    ListItem,
    ListItemAvatar,
    Avatar,
    ListItemText,
    IconButton,
    Tabs,
    Tab,
    AppBar,
    Toolbar,
} from '@mui/material';
import {
    FiArrowLeft,
    FiMail,
    FiCheckCircle,
    FiAlertCircle,
} from 'react-icons/fi';

interface Notification {
    id: number;
    type: 'message' | 'success' | 'alert';
    title: string;
    description: string;
    time: string;
    read: boolean;
}

const sampleNotifications: Notification[] = [
    {
        id: 1,
        type: 'message',
        title: 'New Message Received',
        description: 'You have received a new message from John.',
        time: '2 mins ago',
        read: false,
    },
    {
        id: 2,
        type: 'success',
        title: 'Task Completed',
        description: 'Your scheduled backup completed successfully.',
        time: '1 hr ago',
        read: true,
    },
    {
        id: 3,
        type: 'alert',
        title: 'Server Down',
        description: 'Server 3 is not responding.',
        time: '3 hrs ago',
        read: false,
    },
];

const iconMap = {
    message: <FiMail size={20} />,
    success: <FiCheckCircle size={20} color="green" />,
    alert: <FiAlertCircle size={20} color="red" />,
};

const NotificationPage: React.FC = () => {
    const [tab, setTab] = useState<number>(0);

    const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
        setTab(newValue);
    };

    const filtered = sampleNotifications.filter((n) =>
        tab === 0 ? true : n.read === (tab === 1),
    );

    return (
        <Box>
            <AppBar position="sticky" color="default" elevation={1}>
                <Toolbar
                    sx={{ display: 'flex', justifyContent: 'space-between' }}
                >
                    <IconButton edge="start" color="inherit" aria-label="back">
                        <FiArrowLeft />
                    </IconButton>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{
                            flexGrow: 1,
                            textAlign: 'center',
                            fontWeight: 600,
                        }}
                    >
                        Notifications
                    </Typography>
                    <Box sx={{ width: 40 }} />
                </Toolbar>
            </AppBar>

            <Box sx={{ px: 1, py: 1, maxWidth: 600, mx: 'auto' }}>
                <Tabs
                    value={tab}
                    onChange={handleTabChange}
                    variant="standard"
                    textColor="primary"
                    sx={{ mt: 0 }}
                    centered
                >
                    <Tab label="All" />
                    <Tab label="Unread" />
                </Tabs>

                <List>
                    {filtered.map((n) => (
                        <ListItem
                            key={n.id}
                            sx={{
                                backgroundColor: n.read
                                    ? 'transparent'
                                    : 'rgba(25, 118, 210, 0.08)',
                                borderRadius: 2,
                                mb: 1,
                                flexDirection: 'column',
                                alignItems: 'flex-start',
                            }}
                        >
                            <Box
                                sx={{
                                    width: '100%',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    mb: 0.9,
                                }}
                            >
                                <Typography
                                    variant="caption"
                                    color="textSecondary"
                                >
                                    {n.time}
                                </Typography>
                                <ListItemAvatar>
                                    <Avatar sx={{ bgcolor: 'transparent' }}>
                                        {iconMap[n.type]}
                                    </Avatar>
                                </ListItemAvatar>
                            </Box>
                            <Box
                                sx={{
                                    width: '100%',
                                    display: 'flex',
                                    alignItems: 'center',
                                }}
                            >
                                <ListItemText
                                    primary={
                                        <Typography
                                            fontWeight={600}
                                            component="span"
                                        >
                                            {n.title}
                                        </Typography>
                                    }
                                    secondary={n.description}
                                />
                                {!n.read && (
                                    <IconButton
                                        edge="end"
                                        aria-label="mark as read"
                                    >
                                        <FiCheckCircle />
                                    </IconButton>
                                )}
                            </Box>
                        </ListItem>
                    ))}

                    {filtered.length === 0 && (
                        <Box textAlign="center" sx={{ py: 4 }}>
                            <Typography variant="body2" color="textSecondary">
                                No notifications here.
                            </Typography>
                        </Box>
                    )}
                </List>
            </Box>
        </Box>
    );
};

export default NotificationPage;
