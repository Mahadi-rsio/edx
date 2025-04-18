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
    Select,
    MenuItem,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { db, auth } from './../ts/app';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { DarkOutlinedSnackbar } from './Utils';
import {
    BsArrowLeft,
    BsNewspaper,
    BsStar,
    BsBarChart,
    BsPeopleFill,
    BsGlobe,
    BsLock,
} from 'react-icons/bs';
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
    const [selectedCategory, setSelectedCategory] = useState('');
    const [url, setUrl] = useState('');
    const [visibility, setVisibility] = useState('');
    const [pollOptions, setPollOptions] = useState<string[]>([]);
    const [pollOptionInput, setPollOptionInput] = useState('');
    const navigate = useNavigate();

    // Set username and userId based on auth state
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUsername(user?.displayName || '');
            setUserId(user?.uid || '');
        });
        return () => unsubscribe();
    }, []);

    // Handle adding tags
    const handleAddTag = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && tagInput.trim() !== '') {
            e.preventDefault();
            if (!tags.includes(tagInput.trim())) {
                setTags([...tags, tagInput.trim()]);
            }
            setTagInput('');
        }
    };

    // Handle deleting tags
    const handleDeleteTag = (tagToDelete: string) => {
        setTags(tags.filter((tag) => tag !== tagToDelete));
    };

    // Handle adding poll options
    const handleAddPollOption = () => {
        if (pollOptionInput.trim() !== '' && !pollOptions.includes(pollOptionInput.trim())) {
            setPollOptions([...pollOptions, pollOptionInput.trim()]);
            setPollOptionInput('');
        }
    };

    // Handle deleting poll options
    const handleDeletePollOption = (optionToDelete: string) => {
        setPollOptions(pollOptions.filter((option) => option !== optionToDelete));
    };

    // Handle form submission to Firestore
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setErrorAlert('');

        // Validation
        if (!title.trim()) {
            setErrorAlert('Please enter a title.');
            setLoading(false);
            return;
        }
        if (!content.trim()) {
            setErrorAlert('Please enter content.');
            setLoading(false);
            return;
        }
        if (!selectedCategory) {
            setErrorAlert('Please select a category.');
            setLoading(false);
            return;
        }
        if (!visibility) {
            setErrorAlert('Please select visibility.');
            setLoading(false);
            return;
        }
        if (selectedCategory === 'Poll_Post' && pollOptions.length < 2) {
            setErrorAlert('Please add at least two poll options.');
            setLoading(false);
            return;
        }

        // Prepare post data for Firestore
        const postData = {
            uid: userId,
            userName: username,
            content,
            title,
            url,
            tags,
            category: selectedCategory, // Stores category (News_Feed, Review_Post, Poll_Post)
            visibility, // Stores visibility (Group, Public, Only_Me)
            likeCount: 0,
            commentCount: 0,
            avatarUrl: '',
            imageUrl: '',
            timestamp: serverTimestamp(), // Firestore server timestamp
            pollOptions: selectedCategory === 'Poll_Post' ? pollOptions : [], // Stores poll options for Poll_Post
        };

        try {
            await addDoc(collection(db, 'posts'), postData);
            setSnackbarOpen(true);
            // Reset form fields
            setTitle('');
            setContent('');
            setTags([]);
            setPollOptions([]);
            setSelectedCategory('');
            setVisibility('');
            setUrl('');
            setErrorAlert('');

            // Navigate to home after 2 seconds
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
            <AppBar position="sticky">
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={() => navigate(-1)}>
                        <BsArrowLeft size={18} />
                    </IconButton>
                    <Typography variant="body1" sx={{ flexGrow: 1, textAlign: 'center' }}>
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
                    required
                />
                <TextField
                    label="Content"
                    variant="outlined"
                    multiline
                    rows={4}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                />
                <TextField
                    label="URL"
                    variant="outlined"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    helperText="Optional: Add a URL related to your post"
                />
                <TextField
                    label="Add Tag"
                    variant="outlined"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={handleAddTag}
                    helperText="Press Enter to add a tag"
                />

                <Typography variant="body1" sx={{ marginBottom: -1 }}>
                    Select Post Category
                </Typography>
                <Select
                    labelId="post-category-label"
                    id="post-category"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    displayEmpty
                    sx={{ width: '100%', marginBottom: 1 }}
                >
                    <MenuItem value="" disabled>
                        Select Category
                    </MenuItem>
                    <MenuItem value="News_Feed">
                        <BsNewspaper style={{ marginRight: '5px' }} /> News Feed
                    </MenuItem>
                    <MenuItem value="Review_Post">
                        <BsStar style={{ marginRight: '5px' }} /> Review Post
                    </MenuItem>
                    <MenuItem value="Poll_Post">
                        <BsBarChart style={{ marginRight: '5px' }} /> Poll Post
                    </MenuItem>
                </Select>

                <Typography variant="body1" sx={{ marginBottom: -1.5 }}>
                    Visibility
                </Typography>
                <Select
                    labelId="visibility-label"
                    id="visibility"
                    value={visibility}
                    onChange={(e) => setVisibility(e.target.value)}
                    displayEmpty
                    sx={{ width: '100%', marginBottom: 2 }}
                >
                    <MenuItem value="" disabled>
                        Select Visibility
                    </MenuItem>
                    <MenuItem value="Group">
                        <BsPeopleFill style={{ marginRight: '5px' }} /> Group
                    </MenuItem>
                    <MenuItem value="Public">
                        <BsGlobe style={{ marginRight: '5px' }} /> Public
                    </MenuItem>
                    <MenuItem value="Only_Me">
                        <BsLock style={{ marginRight: '5px' }} /> Only Me
                    </MenuItem>
                </Select>

                {selectedCategory === 'Poll_Post' && (
                    <Box>
                        <TextField
                            label="Add Poll Option"
                            variant="outlined"
                            value={pollOptionInput}
                            onChange={(e) => setPollOptionInput(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    e.preventDefault();
                                    handleAddPollOption();
                                }
                            }}
                            helperText="Press Enter to add a poll option"
                            fullWidth
                            sx={{ marginBottom: 2 }}
                        />
                        <Stack direction="row" spacing={1} flexWrap="wrap">
                            {pollOptions.map((option, index) => (
                                <Chip
                                    key={index}
                                    label={option}
                                    onDelete={() => handleDeletePollOption(option)}
                                />
                            ))}
                        </Stack>
                    </Box>
                )}

                <Stack direction="row" spacing={1} flexWrap="wrap">
                    {tags.map((tag, index) => (
                        <Chip key={index} label={tag} onDelete={() => handleDeleteTag(tag)} />
                    ))}
                </Stack>
                <Button
                    variant="contained"
                    type="submit"
                    disabled={loading}
                    sx={{ position: 'relative', height: 36 }}
                >
                    {loading ? <CircularProgress size={24} color="inherit" /> : 'Create Post'}
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