import { useState, } from 'react';
import PropTypes from 'prop-types';
import { toast } from "react-toastify";

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
// import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import { useRouter } from 'src/routes/hooks';

import useApi from 'src/hooks/useApi';

import { fDate } from 'src/utils/format-time';

import Iconify from 'src/components/iconify';

import SceneDeleteCard from './scene-delete-card';


// ----------------------------------------------------------------------

export default function SceneTableRow({
  id,
  selected,
  name,
  description,
  isEnabled,
  createdAt,
  updatedAt,
  views,
  handleClick,
  refresh
}) {
  const router = useRouter();

  const { deleteScene } = useApi();

  const [open, setOpen] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const handleDeleteClick = () => {
    setShowDeleteConfirmation(true);
  };

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleSceneEdit = () => {
    console.log(id);
    router.push(`/scenes/edit/${id}`);
  };

  const handleSceneDelete = () => {
    deleteScene(id)
      .then(() => {
        refresh();
        setShowDeleteConfirmation(false);
        toast.success('Scene deleted');
      }).catch((error) => {
        toast.error('Error deleting scene');
        console.error('Error deleting scene:', error.response.data.message);
      });
  };

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected} >
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={handleClick} />
        </TableCell>

        <TableCell component="th" scope="row" padding="none">
          <Stack direction="row" alignItems="center" spacing={2}>
            {/* <Avatar alt={name} src={avatarUrl} /> */}
            <Typography variant="subtitle2" noWrap>
              {name}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell>
          <Box width={300}>
            <Typography variant="body2" noWrap>
              {description}
            </Typography>
          </Box>
        </TableCell>

        <TableCell>{fDate(createdAt)}</TableCell>

        <TableCell>{fDate(updatedAt)}</TableCell>

        <TableCell align="center">{views || 0}</TableCell>

        <TableCell align="center">{isEnabled ? 'Yes' : 'No'}</TableCell>

        {/* <TableCell>
          <Label color={(status === 'banned' && 'error') || 'success'}>{status}</Label>
        </TableCell> */}

        <TableCell align="right">
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={() => setOpen(null)}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: { width: 140 },
        }}
      >
        <MenuItem onClick={handleSceneEdit}>
          <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem onClick={handleDeleteClick} sx={{ color: 'error.main' }}>
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>

      {showDeleteConfirmation && (
        <SceneDeleteCard
          onClose={() => setShowDeleteConfirmation(false)}
          onDelete={handleSceneDelete}
        />
      )}
    </>
  );
}

SceneTableRow.propTypes = {
  id: PropTypes.string,
  selected: PropTypes.bool,
  name: PropTypes.string,
  description: PropTypes.string,
  isEnabled: PropTypes.bool,
  createdAt: PropTypes.string,
  updatedAt: PropTypes.string,
  views: PropTypes.number,
  handleClick: PropTypes.func,
  refresh: PropTypes.func,
};
