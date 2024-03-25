import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import Label from 'src/components/label';

// ----------------------------------------------------------------------

export default function ContentCard({ content }) {
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
      <Link color="inherit" underline="hover" variant="subtitle2" noWrap>
        <Box sx={{ pt: '100%', position: 'relative' }}>
          {content.status && renderStatus}
          {renderImg}
        </Box>

        <Stack spacing={2} sx={{ px: 2, pt: 2 }}>
          {content.contentName}
        </Stack>
        <Typography variant="body2" sx={{ px: 2, pb: 2 }} noWrap>
          {content.description}
        </Typography>

      </Link>
    </Card>
  );
}

ContentCard.propTypes = {
  content: PropTypes.object,
};
