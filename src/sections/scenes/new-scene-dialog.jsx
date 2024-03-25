import * as React from 'react';
import PropTypes from 'prop-types';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { Box, Stack, useTheme, useMediaQuery } from '@mui/material';

import { FILES_URL } from 'src/constants';

import Iconify from 'src/components/iconify';

import AllTargetsTable from './all-targets-table';
import AllContentsTable from './all-contents-table';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const showDefaultImage = (
    <Box
        sx={{
            border: 1,
            borderColor: 'divider',
            borderRadius: 1,
            bgcolor: 'background.neutral',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 200,
            height: 200,
        }}
    >
        <Iconify icon="mdi:image-size-select-large" sx={{ width: 50, height: 50 }} />
    </Box>
);

const showSelectedImage = (selectedImage) => (
    <Box
        component="img"
        alt="scene"
        src={`${FILES_URL}/${selectedImage}`}
        sx={{
            width: 200,
            height: 200,
            objectFit: 'cover',
            border: 1,
            borderColor: 'divider',
            borderRadius: 1,
        }}
    />
);

export default function NewSceneDialog({ open, setOpen, addScene }) {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const [currentTarget, setCurrentTarget] = React.useState(null);
    const [currentContent, setCurrentContent] = React.useState(null);

    const clearCurrentData = () => {
        setCurrentTarget(null);
        setCurrentContent(null);
    }

    const handleAddScene = () => {
        addScene({ target: currentTarget, content: currentContent });
        clearCurrentData();
        setOpen(false);
    }

    const handleClose = () => {
        clearCurrentData();
        setOpen(false);
    };

    return (
        <BootstrapDialog
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={open}
            fullScreen
        >
            <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                New Scene
            </DialogTitle>
            <IconButton
                aria-label="close"
                onClick={handleClose}
                sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: theme.palette.grey[500],
                }}
            >
                <Iconify icon="eva:close-fill" />
            </IconButton>
            <DialogContent dividers>
                <Stack direction="row" justifyContent="center" alignItems="center" mb={2}>
                    {currentTarget ? showSelectedImage(currentTarget.targetImage) : showDefaultImage}
                    <Iconify icon="material-symbols:link" sx={{ mx: 2, width: 30, height: 30 }} />
                    {currentContent ? showSelectedImage(currentContent.contentImage) : showDefaultImage}
                    <DialogActions sx={{ ml: 10 }}>
                        <Button
                            variant="contained"
                            color="inherit"
                            onClick={handleAddScene}
                            autoFocus
                        >
                            Add
                        </Button>
                    </DialogActions>
                </Stack>

                <Stack
                    direction={isSmallScreen ? 'column' : 'row'}
                    justifyContent="space-between"
                    mt={2}
                >
                    <AllTargetsTable selected={currentTarget} setSelected={setCurrentTarget} />
                    <AllContentsTable selected={currentContent} setSelected={setCurrentContent} />
                </Stack>
            </DialogContent>

        </BootstrapDialog>
    );
}

NewSceneDialog.propTypes = {
    open: PropTypes.bool,
    setOpen: PropTypes.func,
    addScene: PropTypes.func,
}