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

import ContentCard from '../content-card';

// ----------------------------------------------------------------------

export default function ContentsView() {
  const router = useRouter();

  const [refresh, setRefresh] = useState(false);
  const [contents, setContents] = useState([]);

  const { getAllContents } = useApi();

  useEffect(() => {
    const fetchData = async () => {
      const response = await getAllContents();

      setContents(response.data);
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh]);

  const handleClickNewContent = () => {
    router.push('/contents/new');
  };

  const refreshContents = () => {
    setRefresh(!refresh);
  };

  return (
    <Container maxWidth>
      <ToastContainer />
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Contents</Typography>

        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="eva:plus-fill" />}
          onClick={handleClickNewContent}
        >
          Add Content
        </Button>
      </Stack>
      <Grid container spacing={3}>
        {contents.map((target) => (
          <Grid key={target._id} xs={12} sm={6} md={3}>
            <ContentCard content={target} refresh={refreshContents} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
