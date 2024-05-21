import { useState, useEffect } from 'react';
import { ToastContainer } from "react-toastify";

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import { useRouter } from 'src/routes/hooks';

import useApi from 'src/hooks/useApi';

import Iconify from 'src/components/iconify';

import TargetCard from '../target-card';

// ----------------------------------------------------------------------

export default function TargetsView() {
  const router = useRouter();

  const [refresh, setRefresh] = useState(false);
  const [targets, setTargets] = useState([]);

  const { getAllTargets } = useApi();

  useEffect(() => {
    const fetchData = async () => {
      const response = await getAllTargets();

      setTargets(response.data);
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh]);

  const handleClickNewTarget = () => {
    router.push('/targets/new');
  };

  const refreshContents = () => {
    setRefresh(!refresh);
  };

  return (
    <Container maxWidth>
      <ToastContainer />
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Targets</Typography>

        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="eva:plus-fill" />}
          onClick={handleClickNewTarget}
        >
          Add Target
        </Button>
      </Stack>
      <Grid container spacing={3}>
        {targets.map((target) => (
          <Grid key={target._id} xs={12} sm={6} md={3}>
            <TargetCard target={target} refresh={refreshContents} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
