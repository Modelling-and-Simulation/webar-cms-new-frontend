import { useState } from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';

import ContentEditCard from './content-edit-card';
import ContentDeleteCard from './content-delete-card';

// ----------------------------------------------------------------------

export default function ContentCard({ content }) {
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const handleEditClick = () => {
    setShowEditPopup(true);
  };

  const handleDeleteClick = () => {
    setShowDeleteConfirmation(true);
    // Handle delete functionality here
  };

  const handleEditSave = (editedContent) => {
    // Implement edit functionality here
    console.log('Edited content:', editedContent);
  };

  const handleDeleteConfirm = () => {
    // Implement delete functionality here
    console.log('Deleting content:', content);
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
            <Iconify icon="akar-icons:edit" onClick={handleEditClick} style={{ cursor: 'pointer' }}/>
            <Iconify icon="fluent:delete-12-regular" onClick={handleDeleteClick} style={{ cursor: 'pointer' }}/>
          </div>
        </Stack>
        <Tooltip title={content.description}> {/* Use Tooltip component */}
          <Typography variant="body2" sx={{  padding: 2 }}>
            {content.description}
          </Typography>
        </Tooltip>

      </Link>

      {/* Edit Popup */}
      {showEditPopup && (  
        <ContentEditCard 
          content={content}
          onClose={() => setShowEditPopup(false)}
          onSave={handleEditSave}
        />
      )}

      {/* Delete Confirmation */}
      {showDeleteConfirmation && (
        <ContentDeleteCard
          onClose={() => setShowDeleteConfirmation(false)}
          onDelete={handleDeleteConfirm}
        />
      )}

    </Card>
  );
}

ContentCard.propTypes = {
  content: PropTypes.object,
};
