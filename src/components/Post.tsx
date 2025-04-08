import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Card,
    CardHeader,
    CardContent,
    CardMedia,
    CardActions,
    Avatar,
    Typography,
    IconButton,
    Divider,
    Chip,
    Stack,
    useTheme,
    useMediaQuery,
    Box,
    Drawer,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from '@mui/material';
import {
    BsHeart,
    BsChat,
    BsShare,
    BsThreeDots,
    BsTrash,
    BsPencilSquare,
    BsFlag,
    BsBookmark,
    BsEyeSlash,
    BsFacebook,
} from 'react-icons/bs';

import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../ts/app';
import ConfirmationModal from './Modal';
import { doc, deleteDoc } from 'firebase/firestore';

export interface FacebookPostProps {
    postId: string;
    avatarUrl: string;
    username: string;
    timestamp: string;
    content: string;
    hashtags?: string[];
    imageUrl?: string;
    likeCount?: number;
    commentCount?: number;
    shareCount?: number;
    title: string;
    uid: string;
}

const Post: React.FC<FacebookPostProps> = ({
    postId,
    avatarUrl,
    username,
    timestamp,
    content,
    hashtags = [],
    imageUrl,
    likeCount = 0,
    commentCount = 0,
    shareCount = 0,
    title,
    uid,
}) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const [drawerOpen, setDrawerOpen] = useState(false);
    const [isLogged, setLogged] = useState<boolean>(false);
    const [currentUserUid, setCurrentUserUid] = useState<string | null>(null);
    const [openConfirm, setOpenConfirm] = useState(false);

    // Define a threshold for content length to determine if scroll should be enabled.
    const contentThreshold = 300;
    const isContentLong = content.length > contentThreshold;

    const navigate = useNavigate();

    const deletPost = async () => {
        try {
            await deleteDoc(doc(db, 'posts', postId));
            setOpenConfirm(false);
            setDrawerOpen(false);
        } catch (e) {
            alert(e);
        }
    };

    const toggleDrawer = (open: boolean) => () => {
        setDrawerOpen(open);
    };

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setLogged(true);
                setCurrentUserUid(user.uid);
            } else {
                setLogged(false);
                setCurrentUserUid(null);
            }
        });
    }, []);

    return (
        <>
            <Card
                data-postid={postId}
                sx={{ maxWidth: 600, margin: 'auto', mt: 2, boxShadow: 3 }}
            >
                <CardHeader
                    avatar={
                        <Avatar
                            src={avatarUrl}
                            alt={username}
                            onClick={() => {
                                navigate('/test');
                            }}
                        >
                            {username.charAt(0)}
                        </Avatar>
                    }
                    action={
                        <IconButton
                            aria-label="more options"
                            onClick={toggleDrawer(true)}
                        >
                            <BsThreeDots size={20} />
                        </IconButton>
                    }
                    title={
                        <Typography variant={isMobile ? 'subtitle1' : 'h6'}>
                            {username}
                        </Typography>
                    }
                    subheader={
                        <Typography variant="caption">{timestamp}</Typography>
                    }
                />
                <Divider />
                <CardContent>
                    <Box
                        sx={{
                            maxHeight: isContentLong ? 300 : 'auto',
                            overflowY: isContentLong ? 'auto' : 'visible',
                            paddingRight: isContentLong ? 1 : 0,
                            scrollbarWidth: 'thin',
                            '&::-webkit-scrollbar': {
                                width: isContentLong ? '8px' : 0,
                            },
                            '&::-webkit-scrollbar-thumb': {
                                backgroundColor: isContentLong
                                    ? theme.palette.primary.main
                                    : 'transparent',
                                borderRadius: '4px',
                            },
                        }}
                    >
                        <Typography variant="h6">{title}</Typography>
                        <Typography variant="body1">{content}</Typography>
                    </Box>
                    {hashtags.length > 0 && (
                        <Stack
                            direction="row"
                            spacing={1}
                            mt={2}
                            flexWrap="wrap"
                        >
                            {hashtags.map((tag, index) => (
                                <Chip
                                    key={index}
                                    label={`#${tag}`}
                                    variant="outlined"
                                    clickable
                                    color="info"
                                    size="small"
                                />
                            ))}
                        </Stack>
                    )}
                </CardContent>
                {imageUrl && (
                    <CardMedia
                        component="img"
                        image={imageUrl}
                        alt="Post image"
                        sx={{
                            maxHeight: isMobile ? 200 : 400,
                            objectFit: 'cover',
                            width: '100%',
                        }}
                    />
                )}
                <Divider />
                <CardActions
                    disableSpacing
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-around',
                        flexDirection: 'row',
                    }}
                >
                    <IconButton
                        aria-label="like post"
                        sx={{ display: 'flex', alignItems: 'center' }}
                    >
                        <BsHeart size={20} />
                        <Typography variant="caption" sx={{ ml: 0.5 }}>
                            {likeCount}
                        </Typography>
                    </IconButton>
                    <IconButton
                        aria-label="comment on post"
                        sx={{ display: 'flex', alignItems: 'center' }}
                    >
                        <BsChat size={20} />
                        <Typography variant="caption" sx={{ ml: 0.5 }}>
                            {commentCount}
                        </Typography>
                    </IconButton>
                    <IconButton
                        aria-label="share post"
                        sx={{ display: 'flex', alignItems: 'center' }}
                    >
                        <BsShare size={20} />
                        <Typography variant="caption" sx={{ ml: 0.5 }}>
                            {shareCount}
                        </Typography>
                    </IconButton>
                </CardActions>
            </Card>

            <Drawer
                anchor="bottom"
                open={drawerOpen}
                onClose={toggleDrawer(false)}
            >
                <Box
                    role="presentation"
                    sx={{
                        width: 'auto',
                        padding: 1,
                    }}
                >
                    <List>
                        {isLogged && currentUserUid === uid && (
                            <>
                                <ListItemButton
                                    onClick={() => {
                                        navigate('/edit_post/' + postId);
                                    }}
                                >
                                    <ListItemIcon>
                                        <BsPencilSquare size={20} />
                                    </ListItemIcon>
                                    <ListItemText primary="Edit post" />
                                </ListItemButton>
                                <ListItemButton
                                    onClick={() => {
                                        // Handle delete action here
                                        setOpenConfirm(true);
                                    }}
                                >
                                    <ListItemIcon>
                                        <BsTrash size={20} />
                                    </ListItemIcon>
                                    <ListItemText primary="Delete this post" />
                                </ListItemButton>
                            </>
                        )}
                        <ListItemButton
                            onClick={() => {
                                // Handle report action here
                                setDrawerOpen(false);
                            }}
                        >
                            <ListItemIcon>
                                <BsFlag size={20} />
                            </ListItemIcon>
                            <ListItemText primary="Report this" />
                        </ListItemButton>
                        <ListItemButton
                            onClick={() => {
                                // Handle save action here
                                setDrawerOpen(false);
                            }}
                        >
                            <ListItemIcon>
                                <BsBookmark size={20} />
                            </ListItemIcon>
                            <ListItemText primary="Save this post" />
                        </ListItemButton>
                        <ListItemButton
                            onClick={() => {
                                // Handle not interested action here
                                setDrawerOpen(false);
                            }}
                        >
                            <ListItemIcon>
                                <BsEyeSlash size={20} />
                            </ListItemIcon>
                            <ListItemText primary="Not interested" />
                        </ListItemButton>
                        <ListItemButton onClick={() => {}}>
                            <ListItemIcon>
                                <BsFacebook />
                            </ListItemIcon>
                            <ListItemText primary="Share this post on facebook" />
                        </ListItemButton>
                    </List>
                </Box>
            </Drawer>
            <ConfirmationModal
                onConfirm={deletPost}
                title="Delete Post"
                description="Sure to delete post ? if deleted data cannot be back again !"
                cancelText="No,Keep"
                onCancel={() => setOpenConfirm(false)}
                open={openConfirm}
            />
        </>
    );
};

export default Post;
