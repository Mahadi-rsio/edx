import React, { useState, FormEvent } from 'react';
import {
    Container,
    Typography,
    TextField,
    Button,
    MenuItem,
    Chip,
    Box,
    FormControl,
    InputLabel,
    Select,
    SelectChangeEvent,
    Stepper,
    Step,
    StepLabel,
    Divider,
    AppBar,
    Toolbar,
    IconButton,
} from '@mui/material';
import {
    FaUser,
    FaPhone,
    FaBirthdayCake,
    FaHeart,
    FaBriefcase,
    FaSchool,
    FaGraduationCap,
    FaBook,
    FaStar,
} from 'react-icons/fa';
import { BsArrowLeft } from 'react-icons/bs';

interface Profile {
    name: string;
    phone: string;
    dob: string;
    relationshipStatus: string;
    profession: string;
    hobbies: string[];
    skills: string[];
    school: string;
    college: string;
    university: string;
    favoriteSubject: string;
    weakSubject: string;
}

const EditProfile: React.FC = () => {
    // State for profile data
    const [profile, setProfile] = useState<Profile>({
        name: '',
        phone: '',
        dob: '',
        relationshipStatus: '',
        profession: '',
        hobbies: [],
        skills: [],
        school: '',
        college: '',
        university: '',
        favoriteSubject: '',
        weakSubject: '',
    });

    // State for chip inputs
    const [hobbyInput, setHobbyInput] = useState<string>('');
    const [skillInput, setSkillInput] = useState<string>('');

    // State for stepper
    const [activeStep, setActiveStep] = useState(0);
    const steps = [
        'Personal Information',
        'Education',
        'Professional Information',
        'Interests',
    ];

    // Handlers
    const handleChange = (
        e:
            | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            | SelectChangeEvent<string>,
    ) => {
        const { name, value } = e.target;
        setProfile((prev) => ({ ...prev, [name]: value }));
    };

    const handleHobbyAdd = () => {
        if (hobbyInput.trim() && !profile.hobbies.includes(hobbyInput.trim())) {
            setProfile((prev) => ({
                ...prev,
                hobbies: [...prev.hobbies, hobbyInput.trim()],
            }));
            setHobbyInput('');
        }
    };

    const handleSkillAdd = () => {
        if (skillInput.trim() && !profile.skills.includes(skillInput.trim())) {
            setProfile((prev) => ({
                ...prev,
                skills: [...prev.skills, skillInput.trim()],
            }));
            setSkillInput('');
        }
    };

    const handleHobbyDelete = (hobbyToDelete: string) => {
        setProfile((prev) => ({
            ...prev,
            hobbies: prev.hobbies.filter((hobby) => hobby !== hobbyToDelete),
        }));
    };

    const handleSkillDelete = (skillToDelete: string) => {
        setProfile((prev) => ({
            ...prev,
            skills: prev.skills.filter((skill) => skill !== skillToDelete),
        }));
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('Profile Data:', profile);
        // Replace with API call or logic to save the profile
    };

    return (
        <>
            <AppBar position="sticky">
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={() => window.history.back()}
                    >
                        <BsArrowLeft />
                    </IconButton>
                    <Typography
                        variant="h6"
                        sx={{ flexGrow: 1, textAlign: 'center' }}
                    >
                        Edit Profile
                    </Typography>
                </Toolbar>
            </AppBar>
            <Container maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
                {/* Stepper */}
                <Stepper
                    activeStep={activeStep}
                    alternativeLabel
                    sx={{ mb: 3 }}
                >
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>

                {/* Form */}
                <form onSubmit={handleSubmit}>
                    <Box sx={{ mt: 2 }}>
                        {/* Step 1: Personal Information */}
                        {activeStep === 0 && (
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 2,
                                }}
                            >
                                <Typography variant="h6">
                                    Personal Information
                                </Typography>
                                <TextField
                                    label="Name"
                                    name="name"
                                    value={profile.name}
                                    onChange={handleChange}
                                    InputProps={{
                                        startAdornment: (
                                            <FaUser
                                                style={{ marginRight: '8px' }}
                                            />
                                        ),
                                    }}
                                    fullWidth
                                    required
                                />
                                <TextField
                                    label="Phone"
                                    name="phone"
                                    value={profile.phone}
                                    onChange={handleChange}
                                    InputProps={{
                                        startAdornment: (
                                            <FaPhone
                                                style={{ marginRight: '8px' }}
                                            />
                                        ),
                                    }}
                                    fullWidth
                                    required
                                />
                                <TextField
                                    label="Date of Birth"
                                    name="dob"
                                    type="date"
                                    value={profile.dob}
                                    onChange={handleChange}
                                    InputProps={{
                                        startAdornment: (
                                            <FaBirthdayCake
                                                style={{ marginRight: '8px' }}
                                            />
                                        ),
                                    }}
                                    fullWidth
                                    required
                                    InputLabelProps={{ shrink: true }}
                                />
                                <FormControl fullWidth required>
                                    <InputLabel>Relationship Status</InputLabel>
                                    <Select
                                        name="relationshipStatus"
                                        value={profile.relationshipStatus}
                                        onChange={handleChange}
                                        inputProps={{
                                            startAdornment: (
                                                <FaHeart
                                                    style={{
                                                        marginRight: '8px',
                                                    }}
                                                />
                                            ),
                                        }}
                                    >
                                        <MenuItem value="Single">
                                            Single
                                        </MenuItem>
                                        <MenuItem value="In a Relationship">
                                            In a Relationship
                                        </MenuItem>
                                        <MenuItem value="Married">
                                            Married
                                        </MenuItem>
                                        <MenuItem value="Other">Other</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                        )}

                        {/* Step 2: Education */}
                        {activeStep === 1 && (
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 2,
                                }}
                            >
                                <Typography variant="h6">Education</Typography>
                                <TextField
                                    label="School"
                                    name="school"
                                    value={profile.school}
                                    onChange={handleChange}
                                    InputProps={{
                                        startAdornment: (
                                            <FaSchool
                                                style={{ marginRight: '8px' }}
                                            />
                                        ),
                                    }}
                                    fullWidth
                                />
                                <TextField
                                    label="College"
                                    name="college"
                                    value={profile.college}
                                    onChange={handleChange}
                                    InputProps={{
                                        startAdornment: (
                                            <FaGraduationCap
                                                style={{ marginRight: '8px' }}
                                            />
                                        ),
                                    }}
                                    fullWidth
                                />
                                <TextField
                                    label="University"
                                    name="university"
                                    value={profile.university}
                                    onChange={handleChange}
                                    InputProps={{
                                        startAdornment: (
                                            <FaGraduationCap
                                                style={{ marginRight: '8px' }}
                                            />
                                        ),
                                    }}
                                    fullWidth
                                />
                                <TextField
                                    label="Favorite Subject"
                                    name="favoriteSubject"
                                    value={profile.favoriteSubject}
                                    onChange={handleChange}
                                    InputProps={{
                                        startAdornment: (
                                            <FaStar
                                                style={{ marginRight: '8px' }}
                                            />
                                        ),
                                    }}
                                    fullWidth
                                />
                                <TextField
                                    label="Weak Subject"
                                    name="weakSubject"
                                    value={profile.weakSubject}
                                    onChange={handleChange}
                                    InputProps={{
                                        startAdornment: (
                                            <FaBook
                                                style={{ marginRight: '8px' }}
                                            />
                                        ),
                                    }}
                                    fullWidth
                                />
                            </Box>
                        )}

                        {/* Step 3: Professional Information */}
                        {activeStep === 2 && (
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 2,
                                }}
                            >
                                <Typography variant="h6">
                                    Professional Information
                                </Typography>
                                <TextField
                                    label="Profession"
                                    name="profession"
                                    value={profile.profession}
                                    onChange={handleChange}
                                    InputProps={{
                                        startAdornment: (
                                            <FaBriefcase
                                                style={{ marginRight: '8px' }}
                                            />
                                        ),
                                    }}
                                    fullWidth
                                />
                                <Box>
                                    <TextField
                                        label="Skills"
                                        value={skillInput}
                                        onChange={(e) =>
                                            setSkillInput(e.target.value)
                                        }
                                        onKeyDown={(e) =>
                                            e.key === 'Enter' &&
                                            (e.preventDefault(),
                                            handleSkillAdd())
                                        }
                                        fullWidth
                                    />
                                    <Button
                                        onClick={handleSkillAdd}
                                        sx={{ mt: 1 }}
                                    >
                                        Add Skill
                                    </Button>
                                    <Box
                                        sx={{
                                            mt: 1,
                                            display: 'flex',
                                            flexWrap: 'wrap',
                                            gap: 1,
                                        }}
                                    >
                                        {profile.skills.map((skill, index) => (
                                            <Chip
                                                key={index}
                                                label={skill}
                                                onDelete={() =>
                                                    handleSkillDelete(skill)
                                                }
                                            />
                                        ))}
                                    </Box>
                                </Box>
                            </Box>
                        )}

                        {/* Step 4: Interests */}
                        {activeStep === 3 && (
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 2,
                                }}
                            >
                                <Typography variant="h6">Interests</Typography>
                                <Box>
                                    <TextField
                                        label="Hobbies"
                                        value={hobbyInput}
                                        onChange={(e) =>
                                            setHobbyInput(e.target.value)
                                        }
                                        onKeyDown={(e) =>
                                            e.key === 'Enter' &&
                                            (e.preventDefault(),
                                            handleHobbyAdd())
                                        }
                                        fullWidth
                                    />
                                    <Button
                                        onClick={handleHobbyAdd}
                                        sx={{ mt: 1 }}
                                    >
                                        Add Hobby
                                    </Button>
                                    <Box
                                        sx={{
                                            mt: 1,
                                            display: 'flex',
                                            flexWrap: 'wrap',
                                            gap: 1,
                                        }}
                                    >
                                        {profile.hobbies.map((hobby, index) => (
                                            <Chip
                                                key={index}
                                                label={hobby}
                                                onDelete={() =>
                                                    handleHobbyDelete(hobby)
                                                }
                                            />
                                        ))}
                                    </Box>
                                </Box>
                            </Box>
                        )}
                    </Box>

                    {/* Divider */}
                    <Divider sx={{ my: 2 }} />

                    {/* Navigation Buttons */}
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Button
                            disabled={activeStep === 0}
                            onClick={() => setActiveStep((prev) => prev - 1)}
                            variant="outlined"
                        >
                            Back
                        </Button>
                        {activeStep < steps.length - 1 ? (
                            <Button
                                onClick={() =>
                                    setActiveStep((prev) => prev + 1)
                                }
                                variant="contained"
                            >
                                Next
                            </Button>
                        ) : (
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                            >
                                Save Profile
                            </Button>
                        )}
                    </Box>
                </form>
            </Container>
        </>
    );
};

export default EditProfile;
