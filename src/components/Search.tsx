import React, { useState, useEffect, useCallback } from 'react';

import TextField from '@mui/material/TextField';
import { Box, styled, Divider, Typography } from '@mui/material';
import { FaSearch, FaTag } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';
import { debounce } from 'lodash';
import { LinerLoader } from './Loader';

const NEXT_PUBLIC_SUPABASE_URL = 'https://dfsnnzjmndfnhbslndmr.supabase.co';
const NEXT_PUBLIC_SUPABASE_ANON_KEY =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRmc25uemptbmRmbmhic2xuZG1yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA5ODMwMzYsImV4cCI6MjA1NjU1OTAzNn0.P-XAEc51Mi5NoNhg-WsfXBeo98rClWVjWL5er05AVo8';
const supabase = createClient(
    NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY,
);

interface Option {
    label: string;
}

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

const OptionBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),
    cursor: 'pointer',
}));

const Test: React.FC = () => {
    const [inputValue, setInputValue] = useState<string>('');
    const [options, setOptions] = useState<Option[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [isTextFieldFocused, setIsTextFieldFocused] = useState(false);
    const navigate = useNavigate();

    const fetchKeywordsDebounced = useCallback(
        debounce(async (query: string) => {
            if (!query.trim() || query.length < 2) {
                setOptions([]);
                setLoading(false);
                return;
            }
            setLoading(true);
            try {
                const { data, error } = await supabase
                    .from('keywords')
                    .select('label')
                    .ilike('label', `%${query}%`)
                    .order('label', { ascending: true });
                if (error) throw error;
                setOptions(data.map((item) => ({ label: item.label })));
            } catch (err) {
                console.error('Error fetching keywords:', err);
            } finally {
                setLoading(false);
            }
        }, 300),
        [],
    );

    useEffect(() => {
        if (inputValue.trim().length >= 2) {
            fetchKeywordsDebounced(inputValue);
        } else {
            setOptions([]);
            setLoading(false);
        }
    }, [inputValue, fetchKeywordsDebounced]);

    const saveKeyword = async (keyword: string) => {
        try {
            const { error } = await supabase
                .from('keywords')
                .insert([{ label: keyword }]);
            if (error) throw error;
            setOptions((prev) =>
                [...prev, { label: keyword }].sort((a, b) =>
                    a.label.localeCompare(b.label),
                ),
            );
        } catch (err) {
            console.error('Error saving keyword:', err);
        }
    };

    const handleSubmit = async () => {
        const trimmed = inputValue.trim();
        if (!trimmed) return;
        const exists = options.some(
            (o) => o.label.toLowerCase() === trimmed.toLowerCase(),
        );
        if (!exists) await saveKeyword(trimmed);
        setInputValue('');
    };

    const handleKeyDown = async (
        event: React.KeyboardEvent<HTMLDivElement>,
    ) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            await handleSubmit();
        }
    };

    const handleOptionClick = (label: string) => {
        navigate(`/search="${label}"`);
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <SearchContainer>
                <TextField
                    variant="outlined"
                    placeholder="Type to search..."
                    fullWidth
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onFocus={() => setIsTextFieldFocused(true)}
                    onBlur={() => setIsTextFieldFocused(false)}
                    onKeyDown={handleKeyDown}
                    InputProps={{
                        style: { padding: '0px 18px', borderRadius: '12px' },
                        endAdornment: (
                            <FaSearch
                                style={{
                                    marginLeft: '8px',
                                    color: '#757575',
                                    cursor:
                                        inputValue.trim().length >= 2
                                            ? 'pointer'
                                            : 'not-allowed',
                                }}
                                onClick={() =>
                                    inputValue.trim().length >= 2 &&
                                    fetchKeywordsDebounced(inputValue)
                                }
                            />
                        ),
                    }}
                />
            </SearchContainer>
            <Divider sx={{ marginY: -1.5 }} />
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    gap: 2,
                    padding: 2,
                }}
            >
                {loading ? (
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            width: '100%',
                        }}
                    >
                        <LinerLoader />
                    </Box>
                ) : (
                    options.map((option, i) => (
                        <OptionBox
                            key={i}
                            onClick={() => handleOptionClick(option.label)}
                        >
                            <FaTag color="#888" />
                            <Typography>{option.label}</Typography>
                        </OptionBox>
                    ))
                )}
            </Box>
            {!isTextFieldFocused && !inputValue.trim() && (
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        flex: 1,
                        mt: 2,
                    }}
                >
                    <img
                        src="/undraw_file-searching_2ne8.svg"
                        alt="No search"
                        style={{ maxWidth: '30%', maxHeight: '50%' }}
                    />
                </Box>
            )}
        </Box>
    );
};

export default Test;
