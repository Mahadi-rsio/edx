import React, { useState, ChangeEvent, FormEvent } from 'react';
import {
    Container,
    TextField,
    Button,
    Typography,
    Box,
    MenuItem,
    Paper,
    Divider,
    InputAdornment,
    CircularProgress,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
} from '@mui/material';
// Use the new Unstable_Grid2 from MUI
import Grid from '@mui/material/Grid';
import {
    BsPerson,
    BsLock,
    BsTelephone,
    BsEnvelope,
    BsCalendar,
    BsStar,
    BsQuestionCircle,
    BsBriefcase,
    BsHeart,
} from 'react-icons/bs';

import { doc, setDoc } from 'firebase/firestore';
import { db } from './../ts/app';

interface FormData {
    // Personal Info
    name: string;
    password: string;
    phone: string;
    email: string;
    dob: string;
    relationshipStatus: string;
    // Professional & Interests
    profession: string;
    hobby: string;
    skills: string;
    others: string;
    // Education
    school: string;
    college: string;
    university: string;
    favoriteSubject: string;
    weakSubject: string;
}

const EditProfile: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        password: '',
        phone: '',
        email: '',
        dob: '',
        relationshipStatus: '',
        profession: '',
        hobby: '',
        skills: '',
        others: '',
        school: '',
        college: '',
        university: '',
        favoriteSubject: '',
        weakSubject: '',
    });

    const [loading, setLoading] = useState<boolean>(false);
    const [errorModalOpen, setErrorModalOpen] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');

    const relationshipOptions = [
        { value: 'single', label: 'Single' },
        { value: 'married', label: 'Married' },
    ];

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleCloseErrorModal = () => {
        setErrorModalOpen(false);
    };

    // Basic validation for required fields
    const validateForm = (): boolean => {
        const requiredFields = ['name', 'password', 'phone', 'email'];
        for (const field of requiredFields) {
            if (!formData[field as keyof FormData].trim()) {
                setErrorMessage(`Please fill in your ${field}.`);
                return false;
            }
        }
        return true;
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        // Validate required fields
        if (!validateForm()) {
            setErrorModalOpen(true);
            return;
        }

        setLoading(true);
        try {
            // Using the email as a unique document ID – adjust as needed
            const userDoc = doc(db, 'users', formData.email);
            await setDoc(userDoc, formData);
            console.log('Data saved successfully');
            // Optionally add additional success feedback here (e.g., success modal or redirect)
        } catch (error) {
            console.error('Error saving data: ', error);
            setErrorMessage(
                'An error occurred while saving your data. Please try again.',
            );
            setErrorModalOpen(true);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="md">
            <Box sx={{ my: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Edit Profile
                </Typography>
                <form onSubmit={handleSubmit}>
                    {/* PERSONAL INFORMATION */}
                    <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
                        <Typography variant="h6" gutterBottom>
                            Personal Information
                        </Typography>
                        <Divider sx={{ mb: 2 }} />
                        <Grid container spacing={2}>
                            {/* Name */}
                            <Grid xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    name="name"
                                    label="Name"
                                    variant="outlined"
                                    value={formData.name}
                                    onChange={handleChange}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <BsPerson />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>
                            {/* Password */}
                            <Grid xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    type="password"
                                    name="password"
                                    label="Password"
                                    variant="outlined"
                                    value={formData.password}
                                    onChange={handleChange}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <BsLock />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>
                            {/* Phone */}
                            <Grid xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    name="phone"
                                    label="Phone Number"
                                    variant="outlined"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <BsTelephone />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>
                            {/* Email */}
                            <Grid xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    name="email"
                                    label="Email"
                                    variant="outlined"
                                    value={formData.email}
                                    onChange={handleChange}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <BsEnvelope />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>
                            {/* Date of Birth */}
                            <Grid xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    type="date"
                                    name="dob"
                                    label="Date of Birth"
                                    variant="outlined"
                                    value={formData.dob}
                                    onChange={handleChange}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <BsCalendar />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>
                            {/* Relationship Status */}
                            <Grid xs={12} sm={6}>
                                <TextField
                                    select
                                    fullWidth
                                    name="relationshipStatus"
                                    label="Relationship Status"
                                    variant="outlined"
                                    value={formData.relationshipStatus}
                                    onChange={handleChange}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <BsHeart />
                                            </InputAdornment>
                                        ),
                                    }}
                                >
                                    {relationshipOptions.map((option) => (
                                        <MenuItem
                                            key={option.value}
                                            value={option.value}
                                        >
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                        </Grid>
                    </Paper>

                    {/* PROFESSIONAL & INTERESTS */}
                    <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
                        <Typography variant="h6" gutterBottom>
                            Professional & Interests
                        </Typography>
                        <Divider sx={{ mb: 2 }} />
                        <Grid container spacing={2}>
                            {/* Profession */}
                            <Grid xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    name="profession"
                                    label="Profession"
                                    variant="outlined"
                                    value={formData.profession}
                                    onChange={handleChange}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <BsBriefcase />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>
                            {/* Hobby */}
                            <Grid xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    name="hobby"
                                    label="Hobby"
                                    variant="outlined"
                                    value={formData.hobby}
                                    onChange={handleChange}
                                />
                            </Grid>
                            {/* Skills */}
                            <Grid xs={12}>
                                <TextField
                                    fullWidth
                                    name="skills"
                                    label="Skills (comma separated)"
                                    variant="outlined"
                                    value={formData.skills}
                                    onChange={handleChange}
                                />
                            </Grid>
                            {/* Others */}
                            <Grid xs={12}>
                                <TextField
                                    fullWidth
                                    name="others"
                                    label="Other Details"
                                    variant="outlined"
                                    multiline
                                    rows={4}
                                    value={formData.others}
                                    onChange={handleChange}
                                />
                            </Grid>
                        </Grid>
                    </Paper>

                    {/* EDUCATIONAL INFORMATION */}
                    <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
                        <Typography variant="h6" gutterBottom>
                            Educational Information
                        </Typography>
                        <Divider sx={{ mb: 2 }} />
                        <Grid container spacing={2}>
                            {/* School */}
                            <Grid xs={12} sm={4}>
                                <TextField
                                    fullWidth
                                    name="school"
                                    label="School"
                                    variant="outlined"
                                    value={formData.school}
                                    onChange={handleChange}
                                />
                            </Grid>
                            {/* College */}
                            <Grid xs={12} sm={4}>
                                <TextField
                                    fullWidth
                                    name="college"
                                    label="College"
                                    variant="outlined"
                                    value={formData.college}
                                    onChange={handleChange}
                                />
                            </Grid>
                            {/* University */}
                            <Grid xs={12} sm={4}>
                                <TextField
                                    fullWidth
                                    name="university"
                                    label="University"
                                    variant="outlined"
                                    value={formData.university}
                                    onChange={handleChange}
                                />
                            </Grid>
                            {/* Favorite Subject */}
                            <Grid xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    name="favoriteSubject"
                                    label="Favorite Subject"
                                    variant="outlined"
                                    value={formData.favoriteSubject}
                                    onChange={handleChange}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <BsStar />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>
                            {/* Weak Subject */}
                            <Grid xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    name="weakSubject"
                                    label="Weak Subject"
                                    variant="outlined"
                                    value={formData.weakSubject}
                                    onChange={handleChange}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <BsQuestionCircle />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </Paper>

                    <Box sx={{ textAlign: 'center', mt: 2 }}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            size="large"
                            disabled={loading}
                            sx={{ minWidth: 150 }}
                        >
                            {loading ? (
                                <CircularProgress size={24} color="inherit" />
                            ) : (
                                'Save Changes'
                            )}
                        </Button>
                    </Box>
                </form>
            </Box>

            {/* Error Modal */}
            <Dialog open={errorModalOpen} onClose={handleCloseErrorModal}>
                <DialogTitle>Error</DialogTitle>
                <DialogContent>
                    <DialogContentText>{errorMessage}</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseErrorModal} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default EditProfile;
