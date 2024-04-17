// DeleteConfirmation.js
import React from 'react';
import PropTypes from 'prop-types';
import "react-toastify/dist/ReactToastify.css";

import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

const LinkDeleteCard = ({ onClose, onDelete }) => (
  <Dialog open onClose={onClose}>
    <DialogTitle>Confirm Deletion</DialogTitle>
    <DialogContent>
      Are you sure you want to delete this link?
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose}>Cancel</Button>
      <Button onClick={onDelete} color="error">Delete</Button>
    </DialogActions>
  </Dialog>
);

LinkDeleteCard.propTypes = {
  onClose: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default LinkDeleteCard;
