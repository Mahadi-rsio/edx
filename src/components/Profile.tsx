import React, { useState, useRef } from 'react';
import {
    Box,
    Grid,
    Tabs,
    Tab,
    Avatar,
    Typography,
    Button,
    Card,
    Divider,
    IconButton,
    Drawer,
    Snackbar,
} from '@mui/material';
import { FaTwitter, FaEdit, FaCheckCircle, FaLink } from 'react-icons/fa';
import { motion } from 'framer-motion';
import {
    LuCamera,
    LuHeart,
    LuInstagram,
    LuMessageSquareDot,
} from 'react-icons/lu';
import { BsLinkedin } from 'react-icons/bs';

// TypeScript Interfaces
//interface ProfilePageProps {
// Define any props if needed

//}

const ProfilePage = () => {
    const [tabValue, setTabValue] = useState<number>(0);
    const [profilePic, setProfilePic] = useState<string>(
        'https://via.placeholder.com/150',
    );
    const [coverPhoto, setCoverPhoto] = useState<string>(
        'https://via.placeholder.com/1200x400',
    );
    const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
    const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
    const [snackbarMessage, setSnackbarMessage] = useState<string>('');
    const profileFileInputRef = useRef<HTMLInputElement>(null);
    const coverFileInputRef = useRef<HTMLInputElement>(null);

    // Tab change handler
    const handleTabChange = (
        _event: React.SyntheticEvent,
        newValue: number,
    ) => {
        setTabValue(newValue);
    };

    // File upload validation
    const validateFile = (
        file: File | undefined,
        maxSizeMB: number = 5,
    ): boolean => {
        if (!file) return false;
        if (!['image/jpeg', 'image/png'].includes(file.type)) {
            setSnackbarMessage('Invalid file type. Use JPEG or PNG.');
            setSnackbarOpen(true);
            return false;
        }
        if (file.size > maxSizeMB * 1024 * 1024) {
            setSnackbarMessage(`File size exceeds ${maxSizeMB}MB.`);
            setSnackbarOpen(true);
            return false;
        }
        return true;
    };

    // Profile picture upload
    const handleProfilePicUpload = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const file = event.target.files?.[0];
        if (file && validateFile(file)) {
            setProfilePic(URL.createObjectURL(file));
        }
    };

    // Cover photo upload
    const handleCoverPhotoUpload = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const file = event.target.files?.[0];
        if (file && validateFile(file)) {
            setCoverPhoto(URL.createObjectURL(file));
        }
    };

    // Copy profile link
    // const copyProfileLink = () => {
    //   navigator.clipboard.writeText(window.location.href);
    //   setSnackbarMessage('Profile link copied!');
    //   setSnackbarOpen(true);
    // };

    return (
        <Box
            sx={{
                maxWidth: '1400px',
                margin: 'auto',
                padding: { xs: 2, md: 4 },
            }}
        >
            {/* Cover Photo Area */}
            <Box
                sx={{
                    borderColor: 'gray',
                    borderWidth: 1,
                    borderStyle: 'solid',
                    borderRadius: { xs: '16px', md: '16px' },
                    position: 'relative',
                    height: { xs: '200px', md: '450px' },
                    backgroundImage: `url(${coverPhoto})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    boxShadow: '0 8px 40px rgba(0, 0, 0, 0.1)',
                }}
            >
                <IconButton
                    sx={{
                        position: 'absolute',
                        top: 16,
                        right: 16,
                    }}
                    onClick={() => coverFileInputRef.current?.click()}
                    aria-label="edit cover photo"
                >
                    <LuCamera />
                </IconButton>
                <input
                    type="file"
                    ref={coverFileInputRef}
                    style={{ display: 'none' }}
                    onChange={handleCoverPhotoUpload}
                    accept="image/*"
                />
            </Box>

            {/* Profile Picture and User Info (Facebook Style) */}
            <Box
                sx={{
                    position: 'relative',
                    mt: { xs: -10, md: -20 },
                    px: { xs: 2, md: 4 },
                }}
            >
                <Avatar
                    src={profilePic}
                    sx={{
                        width: { xs: 120, md: 168 },
                        height: { xs: 120, md: 168 },
                        border: '4px solid #ffffff',
                        backgroundColor: 'gray',
                        position: 'absolute',
                        left: { xs: 16, md: 32 },
                        transition: 'transform 0.3s',
                        '&:hover': { transform: 'scale(1.1)' },
                        cursor: 'pointer',
                    }}
                    onClick={() => profileFileInputRef.current?.click()}
                    aria-label="edit profile picture"
                />
                <input
                    type="file"
                    ref={profileFileInputRef}
                    style={{ display: 'none' }}
                    onChange={handleProfilePicUpload}
                    accept="image/*"
                />
                <Box sx={{ pt: { xs: 14, md: 22 }, pl: { xs: 0, md: 24 } }}>
                    <Typography
                        variant="h5"
                        sx={{ fontWeight: 'bold', color: '#ffffff', mt: 2 }}
                    >
                        John Doe{' '}
                        <FaCheckCircle
                            color="#ffffff"
                            title="Verified"
                            size={16}
                        />
                    </Typography>
                    <Typography
                        variant="body2"
                        sx={{ color: '#ffffff', mt: 1 }}
                    >
                        Creative thinker
                    </Typography>

                    <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                        <IconButton>
                            <BsLinkedin size={24} color="rgb(200,200,255)" />
                        </IconButton>
                        <IconButton>
                            <LuInstagram size={24} color="rgb(200,100,100)" />
                        </IconButton>
                        <IconButton>
                            <FaTwitter size={24} color="rgb(100,200,255)" />
                        </IconButton>
                        <IconButton>
                            <FaLink size={24} color="rgb(150,150,150)" />
                        </IconButton>
                    </Box>
                </Box>
            </Box>

            {/* Main Content and Sidebar */}
            <Grid container spacing={4} sx={{ mt: 4, px: { xs: 2, md: 4 } }}>
                {/* Main Content */}
                <Grid item xs={12} md={8}>
                    {/* Sticky Action Bar */}
                    <Box
                        sx={{ position: 'sticky', top: 0, zIndex: 1000, py: 2 }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                gap: 2,
                                justifyContent: 'flex-end',
                            }}
                        >
                            <Button
                                startIcon={<LuHeart />}
                                variant="contained"
                                sx={{
                                    bgcolor: '#3f51b5',
                                    '&:hover': { transform: 'scale(1.05)' },
                                }}
                            >
                                Follow
                            </Button>
                            <Button
                                startIcon={<LuMessageSquareDot />}
                                variant="contained"
                                color="info"
                            >
                                Message
                            </Button>
                        </Box>
                    </Box>
                    <Divider sx={{ my: 2 }} />

                    {/* User Bio */}

                    {/* Tabbed Interface */}
                    <Tabs
                        value={tabValue}
                        onChange={handleTabChange}
                        variant="scrollable"
                        sx={{
                            mt: 4,
                            '& .MuiTab-root': {
                                color: 'white',
                                fontSize: '0.91rem',
                            },
                        }}
                        aria-label="profile tabs"
                    >
                        <Tab label="About" />
                        <Tab label="Friends" />
                        <Tab label="Events" />
                    </Tabs>

                    {/* Tab Content with Animation */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        {tabValue === 0 && <AboutTab />}
                        {tabValue === 1 && <FriendsTab />}
                        {tabValue === 2 && <EventsTab />}
                    </motion.div>
                </Grid>

                {/* Sticky Sidebar for Desktop */}
                <Grid item xs={12} md={4}>
                    <Box
                        sx={{
                            position: 'sticky',
                            top: 80,
                            p: 3,
                            borderRadius: '16px',
                            boxShadow: '0 8px 40px rgba(0, 0, 0, 0.1)',
                            display: { xs: 'none', md: 'block' },
                        }}
                    >
                        <Typography variant="h5" sx={{ mb: 2, color: '#333' }}>
                            Suggested Friends
                        </Typography>
                        <Typography sx={{ color: '#666', mb: 1 }}>
                            Friend 1 (3 mutuals)
                        </Typography>
                        <Typography sx={{ color: '#666', mb: 2 }}>
                            Friend 2 (5 mutuals)
                        </Typography>
                        <Typography variant="h5" sx={{ mb: 2, color: '#333' }}>
                            Recent Activity
                        </Typography>
                        <Typography sx={{ color: '#666' }}>
                            Liked a post
                        </Typography>
                    </Box>
                </Grid>
            </Grid>

            {/* Drawer for Mobile Sidebar */}
            <IconButton
                onClick={() => setDrawerOpen(true)}
                sx={{
                    display: { md: 'none' },
                    position: 'fixed',
                    bottom: 16,
                    right: 16,
                    bgcolor: '#3f51b5',
                    color: '#ffffff',
                }}
                aria-label="open sidebar"
            >
                <FaEdit />
            </IconButton>
            <Drawer
                anchor="right"
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
            >
                <Box sx={{ width: 300, p: 3, height: '100%' }}>
                    <Typography variant="h5" sx={{ mb: 2, color: '#333' }}>
                        Suggested Friends
                    </Typography>
                    <Typography sx={{ color: '#666', mb: 1 }}>
                        Friend 1 (3 mutuals)
                    </Typography>
                    <Typography sx={{ color: '#666', mb: 2 }}>
                        Friend 2 (5 mutuals)
                    </Typography>
                    <Typography variant="h5" sx={{ mb: 2, color: '#333' }}>
                        Recent Activity
                    </Typography>
                    <Typography sx={{ color: '#666' }}>Liked a post</Typography>
                </Box>
            </Drawer>

            {/* Snackbar for Notifications */}
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={() => setSnackbarOpen(false)}
                message={snackbarMessage}
            />
        </Box>
    );
};

// About Tab Component
const AboutTab: React.FC = () => (
    <Box sx={{ mt: 2 }}>
        <Card
            sx={{
                p: 3,
                mb: 4,
                borderRadius: '16px',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                transition: 'transform 0.3s',
                '&:hover': { transform: 'scale(1.02)' },
            }}
        >
            <Typography variant="h6" sx={{ mb: 1, color: '#333' }}>
                Education
            </Typography>
            <Typography sx={{ color: '#666' }}>
                University of Example
            </Typography>
            <IconButton aria-label="edit education" sx={{ mt: 1 }}>
                <FaEdit color="#3f51b5" />
            </IconButton>
        </Card>
        <Card
            sx={{
                p: 3,
                mb: 4,
                borderRadius: '16px',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                transition: 'transform 0.3s',
                '&:hover': { transform: 'scale(1.02)' },
            }}
        >
            <Typography variant="h6" sx={{ mb: 1, color: '#333' }}>
                Work
            </Typography>
            <Typography sx={{ color: '#666' }}>
                Software Engineer at Tech Corp
            </Typography>
            <IconButton aria-label="edit work" sx={{ mt: 1 }}>
                <FaEdit color="#3f51b5" />
            </IconButton>
        </Card>
        <Card
            sx={{
                p: 3,
                mb: 4,
                borderRadius: '16px',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                transition: 'transform 0.3s',
                '&:hover': { transform: 'scale(1.02)' },
            }}
        >
            <Typography variant="h6" sx={{ mb: 1, color: '#333' }}>
                Interests
            </Typography>
            <Typography sx={{ color: '#666' }}>Photography, Hiking</Typography>
            <IconButton aria-label="edit interests" sx={{ mt: 1 }}>
                <FaEdit color="#3f51b5" />
            </IconButton>
        </Card>
    </Box>
);

// Placeholder Friends Tab
const FriendsTab: React.FC = () => (
    <Box sx={{ mt: 2 }}>
        <Typography variant="h6" sx={{ color: '#333' }}>
            Friends List
        </Typography>
        <Typography sx={{ color: '#666' }}>No friends to display.</Typography>
    </Box>
);

// Placeholder Events Tab
const EventsTab: React.FC = () => (
    <Box sx={{ mt: 2 }}>
        <Typography variant="h6" sx={{ color: '#333' }}>
            Events
        </Typography>
        <Typography sx={{ color: '#666' }}>No events to display.</Typography>
    </Box>
);

export default ProfilePage;
