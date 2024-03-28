import PropTypes from 'prop-types';
import React, { useState } from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

const ContentEditCard = ({ content, onClose, onSave }) => {
  const [editedContent, setEditedContent] = useState({ ...content });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedContent((prevContent) => ({
      ...prevContent,
      [name]: value,
    }));
  };

  const handleSave = () => {
    onSave(editedContent);
    onClose();
  };

  return (
    <Dialog open onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Edit Content</DialogTitle>
      <DialogContent dividers>
        <TextField
          fullWidth
          label="Name"
          name="contentName"
          value={editedContent.contentName}
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

ContentEditCard.propTypes = {
    content: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
};

export default ContentEditCard;
