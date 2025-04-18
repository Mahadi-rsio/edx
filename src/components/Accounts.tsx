import { useEffect, useState } from 'react';
import {
    Box,
    Typography,
    Button,
    AppBar,
    Toolbar,
    IconButton,
} from '@mui/material';

import { BsArrowLeft, BsGoogle } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import {
    GoogleAuthProvider,
    signInWithPopup,
    
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
    const navigate = useNavigate();

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

    return (
        <>
            <AppBar position="static">
                <Toolbar
                    sx={{ display: 'flex', justifyContent: 'space-between' }}
                >
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={() => navigate(-1)}
                    >
                        <BsArrowLeft size={18} />
                    </IconButton>
                    <Typography
                        variant="h6"
                        sx={{ flexGrow: 1, textAlign: 'center' }}
                    >
                        Accounts
                    </Typography>
                    <Box sx={{ width: 48 }} /> {/* Placeholder for alignment */}
                </Toolbar>
            </AppBar>

            {/* Main Content */}
            <Box sx={{ mt: 4, textAlign: 'center' }}>
                {!user.userEmail && (
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
                            startIcon={<BsGoogle />}
                        >
                            Sign in with Google
                        </Button>
                    </Box>
                )}
            </Box>
        </>
    );
};

export default Accounts;
