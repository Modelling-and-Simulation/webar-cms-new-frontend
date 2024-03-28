import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import Label from 'src/components/label';

// ----------------------------------------------------------------------

export default function TargetCard({ target }) {
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
      <Link color="inherit" underline="hover" variant="subtitle2" noWrap>
        <Box sx={{ pt: '100%', position: 'relative' }} onMouseOver={console.log('entered')}
      onMouseLeave={console.log('left')}>
          {target.status && renderStatus}
          {renderImg}
          {console.log('hi')}
        </Box>

        <Stack spacing={2} sx={{ px: 2, pt: 2 }}>
          {target.targetName}
        </Stack>
        <Typography variant="body2" sx={{ px: 2, pb: 2 }} noWrap>
          {target.description}
        </Typography>

      </Link>
    </Card>
  );
}

TargetCard.propTypes = {
  target: PropTypes.object,
};
