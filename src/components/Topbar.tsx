import { JSX } from '@emotion/react/jsx-runtime';
import { AppBar, Toolbar, IconButton, Box } from '@mui/material';
import Panel from './Panel';
import { BsSearch } from 'react-icons/bs';
import { BsBell } from 'react-icons/bs';
import { FaEllipsisV } from 'react-icons/fa';

import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

import { app } from '../ts/app';
import { DarkOutlinedSnackbar } from './Utils';

interface User {
    userName: string;
    userEmail: string;
}

function Topbar(): JSX.Element {
    const [openPanel, setOpenPanel] = useState<boolean>(false);
    //    const [openSignUpModal, setOpenSignUpModal] = useState<boolean>(false);
    const [userData, setUserData] = useState<User>({
        userName: 'Anonymus User',
        userEmail: '',
    });

    const [openSnack, setOpenSnack] = useState<boolean>(true);
    const [isLogged, setLogged] = useState<boolean>(false);

    useEffect(() => {
        onAuthStateChanged(getAuth(app), (user) => {
            if (user) {
                setLogged(true);
                setUserData({
                    userName: user.displayName ? user.displayName : '',
                    userEmail: user.email ? user.email : '',
                });
            }
        });
    }, []);

    // Truncate the name to 8 characters, adding "..." if necessary
    //const truncatedName =
    //    userData.userName.length > 8
    //        ? userData.userName.substring(0, 8) + '...'
    //        : userData.userName;
    //
    return (
        <>
            <AppBar
                sx={{
                    background: 'transparent',
                    backdropFilter: 'blur(30px)',
                    boxShadow: 'none',
                    borderBottom: '1px solid rgb(50,50,50,0.7)',
                    borderRadius: 1,
                }}
                position="sticky"
            >
                <Toolbar sx={{ justifyContent: 'space-between' }}>
                    {/* Left section: Hamburger menu and logo */}
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <img
                            src="/google.png"
                            alt="Logo"
                            style={{ height: 30, marginLeft: 3 }}
                        />
                    </Box>

                    {/* Right section: Search icon and user chip */}
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <IconButton sx={{ mr: 1 }}>
                            <BsSearch style={{ fontSize: '1.2rem' }} />
                        </IconButton>
                        <IconButton sx={{ mr: 1 }}>
                            <BsBell style={{ fontSize: '1.2rem' }} />
                        </IconButton>
                        <IconButton
                            sx={{ mr: 1 }}
                            onClick={() => setOpenPanel(true)}
                        >
                            <FaEllipsisV style={{ fontSize: '1.2rem' }} />
                        </IconButton>
                    </Box>
                </Toolbar>
                <Panel
                    userEmail={userData.userEmail}
                    userName={userData.userName}
                    open={openPanel}
                    setClose={() => setOpenPanel(false)}
                    isLogged={isLogged}
                />
            </AppBar>
            <DarkOutlinedSnackbar
                open={openSnack}
                onClose={() => setOpenSnack(false)}
                message={
                    isLogged
                        ? `You are Logged as ${userData.userName}`
                        : 'You are not Logged In'
                }
            />
            {/* Move the Snackbar outside of the AppBar */}
        </>
    );
}

export default Topbar;
