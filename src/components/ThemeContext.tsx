import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';
import React, {
    createContext,
    useMemo,
    useState,
    useContext,
    useEffect,
} from 'react';
import '@fontsource/oswald/400.css';

// Define the type for the context
type ThemeContextType = {
    toggleTheme: () => void;
    darkMode: boolean;
};

// Create the context
export const ThemeContext = createContext<ThemeContextType | undefined>(
    undefined,
);

// Create custom hook for easier access
export function useThemeContext() {
    const context = useContext(ThemeContext);
    if (!context)
        throw new Error('useThemeContext must be used within ThemeProvider');
    return context;
}

// Create the provider
export const ThemeProviderComponent: React.FC<{
    children: React.ReactNode;
}> = ({ children }) => {
    // Load theme from localStorage or default to system preference
    const getInitialTheme = () => {
        const savedTheme = localStorage.getItem('darkMode');
        if (savedTheme !== null) {
            return JSON.parse(savedTheme); // Convert string back to boolean
        }
        return window.matchMedia('(prefers-color-scheme: dark)').matches; // System preference fallback
    };

    const [darkMode, setDarkMode] = useState<boolean>(getInitialTheme);

    // Update localStorage when darkMode changes
    useEffect(() => {
        localStorage.setItem('darkMode', JSON.stringify(darkMode));
    }, [darkMode]);

    const theme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode: darkMode ? 'dark' : 'light',
                    background: {
                        default: darkMode ? '#000012' : '#ffffff',
                        paper: darkMode ? '#000013' : '#f5f5f5',
                    },
                    text: {
                        primary: darkMode ? '#F1FAEE' : '#000000',
                    },
                },
                typography: {
                    fontFamily: 'Oswald, sans-serif', // ✅ Set Oswald as default font
                },
            }),
        [darkMode],
    );

    const toggleTheme = () => setDarkMode((prev) => !prev);

    return (
        <ThemeContext.Provider value={{ toggleTheme, darkMode }}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </ThemeContext.Provider>
    );
};
