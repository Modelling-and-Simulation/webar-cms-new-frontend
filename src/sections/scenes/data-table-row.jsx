import { useState } from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';

import { FILES_URL } from 'src/constants';

import Iconify from 'src/components/iconify';


// ----------------------------------------------------------------------

export default function DataTableRow({
  id,
  preview,
  name,
  description,
  isSelected,
  handleClick,
  data,
}) {
  const [open, setOpen] = useState(null);

  const handleCloseMenu = () => {
    setOpen(null);
  };

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={isSelected} onClick={handleClick}>

        <TableCell component="th" scope="row" >
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar alt={name} src={`${FILES_URL}/${preview}`} />
            <Typography variant="subtitle2" noWrap>
              {name}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell>
          <Box >
            <Typography variant="body2" noWrap>
              {description}
            </Typography>
          </Box>
        </TableCell>
      </TableRow>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: { width: 140 },
        }}
      >
        <MenuItem onClick={handleCloseMenu}>
          <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem onClick={handleCloseMenu} sx={{ color: 'error.main' }}>
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
    </>
  );
}

DataTableRow.propTypes = {
  id: PropTypes.string,
  preview: PropTypes.string,
  name: PropTypes.string,
  description: PropTypes.string,
  isSelected: PropTypes.bool,
  handleClick: PropTypes.func,
  data: PropTypes.object,
};
