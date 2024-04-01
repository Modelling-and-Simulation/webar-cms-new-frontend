import React from 'react';

import {
  Card,
  Grid,
  Stack,
  CardMedia,
  Container,
  Typography,
  CardContent,
} from '@mui/material';

export default function ProfilePage() {
  return (
    <Container maxWidth>
      <Stack direction="column" alignItems="flex-start" justifyContent="space-between" mb={6}>
        <Typography variant="h4" align="left" gutterBottom>Profile</Typography>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={6}> {/* Adjusted to half the width */}
            <Card className="mb-4" style={{ maxWidth: '250px' }}> {/* Set maximum width */}
              <CardContent className="text-center" style={{ justifyContent: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div>
                  <CardMedia
                    component="img"
                    image="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                    alt="avatar"
                    className="rounded-circle"
                    style={{ width: '150px' }}
                  />
                </div>
                <div>
                  <Typography variant="body2" color="textSecondary" className="mb-4">Bay Area, San Francisco, CA</Typography>
                </div>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12}> {/* Adjusted to half the width */}
            <Card className="mb-4">
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={3}>
                    <Typography variant="body2">Full Name</Typography>
                  </Grid>
                  <Grid item xs={12} sm={9}>
                    <Typography variant="body2" color="textSecondary">Johnatan Smith</Typography>
                  </Grid>
                </Grid>
                <hr />
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={3}>
                    <Typography variant="body2">Email</Typography>
                  </Grid>
                  <Grid item xs={12} sm={9}>
                    <Typography variant="body2" color="textSecondary">example@example.com</Typography>
                  </Grid>
                </Grid>
                <hr />
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={3}>
                    <Typography variant="body2">Phone</Typography>
                  </Grid>
                  <Grid item xs={12} sm={9}>
                    <Typography variant="body2" color="textSecondary">(097) 234-5678</Typography>
                  </Grid>
                </Grid>
                <hr />
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={3}>
                    <Typography variant="body2">Mobile</Typography>
                  </Grid>
                  <Grid item xs={12} sm={9}>
                    <Typography variant="body2" color="textSecondary">(098) 765-4321</Typography>
                  </Grid>
                </Grid>
                <hr />
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={3}>
                    <Typography variant="body2">Address</Typography>
                  </Grid>
                  <Grid item xs={12} sm={9}>
                    <Typography variant="body2" color="textSecondary">Bay Area, San Francisco, CA</Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Stack>
    </Container>
  );
}
