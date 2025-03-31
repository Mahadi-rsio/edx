// AccountsPage.jsx
import { useEffect, useState } from 'react';
import {
    Container,
    Box,
    Typography,
    Button,
    AppBar,
    Toolbar,
} from '@mui/material';
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

    // Listen to authentication state changes
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((currentUser) => {
            if (currentUser) {
                setUser({
                    uid: currentUser.uid ? currentUser.uid : '',
                    displayName: currentUser.displayName
                        ? currentUser.displayName
                        : '',
                    userEmail: currentUser.email ? currentUser.email : '',
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

    return (
        <Container maxWidth="sm">
            {/* App Bar */}
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6">Accounts Manager</Typography>
                </Toolbar>
            </AppBar>

            {/* Main Content */}
            <Box sx={{ mt: 4, textAlign: 'center' }}>
                {user.userEmail !== '' &&
                user.uid !== '' &&
                user.displayName !== '' ? (
                    <>
                        <Typography variant="h5">
                            {' '}
                            {user.displayName ||
                                'Sign in for unlocking all features'}
                        </Typography>
                        <Typography variant="body1">
                            {user.userEmail}
                        </Typography>
                        <Box
                            sx={{
                                mt: 3,
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 2,
                            }}
                        >
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleLogout}
                            >
                                Logout
                            </Button>
                            <Button
                                variant="outlined"
                                color="error"
                                onClick={handleDeleteAccount}
                            >
                                Delete Account
                            </Button>
                            <Button
                                variant="outlined"
                                onClick={handleDisableAccount}
                            >
                                Disable Account
                            </Button>
                            <Button
                                variant="outlined"
                                onClick={handleRemoveAccount}
                            >
                                Remove Account
                            </Button>
                        </Box>
                    </>
                ) : (
                    <>
                        <Typography variant="h5">Sign In</Typography>
                        <Box
                            sx={{
                                mt: 3,
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 2,
                            }}
                        >
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={signInWithGoogle}
                            >
                                Sign in with Google
                            </Button>
                            {/* Example for another provider ("X") */}
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
            </Box>
        </Container>
    );
};

export default Accounts;
