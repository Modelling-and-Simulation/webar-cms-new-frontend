import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';

import { fDate } from 'src/utils/format-time';



// ----------------------------------------------------------------------

export default function SceneTableRow({
  selected,
  name,
  description,
  createdAt,
  updatedAt,
  noOfTargets,
  handleClick,
}) {

  return (
    <TableRow
      hover
      tabIndex={-1}
      role="checkbox"
      selected={selected}
      onClick={handleClick}
      sx={{ cursor: 'pointer' }}
    >
      <TableCell component="th" scope="row">
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

      <TableCell align="center">{noOfTargets || 0}</TableCell>

    </TableRow>
  );
}

SceneTableRow.propTypes = {
  selected: PropTypes.bool,
  name: PropTypes.string,
  description: PropTypes.string,
  createdAt: PropTypes.string,
  updatedAt: PropTypes.string,
  noOfTargets: PropTypes.number,
  handleClick: PropTypes.func,
};
