import { useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from "react-toastify";

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

import useApi from 'src/hooks/useApi';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';

import ContentEditCard from './content-edit-card';
import ContentDeleteCard from './content-delete-card';

// ----------------------------------------------------------------------

export default function ContentCard({ content, refresh }) {
  const { editContent, deleteContent } = useApi();
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const handleEditClick = () => {
    setShowEditPopup(true);
  };

  const handleDeleteClick = () => {
    setShowDeleteConfirmation(true);
  };

  const handleEdit = (editedContent) => {
    editContent(content._id, editedContent)
      .then(() => {
        refresh();
        setShowEditPopup(false);
        toast.success('Content updated');
      }).catch((error) => {
        toast.error('Error editing content');
        console.error('Error editing content:', error);
      });
  };

  const handleDelete = () => {
    deleteContent(content._id)
      .then(() => {
        refresh();
        setShowDeleteConfirmation(false);
        toast.success('Content deleted');
      }).catch((error) => {
        toast.error('Error deleting content');
        console.error('Error deleting content:', error);
      });
  };

  const renderStatus = (
    <Label
      variant="filled"
      color={(content.isEnabled && 'error') || 'info'}
      sx={{
        zIndex: 9,
        top: 16,
        right: 16,
        position: 'absolute',
        textTransform: 'uppercase',
      }}
    >
      {content.isEnabled ? 'enabled' : 'disabled'}
    </Label>
  );

  const renderImg = (
    <Box
      component="img"
      alt={content.targetName}
      src={`http://localhost:8080/${content.contentImage}`}
      sx={{
        top: 0,
        width: 1,
        height: 1,
        objectFit: 'cover',
        position: 'absolute',
      }}
    />
  );

  return (
    <Card>
      <Link color="inherit" underline="none" variant="subtitle2" noWrap sx={{ display: 'block' }}>
        <Box sx={{ pt: '100%', position: 'relative' }}>
          {content.status && renderStatus}
          {renderImg}
        </Box>

        <Stack spacing={2} sx={{ px: 2, pt: 2, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="body1" sx={{ flexGrow: 1 }}>
            {content.contentName}
          </Typography>
          <div>
            <Iconify icon="akar-icons:edit" onClick={handleEditClick} style={{ cursor: 'pointer' }} />
            <Iconify icon="fluent:delete-12-regular" onClick={handleDeleteClick} style={{ cursor: 'pointer' }} />
          </div>
        </Stack>
        <Tooltip title={content.description}> {/* Use Tooltip component */}
          <Typography variant="body2" sx={{ padding: 2 }}>
            {content.description}
          </Typography>
        </Tooltip>

      </Link>

      {/* Edit Popup */}
      {showEditPopup && (
        <ContentEditCard
          content={content}
          onConfirm={handleEdit}
          onClose={() => setShowEditPopup(false)}
        />
      )}

      {/* Delete Confirmation */}
      {showDeleteConfirmation && (
        <ContentDeleteCard
          content={content}
          onClose={() => setShowDeleteConfirmation(false)}
          onDelete={handleDelete}
        />
      )}

    </Card>
  );
}

ContentCard.propTypes = {
  content: PropTypes.object,
  refresh: PropTypes.func,
};
