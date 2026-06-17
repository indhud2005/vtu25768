import React, { useState, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { 
    Container, 
    Typography, 
    Box, 
    Paper, 
    Tabs, 
    Tab,
    AppBar,
    Toolbar,
    Badge,
    IconButton,
    CircularProgress
} from '@mui/material';
import { Notifications as NotificationsIcon } from '@mui/icons-material';
import NotificationList from './components/NotificationList';
import PriorityInbox from './components/PriorityInbox';
import NotificationFilter from './components/NotificationFilter';
import { getNotifications, getUnreadCount } from './services/api';
import { logInfo, logError } from './services/logging';
import './App.css';

const theme = createTheme({
    palette: {
        primary: { main: '#1976d2' },
        secondary: { main: '#dc004e' },
        background: { default: '#f5f5f5' }
    }
});

function App() {
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [tab, setTab] = useState(0);
    const [error, setError] = useState('');
    const [filter, setFilter] = useState('all');
    const [page, setPage] = useState(1);

    useEffect(() => {
        logInfo('app', 'App mounted');
        fetchNotifications();
        fetchUnreadCount();
    }, []);

    useEffect(() => {
        fetchNotifications();
    }, [page, filter]);

    const fetchNotifications = async () => {
        try {
            setLoading(true);
            const params = { limit: 10, page: page };
            if (filter !== 'all') {
                params.notification_type = filter;
            }
            const response = await getNotifications(params);
            setNotifications(response.data.notifications || []);
            logInfo('app', `Fetched ${response.data.notifications?.length || 0} notifications`);
        } catch (err) {
            logError('app', `Failed to fetch: ${err.message}`);
            setError('Failed to load notifications');
        } finally {
            setLoading(false);
        }
    };

    const fetchUnreadCount = async () => {
        try {
            const response = await getUnreadCount();
            setUnreadCount(response.data.count || 0);
        } catch (err) {
            logError('app', `Failed to get unread count: ${err.message}`);
        }
    };

    const handleTabChange = (event, newValue) => {
        setTab(newValue);
        logInfo('app', `Switched to tab: ${newValue === 0 ? 'All' : 'Priority'}`);
    };

    return (
        <ThemeProvider theme={theme}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        📬 Campus Notifications
                    </Typography>
                    <IconButton color="inherit">
                        <Badge badgeContent={unreadCount} color="error">
                            <NotificationsIcon />
                        </Badge>
                    </IconButton>
                </Toolbar>
            </AppBar>

            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                {error && (
                    <Paper sx={{ p: 2, mb: 2, bgcolor: '#ffebee' }}>
                        <Typography color="error">{error}</Typography>
                    </Paper>
                )}

                <NotificationFilter filter={filter} onFilterChange={setFilter} />

                <Paper sx={{ width: '100%', mt: 3 }}>
                    <Tabs value={tab} onChange={handleTabChange}>
                        <Tab label={`All (${notifications.length})`} />
                        <Tab label="Priority Inbox" />
                    </Tabs>

                    <Box sx={{ p: 3 }}>
                        {loading ? (
                            <Box display="flex" justifyContent="center" p={4}>
                                <CircularProgress />
                            </Box>
                        ) : (
                            <>
                                {tab === 0 ? (
                                    <NotificationList 
                                        notifications={notifications}
                                        page={page}
                                        onPageChange={setPage}
                                        onRefresh={fetchNotifications}
                                        onMarkRead={fetchUnreadCount}
                                    />
                                ) : (
                                    <PriorityInbox 
                                        notifications={notifications}
                                        onRefresh={fetchNotifications}
                                    />
                                )}
                            </>
                        )}
                    </Box>
                </Paper>
            </Container>
        </ThemeProvider>
    );
}

export default App;