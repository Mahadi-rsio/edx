import { useEffect, useState } from 'react';
import {
    Box,
    Typography,
    Button,
    AppBar,
    Toolbar,
    IconButton,
    Divider,
    List,
    ListItem,
    ListItemText,
    TextField,
} from '@mui/material';
import { BsArrowLeft, BsGoogle } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import {
    GoogleAuthProvider,
    signInWithPopup,
    updateProfile,
} from 'firebase/auth';
import ConfirmationModal from './Modal';
import { auth } from '../ts/app';

const googleProvider = new GoogleAuthProvider();

interface User {
    userEmail: string;
    uid: string;
    displayName: string;
    creationTime: string;
    lastSignInTime: string;
}

const Accounts = () => {
    const [user, setUser] = useState<User>({
        userEmail: '',
        uid: '',
        displayName: '',
        creationTime: '',
        lastSignInTime: '',
    });
    const navigate = useNavigate();
    const [openModal, setOpenModal] = useState(false);
    const [modalAction, setModalAction] = useState<'signout' | 'delete' | null>(
        null,
    );

    // States for updating username
    const [isEditingUsername, setIsEditingUsername] = useState(false);
    const [newUsername, setNewUsername] = useState(user.displayName);

    // States for updating password
    const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');

    // States for updating email
    const [isUpdatingEmail, setIsUpdatingEmail] = useState(false);
    const [newEmail, setNewEmail] = useState(user.userEmail);
    const [emailError, setEmailError] = useState('');

    // Listen to authentication state changes
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((currentUser) => {
            if (currentUser) {
                setUser({
                    uid: currentUser.uid || '',
                    displayName: currentUser.displayName || '',
                    userEmail: currentUser.email || '',
                    creationTime: currentUser.metadata.creationTime || '',
                    lastSignInTime: currentUser.metadata.lastSignInTime || '',
                });
                setNewUsername(currentUser.displayName || '');
                setNewEmail(currentUser.email || '');
            } else {
                setUser({
                    uid: '',
                    displayName: '',
                    userEmail: '',
                    creationTime: '',
                    lastSignInTime: '',
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

    // Update Username
    const handleUpdateUsername = async () => {
        if (auth.currentUser) {
            try {
                // await auth.currentUser.updateProfile({
                //     displayName: newUsername,
                // });

                updateProfile(auth.currentUser, {
                    displayName: newUsername,
                });
                setUser((prev) => ({ ...prev, displayName: newUsername }));
                setIsEditingUsername(false);
            } catch (error) {
                console.error('Error updating username:', error);
            }
        }
    };

    // Update Password
    const handleUpdatePassword = async () => {
        if (newPassword !== confirmPassword) {
            setPasswordError('Passwords do not match');
            return;
        }
        if (auth.currentUser && auth.currentUser.email) {
            try {
                setIsUpdatingPassword(false);
                setCurrentPassword('');
                setNewPassword('');
                setConfirmPassword('');
                setPasswordError('');
            } catch (error) {
                console.error('Error updating password:', error);
                setPasswordError(
                    'Failed to update password. Check your current password.',
                );
            }
        }
    };

    // Update Email
    const handleUpdateEmail = async () => {
        if (auth.currentUser && auth.currentUser.email) {
            try {
                setUser((prev) => ({ ...prev, userEmail: newEmail }));
                setIsUpdatingEmail(false);
                setCurrentPassword('');
                setEmailError('');
            } catch (error) {
                console.error('Error updating email:', error);
                setEmailError(
                    'Failed to update email. Check your current password.',
                );
            }
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
                    <Box sx={{ width: 48 }} />
                </Toolbar>
            </AppBar>

            {/* Main Content */}
            <Box sx={{ mt: 4, textAlign: 'center' }}>
                {!user.userEmail && (
                    <Box
                        sx={{
                            mt: 1,
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
                            fullWidth
                        >
                            Sign in with Google
                        </Button>
                    </Box>
                )}

                {user.userEmail && (
                    <>
                        {/* User Info */}
                        <Box
                            sx={{
                                mt: 1,
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 0.4,
                                alignItems: 'left',
                            }}
                        >
                            <Typography sx={{ ml: 1 }} variant="body1">
                                User Info
                            </Typography>
                            <Divider sx={{ width: '100%' }} />
                            <List sx={{ width: '100%' }}>
                                <ListItem>
                                    <ListItemText
                                        primary="Email"
                                        secondary={user.userEmail}
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemText
                                        primary="User Name"
                                        secondary={user.displayName}
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemText
                                        primary="User ID"
                                        secondary={user.uid}
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemText
                                        primary="Created At"
                                        secondary={user.creationTime}
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemText
                                        primary="Last Sign In"
                                        secondary={user.lastSignInTime}
                                    />
                                </ListItem>
                            </List>
                            <Divider sx={{ width: '100%' }} />
                        </Box>

                        {/* Update Username */}
                        <Box
                            sx={{
                                mt: 6,
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 2,
                                alignItems: 'left',
                            }}
                        >
                            <Typography variant="body1" sx={{ ml: 1 }}>
                                Update Username
                            </Typography>
                            <TextField
                                label="Username"
                                variant="outlined"
                                fullWidth
                                value={
                                    isEditingUsername
                                        ? newUsername
                                        : user.displayName
                                }
                                onChange={(e) => setNewUsername(e.target.value)}
                                InputProps={{ readOnly: !isEditingUsername }}
                                sx={{ mt: 2 }}
                            />
                            {isEditingUsername ? (
                                <Box sx={{ display: 'flex', gap: 1 }}>
                                    <Button
                                        variant="contained"
                                        onClick={handleUpdateUsername}
                                    >
                                        Save
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        onClick={() => {
                                            setIsEditingUsername(false);
                                            setNewUsername(user.displayName);
                                        }}
                                    >
                                        Cancel
                                    </Button>
                                </Box>
                            ) : (
                                <Button
                                    variant="contained"
                                    onClick={() => setIsEditingUsername(true)}
                                >
                                    Edit Username
                                </Button>
                            )}
                            <Divider sx={{ width: '100%' }} />
                        </Box>

                        {/* Update Password */}
                        <Box
                            sx={{
                                mt: 6,
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 2,
                                alignItems: 'left',
                            }}
                        >
                            <Typography variant="body1" sx={{ ml: 1 }}>
                                Update Password
                            </Typography>
                            {isUpdatingPassword ? (
                                <>
                                    <TextField
                                        label="Current Password"
                                        type="password"
                                        variant="outlined"
                                        fullWidth
                                        value={currentPassword}
                                        onChange={(e) =>
                                            setCurrentPassword(e.target.value)
                                        }
                                        sx={{ mt: 2 }}
                                    />
                                    <TextField
                                        label="New Password"
                                        type="password"
                                        variant="outlined"
                                        fullWidth
                                        value={newPassword}
                                        onChange={(e) =>
                                            setNewPassword(e.target.value)
                                        }
                                        sx={{ mt: 2 }}
                                    />
                                    <TextField
                                        label="Confirm New Password"
                                        type="password"
                                        variant="outlined"
                                        fullWidth
                                        value={confirmPassword}
                                        onChange={(e) =>
                                            setConfirmPassword(e.target.value)
                                        }
                                        sx={{ mt: 2 }}
                                    />
                                    {passwordError && (
                                        <Typography color="error">
                                            {passwordError}
                                        </Typography>
                                    )}
                                    <Box sx={{ display: 'flex', gap: 1 }}>
                                        <Button
                                            variant="contained"
                                            onClick={handleUpdatePassword}
                                        >
                                            Save
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            onClick={() => {
                                                setIsUpdatingPassword(false);
                                                setCurrentPassword('');
                                                setNewPassword('');
                                                setConfirmPassword('');
                                                setPasswordError('');
                                            }}
                                        >
                                            Cancel
                                        </Button>
                                    </Box>
                                </>
                            ) : (
                                <Button
                                    variant="contained"
                                    onClick={() => setIsUpdatingPassword(true)}
                                >
                                    Update Password
                                </Button>
                            )}
                            <Divider sx={{ width: '100%' }} />
                        </Box>

                        {/* Update Email */}
                        <Box
                            sx={{
                                mt: 8,
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 2,
                                alignItems: 'left',
                            }}
                        >
                            <Typography sx={{ ml: 1 }} variant="body1">
                                Update Email
                            </Typography>
                            <TextField
                                label="Email"
                                type="email"
                                variant="outlined"
                                fullWidth
                                value={
                                    isUpdatingEmail ? newEmail : user.userEmail
                                }
                                onChange={(e) => setNewEmail(e.target.value)}
                                InputProps={{ readOnly: !isUpdatingEmail }}
                                sx={{ mt: 2 }}
                            />
                            {isUpdatingEmail && (
                                <TextField
                                    label="Current Password"
                                    type="password"
                                    variant="outlined"
                                    fullWidth
                                    value={currentPassword}
                                    onChange={(e) =>
                                        setCurrentPassword(e.target.value)
                                    }
                                    sx={{ mt: 2 }}
                                />
                            )}
                            {isUpdatingEmail ? (
                                <Box sx={{ display: 'flex', gap: 1 }}>
                                    <Button
                                        variant="contained"
                                        onClick={handleUpdateEmail}
                                    >
                                        Save
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        onClick={() => {
                                            setIsUpdatingEmail(false);
                                            setNewEmail(user.userEmail);
                                            setCurrentPassword('');
                                            setEmailError('');
                                        }}
                                    >
                                        Cancel
                                    </Button>
                                </Box>
                            ) : (
                                <Button
                                    variant="contained"
                                    onClick={() => setIsUpdatingEmail(true)}
                                >
                                    Update Email
                                </Button>
                            )}
                            {emailError && (
                                <Typography color="error">
                                    {emailError}
                                </Typography>
                            )}
                            <Divider sx={{ width: '100%' }} />
                        </Box>

                        {/* Sign Out */}
                        <Box
                            sx={{
                                mt: 8,
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 2,
                                alignItems: 'left',
                            }}
                        >
                            <Typography sx={{ ml: 1 }} variant="body1">
                                Sign out from this device?
                            </Typography>
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={() => {
                                    setModalAction('signout');
                                    setOpenModal(true);
                                }}
                                sx={{ mt: 0.5 }}
                            >
                                Sign Out
                            </Button>
                            <Divider sx={{ width: '100%', mb: 2 }} />
                        </Box>

                        {/* Delete Account */}
                        <Box
                            sx={{
                                mt: 8,
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 2,
                                alignItems: 'left',
                            }}
                        >
                            <Typography sx={{ ml: 1 }} variant="body1">
                                Delete Account
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{ ml: 1 }}
                                color="text.secondary"
                            >
                                Deleting your account will remove all your data
                                and cannot be undone. Please make sure to back
                                up any important information before proceeding.
                                <br />
                                If you are sure you want to delete your account,
                                click the button below.
                                <br />
                            </Typography>
                            <Button
                                variant="contained"
                                color="error"
                                onClick={() => {
                                    setModalAction('delete');
                                    setOpenModal(true);
                                }}
                                sx={{ mt: 0.5 }}
                            >
                                Delete Account
                            </Button>
                            <Divider sx={{ width: '100%', mb: 2 }} />
                        </Box>
                    </>
                )}
            </Box>

            {/* Centered Image */}
            {!user.userEmail && (
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100vh',
                    }}
                >
                    <img
                        src="/undraw_access-account_aydp.svg"
                        alt="Centered Image"
                        style={{ maxWidth: '50%', maxHeight: '30%' }}
                    />
                </Box>
            )}

            {/* Confirmation Modal */}
            <ConfirmationModal
                open={openModal}
                description={
                    modalAction === 'signout'
                        ? 'Are you sure you want to sign out?'
                        : 'Are you sure you want to delete your account? This action cannot be undone.'
                }
                onCancel={() => {
                    setOpenModal(false);
                    setModalAction(null);
                }}
                onConfirm={() => {
                    setOpenModal(false);
                    if (modalAction === 'signout') {
                        auth.signOut().then(() => {
                            console.log('User signed out.');
                            window.location.reload();
                        });
                    } else if (modalAction === 'delete') {
                        if (auth.currentUser) {
                            auth.currentUser
                                .delete()
                                .then(() => {
                                    console.log('Account deleted.');
                                    window.location.reload();
                                })
                                .catch((error) => {
                                    console.error(
                                        'Error deleting account:',
                                        error,
                                    );
                                    // Note: May require re-authentication
                                });
                        }
                    }
                    setModalAction(null);
                }}
            />
        </>
    );
};

export default Accounts;
