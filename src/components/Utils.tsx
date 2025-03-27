import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

interface DarkOutlinedSnackbarProps {
    open: boolean;
    onClose: (event: React.SyntheticEvent | Event, reason?: string) => void;
    message: string;
}

export const DarkOutlinedSnackbar: React.FC<DarkOutlinedSnackbarProps> = ({
    open,
    onClose,
    message,
}) => {
    return (
        <Snackbar open={open} autoHideDuration={3000} onClose={onClose}>
            <Alert
                severity="info"
                variant="outlined"
                sx={{
                    backgroundColor: 'rgba(0, 0, 0, 0.1)', // dark with transparency
                    color: 'white',
                    border: '1px solid rgba(55, 55, 55, 0.6)',
                    backdropFilter: 'blur(50px)', // apply the blur effect
                    borderRadius: 10,
                }}
            >
                {message}
            </Alert>
        </Snackbar>
    );
};

function saveDataInLocalStorageAsJSON(details: object, key: string) {
    const saveDataAsJsonString = JSON.stringify(details, null, 2);
    localStorage.setItem(key, saveDataAsJsonString);
}

function getDataFromLocalStorageAsJSON(key: string) {
    const storedJsonData = localStorage.getItem(key);
    const extractedDataFromLocalStorage = JSON.parse(
        storedJsonData ? storedJsonData : '',
    );
    return extractedDataFromLocalStorage;
}
export { saveDataInLocalStorageAsJSON, getDataFromLocalStorageAsJSON };
