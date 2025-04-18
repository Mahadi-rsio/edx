import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { CircularProgress, Box } from '@mui/material';

// Lazy load the AuthForm component
const Home = lazy(() => import('./components/Home.tsx'));
const CreatePost = lazy(() => import('./components/CreatePost.tsx'));
const Search = lazy(() => import('./components/Search.tsx'));
const EditProfile = lazy(() => import('./components/EditProfile.tsx'));
const Accounts = lazy(() => import('./components/Accounts.tsx'));
const EditPost = lazy(() => import('./components/EditPost.tsx'));
//const Fingerprint = lazy(() => import('./components/Fingerprint.tsx'));


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
                    <Route path="/search" element={<Search />} />
                    <Route path="/edit_profile" element={<EditProfile />} />
                    <Route path="/accounts" element={<Accounts />} />
                    <Route path="/edit_post/:postId" element={<EditPost />} />
  
                </Routes>
            </Suspense>
        </Router>
    );
}

export default App;
