import { useState } from 'react';
import {
    Drawer,
    List,
    ListItem,
    ListItemText,
    Collapse,
    ListItemButton,
    Divider,
} from '@mui/material';
import {
    BsChevronDown,
    BsChevronUp,
    BsGear,
    BsPencil,
    BsFillPersonCheckFill,
    BsPersonCircle
} from 'react-icons/bs';
import { GrUpgrade } from 'react-icons/gr';
import app from '../ts/app';
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth';
import Accounts from './Accounts';

const Panel: React.FC<{
    open: boolean;
    setClose: () => void;
    userName: string;
    userEmail: string;
    isLogged: boolean;
}> = ({ open, setClose, userName, userEmail, isLogged }) => {
    // State for each expandable section
    const [accountExpand, setAccountExpand] = useState<boolean>(false);
    const [settingsExpand, setSettingsExpand] = useState<boolean>(false);
    const [optionsExpand, setOptionsExpand] = useState<boolean>(false);
    const [openAccountsModal, setAccountsModal] = useState<boolean>(false);

    const handleAccountToggle = () => {
        setAccountExpand(!accountExpand);
    };

    const handleSettingsToggle = () => {
        setSettingsExpand(!settingsExpand);
    };

    const handleOptionsToggle = () => {
        setOptionsExpand(!optionsExpand);
    };

    const signOutHandler = () => {
        const auth = getAuth(app);
        onAuthStateChanged(auth, (user) => {
            if (user) {
                signOut(auth);
                window.location.reload();
            }
        });
    };

    return (
        <>
            <Drawer
                anchor="right"
                open={open}
                onClose={setClose}
                disableScrollLock
                PaperProps={{
                    sx: {
                        width: { xs: '80%', sm: '300px' }, // Responsive width
                        overscrollBehavior: 'contain',
                        background:
                            'linear-gradient(135deg,rgba(0,0,0,0.1) 0%,rgba(30,30,50,0.3) 100%)',
                        backdropFilter: 'blur(20px)', // Blur effect
                        WebkitBackdropFilter: 'blur(20px)', // Safari support
                        boxShadow: 'none', // Optional: remove shadow for a cleaner look
                        borderLeft: '1px solid rgba(255, 255, 255, 0.3)', // Optional: subtle border
                        color: 'white',
                    },
                }}
            >
                <List sx={{ scrollBehavior: 'smooth' }}>
                    {/* User Account Section */}
                    <ListItemButton onClick={handleAccountToggle}>
                        <BsPersonCircle style={{ marginRight: '8px' ,fontSize:'1.5rem'}} />
                        <ListItemText
                            primary={userName}
                            secondary={userEmail}
                        />
                        {accountExpand ? <BsChevronUp /> : <BsChevronDown />}
                    </ListItemButton>
                    <Divider />
                    <Collapse in={accountExpand} timeout="auto" unmountOnExit>
                       <List component="div" disablePadding>
                            <ListItemButton sx={{ pl: 4 }}>
                                <GrUpgrade />
                                <ListItemText
                                    primary="Upgrade to Pro"
                                    sx={{ ml: 1 }}
                                />
                            </ListItemButton>
                            <ListItemButton sx={{ pl: 4 }}>
                                <BsPencil />
                                <ListItemText
                                    primary="Edit Profile"
                                    sx={{ ml: 1 }}
                                />
                            </ListItemButton>
                            <ListItemButton sx={{ pl: 4 }}
                                onClick={()=>setAccountsModal(true)}
                            >
                                <BsFillPersonCheckFill/>
                                <ListItemText
                                    primary="Accounts"
                                    sx={{ ml: 1 }}
                                />
                            </ListItemButton>
                           
                       </List>
                    </Collapse>

                    {/* Settings Section */}
                    <ListItemButton onClick={handleSettingsToggle}>
                        <BsGear style={{ marginRight: '8px' }} />
                        <ListItemText primary="Settings" />
                        {settingsExpand ? <BsChevronUp /> : <BsChevronDown />}
                    </ListItemButton>
                    <Collapse in={settingsExpand} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItemButton sx={{ pl: 4 }}>
                                <ListItemText primary="General" />
                            </ListItemButton>
                            <ListItemButton sx={{ pl: 4 }}>
                                <ListItemText primary="Privacy" />
                            </ListItemButton>
                            <ListItemButton sx={{ pl: 4 }}>
                                <ListItemText primary="Notifications" />
                            </ListItemButton>
                        </List>
                    </Collapse>

                    {/* Expandable Options Section */}
                    <ListItemButton onClick={handleOptionsToggle}>
                        <ListItemText primary="Expandable Options" />
                        {optionsExpand ? <BsChevronUp /> : <BsChevronDown />}
                    </ListItemButton>
                    <Collapse in={optionsExpand} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItemButton sx={{ pl: 4 }}>
                                <ListItemText primary="Option 1" />
                            </ListItemButton>
                            <ListItemButton sx={{ pl: 4 }}>
                                <ListItemText primary="Option 2" />
                            </ListItemButton>
                        </List>
                    </Collapse>

                    {/* Additional Non-Clickable Item */}
                    <ListItem>
                        <ListItemText primary="Hello" />
                    </ListItem>
                </List>
            </Drawer>
            <Accounts
                open={openAccountsModal}
                handleClose={() => {
                    setAccountsModal(false);
                }}
            />
        </>
    );
};

export default Panel;
