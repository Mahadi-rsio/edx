import React, { useState, KeyboardEvent, useEffect } from 'react';
import {
    Box,
    Button,
    TextField,
    Chip,
    Stack,
    Typography,
    CircularProgress,
    Alert,
    AppBar,
    Toolbar,
    IconButton,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { db, auth } from './../ts/app';
import { collection, addDoc } from 'firebase/firestore';
import { DarkOutlinedSnackbar } from './Utils';
import { BsArrowLeft } from 'react-icons/bs';
import { onAuthStateChanged } from 'firebase/auth';

const CreatePost: React.FC = () => {
    const [username, setUsername] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [tagInput, setTagInput] = useState('');
    const [tags, setTags] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [errorAlert, setErrorAlert] = useState('');
    const [userId, setUserId] = useState('');
    const navigate = useNavigate();

    const handleAddTag = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && tagInput.trim() !== '') {
            e.preventDefault();
            if (!tags.includes(tagInput.trim())) {
                setTags([...tags, tagInput.trim()]);
            }
            setTagInput('');
        }
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUsername(user?.displayName || '');
            setUserId(user?.uid || '');
        });
        // Cleanup the listener on unmount
        return () => unsubscribe();
    }, []);

    const handleDeleteTag = (tagToDelete: string) => {
        setTags(tags.filter((tag) => tag !== tagToDelete));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const postData = {
            uid: userId,
            userName: username,
            content,
            title: title,
            likeCount: 0,
            commentCount: 0,
            tags,
            avatarUrl: '',
            imageUrl: '',
            timestamp: new Date().getTime(),
        };

        try {
            await addDoc(collection(db, 'posts'), postData);
            setSnackbarOpen(true);
            setUsername('');
            setContent('');
            setTags([]);
            setErrorAlert('');

            // Redirect to home after a delay (e.g., 2 seconds)
            setTimeout(() => {
                navigate('/');
            }, 2000);
        } catch (error) {
            console.error('Error adding document: ', error);
            setErrorAlert('Something went wrong.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={() => navigate(-1)}
                    >
                        <BsArrowLeft size={18} />
                    </IconButton>
                    <Typography
                        variant="body1"
                        sx={{ flexGrow: 1, textAlign: 'center' }}
                    >
                        Create New Post
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    width: '100%',
                    maxWidth: 600,
                    margin: 'auto',
                    padding: 2,
                }}
            >
                <TextField
                    label="Add Title"
                    variant="outlined"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <TextField
                    label="Content"
                    variant="outlined"
                    multiline
                    rows={4}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
                <TextField
                    label="Add Tag"
                    variant="outlined"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={handleAddTag}
                    helperText="Press Enter to add a tag"
                />
                <Stack direction="row" spacing={1} flexWrap="wrap">
                    {tags.map((tag, index) => (
                        <Chip
                            key={index}
                            label={tag}
                            onDelete={() => handleDeleteTag(tag)}
                        />
                    ))}
                </Stack>
                <Button
                    variant="contained"
                    type="submit"
                    disabled={loading}
                    sx={{ position: 'relative', height: 36 }}
                >
                    {loading ? (
                        <CircularProgress size={24} color="inherit" />
                    ) : (
                        'Create Post'
                    )}
                </Button>
                {errorAlert && <Alert severity="error">{errorAlert}</Alert>}
                <DarkOutlinedSnackbar
                    message="Post Uploaded Successfully"
                    open={snackbarOpen}
                    onClose={() => setSnackbarOpen(false)}
                />
            </Box>
        </>
    );
};

export default CreatePost;
