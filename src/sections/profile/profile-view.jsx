import React from 'react';

import {
  Card,
  Grid,
//   Link,
CardMedia,
Container,
  Typography,
//   Breadcrumbs,
  CardContent,
} from '@mui/material';

export default function ProfilePage() {
  return (
    <section style={{ backgroundColor: '#eee' }}>
      <Container className="py-5">
        <Grid container spacing={4}>
          {/* <Grid item xs={12}>
            <Breadcrumbs aria-label="breadcrumb" className="bg-light rounded-3 p-3 mb-4">
              <Link color="inherit" href="#">
                Home
              </Link>
              <Link color="inherit" href="#">
                User
              </Link>
              <Typography color="textPrimary">User Profile</Typography>
            </Breadcrumbs>
          </Grid> */}

          <Grid item lg={4}>
            <Card className="mb-4">
              <CardContent className="text-center">
                <CardMedia
                  component="img"
                  image="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                  alt="avatar"
                  className="rounded-circle"
                  style={{ width: '150px' }}
                />
                <Typography variant="body2" color="textSecondary" className="mb-4">Bay Area, San Francisco, CA</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item lg={8}>
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
      </Container>
    </section>
  );
}
