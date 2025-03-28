import React, { useEffect, useState } from 'react';
import {
    Modal,
    Box,
    Typography,
    Button,
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    IconButton,
    Divider,
    Avatar,
} from '@mui/material';
import {
    signInWithPopup,
    getAuth,
    GoogleAuthProvider,
    signOut,
    onAuthStateChanged,
} from 'firebase/auth';
import { MdDelete } from 'react-icons/md';
import { app } from './../ts/app'; // Adjust the import path as per your project structure
import { DarkOutlinedSnackbar } from './Utils';

// Define styles for the modal
const modalContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
};

const contentStyle = {
    width: { xs: '90%', sm: '70%', md: '40%' },
    maxWidth: '500px',
    bgcolor: 'transparent',
    backdropFilter: 'blur(25px)',
    borderRadius: 2,
    border: '1px solid rgba(255, 255, 255, 0.2)',
    boxShadow: 24,
    p: 3,
    color: 'white',
};

// Define the props interface
interface SignInModalProps {
    open: boolean;
    handleClose: () => void;
}

// Define the account interface
interface Account {
    id: number | string;
    name: string;
    email: string;
}

const Accounts: React.FC<SignInModalProps> = ({ open, handleClose }) => {
    // State for linked accounts
    const [accounts, setAccounts] = useState<Account[]>([]);
    const [showSnack, setShowSnack] = useState<boolean>(false);

    // Authentication instance
    const auth = getAuth(app);

    // Handler for Google sign-in
    const handleGoogleSignIn = async () => {
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);
            // Optionally update user info here

            window.location.reload();
        } catch (error) {
            console.error('Google Sign-In Error:', error);
            setShowSnack(true);
        }
    };
    // Handler for logout
    const handleLogout = async () => {
        try {
            await signOut(auth);
            window.location.reload();
        } catch (error) {
            console.error('Logout Error:', error);
            setShowSnack(true);
        }
    };

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                saveDataInLocalStorageAsJSON(
                    {
                        name: user.displayName ? user.displayName : '',
                        id: user.uid ? user.uid : 123,
                        email: user.email ? user.email : '',
                    },
                    'saveAccount',
                );

                const saveData = localStorage.getItem('saveAccount');
                const extract = JSON.parse(saveData ? saveData : '{}');

                const newUser = {
                    name: extract.name,
                    id: extract.uid,
                    email: extract.email,
                };
                setAccounts([...accounts, newUser]);
            }
        });
    }, []);
    return (
        <>
            <Modal open={open} onClose={handleClose} sx={modalContainerStyle}>
                <Box sx={contentStyle}>
                    {/* Header Section */}
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Avatar sx={{ width: 50, height: 50, mr: 2 }}>U</Avatar>
                        <Box>
                            <Typography variant="h6">No User</Typography>
                            <Typography variant="body2" color="textSecondary">
                                abc@gmail.com
                            </Typography>
                        </Box>
                    </Box>

                    <Divider sx={{ my: 2 }} />

                    {/* Sign In Options */}
                    <Button
                        variant="contained"
                        fullWidth
                        onClick={handleGoogleSignIn}
                        sx={{ mb: 2 }}
                    >
                        Sign in with Google
                    </Button>
                    <Divider sx={{ my: 2 }} />

                    {/* Accounts List */}
                    {accounts.length > 0 ? (
                        <List dense>
                            {accounts.map((account) => (
                                <ListItem key={account.id}>
                                    <ListItemText primary={account.name} />
                                    <ListItemSecondaryAction>
                                        <IconButton edge="end">
                                            <MdDelete />
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            ))}
                        </List>
                    ) : (
                        <Typography variant="body2" color="textSecondary">
                            No linked accounts.
                        </Typography>
                    )}

                    <Divider sx={{ my: 2 }} />

                    {/* Logout and Delete Account Buttons */}
                    <Button
                        variant="contained"
                        color="info"
                        fullWidth
                        onClick={handleLogout}
                        sx={{ mb: 1 }}
                    >
                        Logout
                    </Button>
                    <DarkOutlinedSnackbar
                        message="Something went wrong"
                        open={showSnack}
                        onClose={() => setShowSnack(false)}
                    />
                </Box>
            </Modal>
        </>
    );
};

function saveDataInLocalStorageAsJSON(details: Account, key: string) {
    const saveDataAsJsonString = JSON.stringify(details, null, 2);
    localStorage.setItem(key, saveDataAsJsonString);
}

export default Accounts;
