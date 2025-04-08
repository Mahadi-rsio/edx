// ConfirmationModal.tsx
import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
} from '@mui/material';

export interface ConfirmationModalProps {
    open: boolean;
    title?: string;
    description?: string;
    confirmText?: string;
    cancelText?: string;
    onConfirm: () => void;
    onCancel: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
    open,
    title,
    description,
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    onConfirm,
    onCancel,
}) => (
    <Dialog
        open={open}
        onClose={onCancel}
        aria-labelledby="confirmation-dialog-title"
        aria-describedby="confirmation-dialog-description"
    >
        {title && (
            <DialogTitle id="confirmation-dialog-title">{title}</DialogTitle>
        )}
        {description && (
            <DialogContent>
                <DialogContentText id="confirmation-dialog-description">
                    {description}
                </DialogContentText>
            </DialogContent>
        )}
        <DialogActions>
            <Button onClick={onCancel} color="inherit">
                {cancelText}
            </Button>
            <Button
                onClick={onConfirm}
                variant="contained"
                color="primary"
                autoFocus
            >
                {confirmText}
            </Button>
        </DialogActions>
    </Dialog>
);

export default ConfirmationModal;
