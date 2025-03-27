import React, { useState, KeyboardEvent } from 'react';
import { Box, Button, TextField, Chip, Stack, Typography, CircularProgress, Snackbar, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { db } from './../ts/app'; // Import your Firebase config
import { collection, addDoc } from 'firebase/firestore'; // Firestore functions
import { DarkOutlinedSnackbar } from './Utils'

const CreatePost: React.FC = () => {
  const [heading, setHeading] = useState('');
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

  const handleDeleteTag = (tagToDelete: string) => {
    setTags(tags.filter((tag) => tag !== tagToDelete));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const postData = {
      heading,
      content,
      tags,
      createdAt: new Date(),
    };

    try {
      await addDoc(collection(db, 'posts'), postData);
      // On success, open the snackbar and schedule redirection to home
      setSnackbarOpen(true);
      setHeading('');
      setContent('');
      setTags([]);
      setErrorAlert('');
      
      // Redirect to home after a delay (e.g., 2 seconds)
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (error) {
      console.error('Error adding document: ', error);
      setErrorAlert('An error occurred while saving the post.');
    } finally {
      setLoading(false);
    }
  };

  return (
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
        padding: 2 
      }}
    >
      <Typography variant="h4" component="h1">Create Post</Typography>
      <TextField
        label="Heading"
        variant="outlined"
        value={heading}
        onChange={(e) => setHeading(e.target.value)}
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
             <DarkOutlinedSnackbar message='Post Uploaded Successfully' open={snackbarOpen} onClose={()=>setSnackbarOpen(false)}/>
    </Box>
  );
};

export default CreatePost;
