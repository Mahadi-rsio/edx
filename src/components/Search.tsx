import React, { useState, useEffect } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { Box, styled } from '@mui/material';
import { FaSearch } from 'react-icons/fa';
import { createClient } from '@supabase/supabase-js';

// Supabase client initialization
const NEXT_PUBLIC_SUPABASE_URL = 'https://dfsnnzjmndfnhbslndmr.supabase.co';
const NEXT_PUBLIC_SUPABASE_ANON_KEY =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRmc25uemptbmRmbmhic2xuZG1yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA5ODMwMzYsImV4cCI6MjA1NjU1OTAzNn0.P-XAEc51Mi5NoNhg-WsfXBeo98rClWVjWL5er05AVo8';
const supabase = createClient(
    NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY,
);

// Define the type for autocomplete options
interface Option {
    label: string;
}

// Styled Box for the search bar container
const SearchContainer = styled(Box)(({ theme }) => ({
    width: '100%',
    maxWidth: '600px',
    margin: '20px auto',
    padding: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
        maxWidth: '100%',
        padding: theme.spacing(1),
    },
}));

// Styled Autocomplete for custom styling
const StyledAutocomplete = styled(Autocomplete<Option, false, false, true>)(
    ({ theme }) => ({
        '& .MuiOutlinedInput-root': {
            borderRadius: '12px',
            backgroundColor: theme.palette.background.paper,
            transition: 'all 0.3s ease-in-out',
        },
        '& .MuiInputLabel-root': {
            color: theme.palette.text.secondary,
            fontWeight: 500,
        },
        '& .MuiAutocomplete-popupIndicator': {
            color: theme.palette.primary.main,
        },
        '& .MuiAutocomplete-clearIndicator': {
            color: theme.palette.text.secondary,
        },
        '& .MuiAutocomplete-popper': {
            marginTop: theme.spacing(1.5),
        },
    }),
);

const Test: React.FC = () => {
    const [inputValue, setInputValue] = useState<string>('');
    const [options, setOptions] = useState<Option[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    console.log(loading);

    // Fetch keywords from Supabase on component mount
    useEffect(() => {
        fetchKeywords();
    }, []);

    // Fetch keywords from Supabase
    const fetchKeywords = async () => {
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from('keywords')
                .select('label')
                .order('label', { ascending: true });

            if (error) {
                console.error('Error fetching keywords:', error);
                return;
            }

            const fetchedOptions: Option[] = data.map((item) => ({
                label: item.label,
            }));
            setOptions(fetchedOptions);
        } catch (err) {
            console.error('Unexpected error:', err);
        } finally {
            setLoading(false);
        }
    };

    // Save new keyword to Supabase
    const saveKeyword = async (keyword: string) => {
        try {
            const { error } = await supabase
                .from('keywords')
                .insert([{ label: keyword }]);

            if (error) {
                console.error('Error saving keyword:', error);
                return;
            }

            // Update options locally to include the new keyword
            setOptions((prev) =>
                [...prev, { label: keyword }].sort((a, b) =>
                    a.label.localeCompare(b.label),
                ),
            );
            console.log(`Keyword "${keyword}" saved to Supabase`);
        } catch (err) {
            console.error('Unexpected error:', err);
        }
    };

    // Handle input change for suggestions
    // const handleInputChange = (event: React.SyntheticEvent, value: string) => {
    //     setInputValue(value);
    //     console.log('Input changed:', value, event);
    // };

    // Handle submission (used for both Enter key and icon click)
    const handleSubmit = async () => {
        if (inputValue.trim()) {
            const keyword = inputValue.trim();
            // Check if the keyword already exists (case-insensitive)
            const keywordExists = options.some(
                (option) =>
                    option.label.toLowerCase() === keyword.toLowerCase(),
            );

            if (!keywordExists) {
                await saveKeyword(keyword);
            }

            // Clear the input after submission
            setInputValue('');
        }
    };

    // Handle Enter key press
    const handleKeyDown = async (
        event: React.KeyboardEvent<HTMLDivElement>,
    ) => {
        if (event.key === 'Enter' && inputValue.trim()) {
            event.preventDefault(); // Prevent default form submission behavior
            await handleSubmit();
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100vh',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    padding: '16px',
                }}
            >
                <SearchContainer>
                    <StyledAutocomplete
                        freeSolo
                        options={options}
                        getOptionLabel={(option) =>
                            typeof option === 'string' ? option : option.label
                        }
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                variant="outlined"
                                placeholder="Type to search..."
                                fullWidth
                                onKeyDown={handleKeyDown}
                                InputProps={{
                                    ...params.InputProps,
                                    style: { padding: '10px 14px' },
                                    endAdornment: (
                                        <FaSearch
                                            style={{
                                                marginLeft: '8px',
                                                color: '#757575',
                                                cursor: 'pointer',
                                            }}
                                            onClick={handleSubmit}
                                        />
                                    ),
                                }}
                            />
                        )}
                    />
                </SearchContainer>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flex: 1,
                }}
            >
                <img
                    src="/undraw_file-searching_2ne8.svg"
                    alt="Centered Image"
                    style={{ maxWidth: '30%', maxHeight: '50%' }}
                />
            </Box>
        </Box>
    );
};

export default Test;
