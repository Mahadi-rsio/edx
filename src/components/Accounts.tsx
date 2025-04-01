import { useEffect, useState } from 'react';
import {
    Box,
    Typography,
    Button,
    AppBar,
    Toolbar,
    IconButton,
    Menu,
    MenuItem,
} from '@mui/material';

import { FaEllipsisH } from 'react-icons/fa';
import {
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
    deleteUser,
} from 'firebase/auth';

import { auth } from '../ts/app';

const googleProvider = new GoogleAuthProvider();

interface User {
    userEmail: string;
    uid: string;
    displayName: string;
}

const Accounts = () => {
    const [user, setUser] = useState<User>({
        userEmail: '',
        displayName: '',
        uid: '',
    });
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    // Listen to authentication state changes
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((currentUser) => {
            if (currentUser) {
                setUser({
                    uid: currentUser.uid || '',
                    displayName: currentUser.displayName || '',
                    userEmail: currentUser.email || '',
                });
            }
        });
        return () => unsubscribe();
    }, []);

    // Sign in with Google
    const signInWithGoogle = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
        } catch (error) {
            console.error('Google sign-in error:', error);
        }
    };

    // Logout functionality
    const handleLogout = async () => {
        try {
            await signOut(auth);
            window.location.reload();
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    // Delete account functionality
    const handleDeleteAccount = async () => {
        try {
            if (auth.currentUser) {
                await deleteUser(auth.currentUser);
            }
        } catch (error) {
            console.error('Delete account error:', error);
        }
    };

    // Placeholders for additional features (disable or remove account)
    const handleDisableAccount = () => {
        console.log('Disable account feature not implemented.');
    };

    const handleRemoveAccount = () => {
        console.log('Remove account feature not implemented.');
    };

    // Manage button handlers
    const handleManageClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <AppBar position="static">
                <Toolbar
                    sx={{ display: 'flex', justifyContent: 'space-between' }}
                >
                    {user.userEmail && user.uid && user.displayName ? (
                        <Box>
                            <Typography variant="h6">
                                {user.displayName}
                            </Typography>
                            <Typography variant="body2">
                                {user.userEmail}
                            </Typography>
                        </Box>
                    ) : (
                        <Typography variant="h6">Welcome Guest</Typography>
                    )}
                    {user.userEmail && (
                        <>
                            <IconButton
                                color="inherit"
                                onClick={handleManageClick}
                            >
                                <FaEllipsisH />
                            </IconButton>
                            <Menu
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleCloseMenu}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'right',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                            >
                                <MenuItem
                                    onClick={() => {
                                        handleLogout();
                                        handleCloseMenu();
                                    }}
                                >
                                    Logout
                                </MenuItem>
                                <MenuItem
                                    onClick={() => {
                                        handleDeleteAccount();
                                        handleCloseMenu();
                                    }}
                                >
                                    Delete Account
                                </MenuItem>
                                <MenuItem
                                    onClick={() => {
                                        handleDisableAccount();
                                        handleCloseMenu();
                                    }}
                                >
                                    Disable Account
                                </MenuItem>
                                <MenuItem
                                    onClick={() => {
                                        handleRemoveAccount();
                                        handleCloseMenu();
                                    }}
                                >
                                    Remove Account
                                </MenuItem>
                            </Menu>
                        </>
                    )}
                </Toolbar>
            </AppBar>

            {/* Main Content */}
            <Box sx={{ mt: 4, textAlign: 'center' }}>
                {!user.userEmail && (
                    <>
                        <Typography variant="h5">Sign In</Typography>
                        <Box
                            sx={{
                                mt: 3,
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 2,
                                alignItems: 'center',
                            }}
                        >
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={signInWithGoogle}
                            >
                                Sign in with Google
                            </Button>
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={() => console.log('Sign in with X')}
                            >
                                Sign in with X
                            </Button>
                        </Box>
                    </>
                )}
                {/* Additional logged-in user content can go here */}
            </Box>
        </>
    );
};

export default Accounts;
