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
          backgroundColor: 'rgba(50, 50, 50, 0.3)', // dark with transparency
          color: 'white',
          border: '1px solid rgba(55, 55, 55, 0.6)',
          backdropFilter: 'blur(30px)', // apply the blur effect
          borderRadius: 10,
        }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};
