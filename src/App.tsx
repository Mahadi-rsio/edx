import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { CirculerLoader } from './components/Loader.tsx';

// Lazy load the AuthForm component
const Home = lazy(() => import('./components/Home.tsx'));
const CreatePost = lazy(() => import('./components/CreatePost.tsx'));
const Search = lazy(() => import('./components/Search.tsx'));
const EditProfile = lazy(() => import('./components/EditProfile.tsx'));
const Accounts = lazy(() => import('./components/Accounts.tsx'));
const EditPost = lazy(() => import('./components/EditPost.tsx'));
const Profile = lazy(() => import('./components/Profile.tsx'));
const Plans = lazy(() => import('./components/Plans'));
const Comment = lazy(() => import('./components/Comment.tsx'));

function App() {
    return (
        <Router>
            <Suspense
                fallback={
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '100vh',
                        }}
                    >
                        <CirculerLoader />
                    </Box>
                }
            >
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/create_post" element={<CreatePost />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/edit_profile" element={<EditProfile />} />
                    <Route path="/accounts" element={<Accounts />} />
                    <Route path="/edit_post/:postId" element={<EditPost />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/plans" element={<Plans />} />
                    <Route path="/comment/:postId" element={<Comment />} />

                    <Route
                        path="*"
                        element={
                            <>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        height: '100vh',
                                    }}
                                >
                                    <img
                                        src="/undraw_page-eaten_b2rt.svg"
                                        alt="Not Found"
                                        style={{
                                            maxWidth: '60%',
                                            maxHeight: '70%',
                                        }}
                                    />
                                    <Typography variant="h6" sx={{ mt: 2 }}>
                                        404 : Page Not Found
                                    </Typography>
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        sx={{ mt: 2 }}
                                        onClick={() =>
                                            (window.location.href = '/')
                                        }
                                    >
                                        Go Home
                                    </Button>
                                </Box>
                            </>
                        }
                    />
                </Routes>
            </Suspense>
        </Router>
    );
}

export default App;
