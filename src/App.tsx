import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { CircularProgress, Box } from '@mui/material';

// Lazy load the AuthForm component
const Home = lazy(() => import('./components/Home.tsx'));
const CreatePost = lazy(() => import('./components/CreatePost.tsx'));
const Test = lazy(() => import('./components/Test.tsx'));
const EditProfile = lazy(() => import('./components/EditProfile.tsx'));
const Accounts = lazy(() => import('./components/Accounts.tsx'));

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
                        <CircularProgress />
                    </Box>
                }
            >
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/create_post" element={<CreatePost />} />
                    <Route path="/test" element={<Test />} />
                    <Route path="/edit_profile" element={<EditProfile />} />
                    <Route path="/accounts" element={<Accounts />} />
                </Routes>
            </Suspense>
        </Router>
    );
}

export default App;
