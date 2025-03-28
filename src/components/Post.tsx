import React, { useState } from 'react';
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
    ListItem,
    ListItemIcon,
    ListItemText,
} from '@mui/material';
import { BsHeart, BsChat, BsShare, BsThreeDots, BsTrash, BsPencilSquare } from 'react-icons/bs';

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
}) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const [drawerOpen, setDrawerOpen] = useState(false);

    // Define a threshold for content length to determine if scroll should be enabled.
    const contentThreshold = 300;
    const isContentLong = content.length > contentThreshold;

    const toggleDrawer = (open: boolean) => () => {
        setDrawerOpen(open);
    };

    return (
        <>
            <Card
                data-postid={postId}
                sx={{ maxWidth: 600, margin: 'auto', mt: 2, boxShadow: 3 }}
            >
                <CardHeader
                    avatar={
                        <Avatar src={avatarUrl} alt={username}>
                            {username.charAt(0)}
                        </Avatar>
                    }
                    action={
                        <IconButton aria-label="more options" onClick={toggleDrawer(true)}>
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
                        <Typography variant="body1">{content}</Typography>
                    </Box>
                    {hashtags.length > 0 && (
                        <Stack direction="row" spacing={1} mt={2} flexWrap="wrap">
                            {hashtags.map((tag, index) => (
                                <Chip
                                    key={index}
                                    label={`#${tag}`}
                                    variant="outlined"
                                    clickable
                                    color="primary"
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
                        padding: 2,
                    }}
                >
                    <List>
                        <ListItem button onClick={() => { /* Handle edit action here */ setDrawerOpen(false); }}>
                            <ListItemIcon>
                                <BsPencilSquare size={20} />
                            </ListItemIcon>
                            <ListItemText primary="Edit post" />
                        </ListItem>
                        <ListItem button onClick={() => { /* Handle delete action here */ setDrawerOpen(false); }}>
                            <ListItemIcon>
                                <BsTrash size={20} />
                            </ListItemIcon>
                            <ListItemText primary="Delete this post" />
                        </ListItem>
                    </List>
                </Box>
            </Drawer>
        </>
    );
};

export default Post;
