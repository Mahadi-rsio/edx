
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
import { useNavigate, useParams } from 'react-router-dom';
import { db, auth } from './../ts/app';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { DarkOutlinedSnackbar } from './Utils';
import { BsArrowLeft } from 'react-icons/bs';
import { onAuthStateChanged } from 'firebase/auth';

const EditPost: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const [username, setUsername] = useState('');
  const [userUID, setUserUID] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [errorAlert, setErrorAlert] = useState('');

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
    // Set the username and user UID from auth state.
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUsername(user.displayName || '');
        setUserUID(user.uid);
      } else {
        setUsername('');
        setUserUID('');
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    // Fetch the existing post data once postId and userUID are available.
    const fetchPostData = async () => {
      if (postId && userUID) {
        setLoading(true);
        try {
          const postDocRef = doc(db, 'posts', postId);
          const postSnap = await getDoc(postDocRef);
          if (postSnap.exists()) {
            const data = postSnap.data();
            // Check if the current user's UID matches the post's UID.
            if (data.uid !== userUID) {
              setErrorAlert('You are not authorized to edit this post.');
              return;
            }
            setTitle(data.title || '');
            setContent(data.content || '');
            setTags(data.tags || []);
          } else {
            setErrorAlert('Post not found.');
          }
        } catch (error) {
          console.error('Error fetching post data: ', error);
          setErrorAlert('Failed to load post data.');
        } finally {
          setLoading(false);
        }
      }
    };
    fetchPostData();
  }, [postId, userUID]);

  const handleDeleteTag = (tagToDelete: string) => {
    setTags(tags.filter((tag) => tag !== tagToDelete));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (!postId) {
      setErrorAlert('Invalid post ID.');
      setLoading(false);
      return;
    }

    const postRef = doc(db, 'posts', postId);
    const updatedData = {
      title,
      content,
      tags,
      timestamp: new Date().getTime(),
    };

    try {
      await updateDoc(postRef, updatedData);
      setSnackbarOpen(true);
      setErrorAlert('');
      // Redirect after a short delay
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (error) {
      console.error('Error updating document: ', error);
      setErrorAlert('Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={() => navigate(-1)}>
            <BsArrowLeft size={18} />
          </IconButton>
          <Typography variant="body1" sx={{ flexGrow: 1, textAlign: 'center' }}>
            Edit Post
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        sx={{
          width: '100%',
          maxWidth: 600,
          margin: 'auto',
          padding: 2,
          mt: 2,
        }}
      >
        {errorAlert ? (
          <Alert severity="error">{errorAlert}</Alert>
        ) : (
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
            }}
          >
            <TextField
              label="Edit Title"
              variant="outlined"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <TextField
              label="Edit Content"
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
                <Chip key={index} label={tag} onDelete={() => handleDeleteTag(tag)} />
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
                'Update Post'
              )}
            </Button>
          </Box>
        )}
        <DarkOutlinedSnackbar
          message="Post Updated Successfully"
          open={snackbarOpen}
          onClose={() => setSnackbarOpen(false)}
        />
      </Box>
    </>
  );
};

export default EditPost;
