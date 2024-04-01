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

import TargetEditCard from './target-edit-card';
import TargetDeleteCard from './target-delete-card';

// ----------------------------------------------------------------------

export default function TargetCard({ target }) {
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const handleEditClick = () => {
    console.log(target);
    setShowEditPopup(true);
  };

  const handleDeleteClick = () => {
    setShowDeleteConfirmation(true);
  };

  const handleEditSave = (editedContent) => {
    console.log('Edited target:', editedContent);
  };

  const handleDeleteConfirm = () => {
    console.log('Deleting target:', target);
  };

  const renderStatus = (
    <Label
      variant="filled"
      color={(target.isEnabled && 'error') || 'info'}
      sx={{
        zIndex: 9,
        top: 16,
        right: 16,
        position: 'absolute',
        textTransform: 'uppercase',
      }}
    >
      {target.isEnabled ? 'enabled' : 'disabled'}
    </Label>
  );

  const renderImg = (
    <Box
      component="img"
      alt={target.targetName}
      src={`http://localhost:8080/${target.targetImage}`}
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
          {target.status && renderStatus}
          {renderImg}
        </Box>

        <Stack spacing={2} sx={{ px: 2, pt: 2, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="body1" sx={{ flexGrow: 1 }}>
            {target.targetName}
          </Typography>
          <div>
            <Iconify icon="akar-icons:edit" onClick={handleEditClick} style={{ cursor: 'pointer' }}/>
            <Iconify icon="fluent:delete-12-regular" onClick={handleDeleteClick} style={{ cursor: 'pointer' }}/>
          </div>
        </Stack>
        <Tooltip title={target.description}> {/* Use Tooltip component */}
          <Typography variant="body2" sx={{  padding: 2 }}>
            {target.description}
          </Typography>
        </Tooltip>

      </Link>

      {/* Edit Popup */}
      {showEditPopup && (
        <TargetEditCard 
          target={target}
          onClose={() => setShowEditPopup(false)}
          onSave={handleEditSave}
        />
      )}

      {/* Delete Confirmation */}
      {showDeleteConfirmation && (
        <TargetDeleteCard
          target={target}
          onClose={() => setShowDeleteConfirmation(false)}
          onDelete={handleDeleteConfirm}
        />
      )}

    </Card>
  );
}

TargetCard.propTypes = {
  target: PropTypes.object,
};
