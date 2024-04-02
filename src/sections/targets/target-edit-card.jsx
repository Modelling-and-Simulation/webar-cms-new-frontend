import PropTypes from 'prop-types';
import React, { useState } from 'react';
import "react-toastify/dist/ReactToastify.css";

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';


const TargetEditCard = ({ target, onClose, onConfirm }) => {
  const [editedContent, setEditedContent] = useState({ ...target });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedContent((prevContent) => ({
      ...prevContent,
      [name]: value,
    }));
  };

  const handleSave = () => {
    onConfirm(editedContent);
  };

  return (
    <Dialog open onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Edit Target</DialogTitle>
      <DialogContent dividers>
        <TextField
          fullWidth
          label="Name"
          name="targetName"
          value={editedContent.targetName}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          multiline
          label="Description"
          name="description"
          value={editedContent.description}
          onChange={handleChange}
          margin="normal"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave} color="primary">Save</Button>
      </DialogActions>
    </Dialog>
  );
};

TargetEditCard.propTypes = {
  target: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

export default TargetEditCard;
