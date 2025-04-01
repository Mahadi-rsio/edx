import { useState } from 'react';
import {
    Drawer,
    List,
    ListItemText,
    Collapse,
    ListItemButton,
    Divider,
    Avatar,
} from '@mui/material';
import {
    BsChevronDown,
    BsChevronUp,
    BsGear,
    BsPencil,
    BsFillPersonCheckFill,
    BsPersonWorkspace,
    BsPostcard,
    BsChatDots,
    BsBarChart,
    BsPeople,
    BsBook,
    BsPersonSquare,
    BsStar 
    
} from 'react-icons/bs';

import { useNavigate } from 'react-router-dom';

const Panel: React.FC<{
    open: boolean;
    setClose: () => void;
    userName: string;
    userEmail: string;
    isLogged: boolean;
}> = ({ open, setClose, userName, userEmail }) => {
    // State for each expandable section
    const [accountExpand, setAccountExpand] = useState<boolean>(false);
    const [settingsExpand, setSettingsExpand] = useState<boolean>(false);
    const [optionsExpand, setOptionsExpand] = useState<boolean>(false);
    //const [openAccountsModal, setAccountsModal] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleAccountToggle = () => {
        setAccountExpand(!accountExpand);
    };

    const handleSettingsToggle = () => {
        setSettingsExpand(!settingsExpand);
    };

    const handleOptionsToggle = () => {
        setOptionsExpand(!optionsExpand);
    };
    return (
        <>
            <Drawer
                anchor="right"

                variant='temporary'
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
                        <Avatar src="" alt="h" sx={{ width: 30, height: 30 }}>
                            {userName[0]}
                        </Avatar>
                        <ListItemText
                            primary={userName}
                            secondary={userEmail}
                            sx={{ ml: 1 }}
                        />
                        {accountExpand ? <BsChevronUp /> : <BsChevronDown />}
                    </ListItemButton>

                    <Divider />

                    <Collapse in={accountExpand} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItemButton>
                                <BsPencil/>
                                <ListItemText
                                    primary="Edit Profile"
                                    sx={{ ml: 1 }}
                                />
                            </ListItemButton>
                            <ListItemButton>
                                <BsPersonSquare />
                                <ListItemText
                                    primary="My Profile"
                                    sx={{ ml: 1 }}
                                />
                            </ListItemButton>
                            <ListItemButton
                                
                                onClick={() => {
                                    navigate('/accounts');
                                }}
                            >
                                <BsFillPersonCheckFill />
                                <ListItemText
                                    primary="Accounts"
                                    sx={{ ml: 1 }}
                                />
                            </ListItemButton>
                            <ListItemButton
                                
                                onClick={handleSettingsToggle}
                            >
                                <BsGear style={{ marginRight: '8px' }} />
                                <ListItemText primary="Settings" />
                            </ListItemButton>
                            <ListItemButton                            
                                onClick={handleSettingsToggle}
                            >
                                <BsStar style={{ marginRight: '8px' }} />
                                <ListItemText primary="Upgrade to Pro" />
                            </ListItemButton>
 
                            <Divider />
                        </List>
                    </Collapse>
                    <ListItemButton onClick={() => navigate('/create_post')}>
                        <BsPostcard />
                        <ListItemText sx={{ ml: 1 }} primary="Create Post" />
                    </ListItemButton>
                    <ListItemButton onClick={handleOptionsToggle}>
                        <BsPersonWorkspace />
                        <ListItemText sx={{ ml: 1 }} primary="Mentors" />
                    </ListItemButton>
                    <ListItemButton onClick={handleOptionsToggle}>
                        <BsBook />
                        <ListItemText sx={{ ml: 1 }} primary="Courses" />
                    </ListItemButton>
                    <ListItemButton onClick={handleOptionsToggle}>
                        <BsChatDots />
                        <ListItemText sx={{ ml: 1 }} primary="Discussions" />
                    </ListItemButton>
                    <ListItemButton onClick={handleOptionsToggle}>
                        <BsBarChart />
                        <ListItemText sx={{ ml: 1 }} primary="Leaderboard" />
                    </ListItemButton>
                     <ListItemButton onClick={handleOptionsToggle}>
                        <BsPeople/>
                        <ListItemText sx={{ml:1}} primary="Groups" />
                    </ListItemButton>

                </List>
            </Drawer>
        </>
    );
};

export default Panel;
