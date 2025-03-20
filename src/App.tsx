import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { CircularProgress, Box } from '@mui/material';

// Lazy load the AuthForm component
const Home = lazy(() => import('./components/Home.tsx'));

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
                </Routes>
            </Suspense>
        </Router>
    );
}

export default App;
