import { useState } from 'react';
import {
    Button,
    Box,
    Typography,
    Container,
    List,
    ListItem,
    ListItemText,
} from '@mui/material';
import { signInWithPopup, FacebookAuthProvider } from 'firebase/auth';
import { auth } from './../ts/app';

function Login() {
    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);
    const [pages, setPages] = useState([]);
    const [permissions, setPermissions] = useState([]);

    const handleFacebookLogin = async () => {
        const provider = new FacebookAuthProvider();
        // Add pages_show_list scope (only works for app role users in Dev Mode)
        //provider.addScope("pages_show_list");

        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            setUser(user);
            console.log('Logged in with Facebook:', user);

            // Get access token
            const credential =
                FacebookAuthProvider.credentialFromResult(result);
            const accessToken = credential.accessToken;
            console.log('Access Token:', accessToken);

            // Check granted permissions
            const permsResponse = await fetch(
                `https://graph.facebook.com/me/permissions?access_token=${accessToken}`,
            );
            const permsData = await permsResponse.json();
            setPermissions(permsData.data);
            console.log('Granted Permissions:', permsData.data);

            // Fetch Pages (only works if pages_show_list is granted)
            const pagesResponse = await fetch(
                `https://graph.facebook.com/me/accounts?access_token=${accessToken}`,
            );
            const pagesData = await pagesResponse.json();

            if (pagesData.error) {
                throw new Error(pagesData.error.message);
            }

            setPages(pagesData.data || []);
            console.log('Facebook Pages:', pagesData.data);
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <Container maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h5">
                    Facebook Login (Dev Mode)
                </Typography>
                {user ? (
                    <Box sx={{ mt: 2, textAlign: 'center' }}>
                        <Typography variant="h6">
                            Welcome, {user.displayName}!
                        </Typography>
                        <Typography variant="body2">
                            Email: {user.email}
                        </Typography>

                        {/* Display Permissions */}
                        <Box sx={{ mt: 3 }}>
                            <Typography variant="h6">
                                Granted Permissions:
                            </Typography>
                            <List>
                                {permissions.map((perm) => (
                                    <ListItem key={perm.permission}>
                                        <ListItemText
                                            primary={perm.permission}
                                            secondary={`Status: ${perm.status}`}
                                        />
                                    </ListItem>
                                ))}
                            </List>
                        </Box>

                        {/* Display Pages */}
                        {pages.length > 0 ? (
                            <Box sx={{ mt: 3 }}>
                                <Typography variant="h6">
                                    Your Facebook Pages:
                                </Typography>
                                <List>
                                    {pages.map((page) => (
                                        <ListItem key={page.id}>
                                            <ListItemText
                                                primary={page.name}
                                                secondary={`ID: ${page.id}`}
                                            />
                                        </ListItem>
                                    ))}
                                </List>
                            </Box>
                        ) : (
                            <Typography variant="body2" sx={{ mt: 2 }}>
                                No Pages found. Ensure you manage Pages and have
                                granted pages_show_list.
                            </Typography>
                        )}
                    </Box>
                ) : (
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleFacebookLogin}
                        sx={{ mt: 3, mb: 2 }}
                        fullWidth
                    >
                        Sign In with Facebook
                    </Button>
                )}
                {error && (
                    <Typography color="error" variant="body2" sx={{ mt: 2 }}>
                        {error}
                    </Typography>
                )}
            </Box>
        </Container>
    );
}

export default Login;
