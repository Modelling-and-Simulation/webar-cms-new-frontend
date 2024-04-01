// DeleteConfirmation.js
import React from 'react';
import PropTypes from 'prop-types';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

import { useRouter } from 'src/routes/hooks';

import useApi from 'src/hooks/useApi';

const ContentDeleteCard = ({ content, onClose, onDelete }) => {
  const router = useRouter();
  const { deleteContent } = useApi();

  const handleDelete = () => {
    deleteContent(content._id).then((response) => {
      toast.success('Content deleted successfully');
      router.reload();
    }).catch((error) => {
      console.error('Error deleting content', error);
      toast.error('Error deleting content');
    }).finally(() => {
      // setStatusMsg('');
    })
    onDelete();
    onClose();
  };

  return (
    <Dialog open onClose={onClose}>
      <DialogTitle>Confirm Deletion</DialogTitle>
      <DialogContent>
        Are you sure you want to delete this content?
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleDelete} color="error">Delete</Button>
      </DialogActions>
    </Dialog>
  );
};

ContentDeleteCard.propTypes = {
    content: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
};

export default ContentDeleteCard;
