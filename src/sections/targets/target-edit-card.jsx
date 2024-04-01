import PropTypes from 'prop-types';
import { toast } from "react-toastify";
import React, { useState } from 'react';
import "react-toastify/dist/ReactToastify.css";

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

// import { useRouter } from 'src/routes/hooks';

import useApi from 'src/hooks/useApi';

const TargetEditCard = ({ target, onClose, onSave }) => {
  // const router = useRouter();
  const { editTarget } = useApi();

  const [editedContent, setEditedContent] = useState({ ...target });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedContent((prevContent) => ({
      ...prevContent,
      [name]: value,
    }));
  };

  const handleSave = () => {
    const formData = new FormData();

    formData.append('targetName', editedContent.targetName);
    formData.append('description', editedContent.description);

    editTarget(target._id, formData).then((response) => {
        console.log('Target Updated', response);
        toast.success('Target updated successfully');
        // setTimeout(2000);
        // router.push(`${target._id}`);
    }).catch((error) => {
        console.error('Error updating target', error);
        toast.error('Error updating target');
    }).finally(() => {
        // setStatusMsg('');
    })
    onSave(editedContent);
    onClose();
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
    onSave: PropTypes.func.isRequired,
};

export default TargetEditCard;
