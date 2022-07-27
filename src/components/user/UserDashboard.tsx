import React from 'react';
import { PeopleRounded } from '@mui/icons-material';
import { Avatar, Box, Container, createTheme, CssBaseline, ThemeProvider, Typography } from '@mui/material';
import UserDataTable from './UserDataTable';

const UserDashboard: React.FC = () => {

  const theme = createTheme();

  return (
    <ThemeProvider theme={theme}>
      <Container component='main' maxWidth='lg'>
        <CssBaseline />
        <Box sx={{ alignItems: 'center', display: 'flex', flexDirection: 'column', marginTop: 8 }}>
          <Avatar sx={{ margin: 1, backgroundColor: 'secondary' }}>
            <PeopleRounded />
          </Avatar>
          <Typography component='h1' variant='h5'>
            User Dashboard
          </Typography>
          <UserDataTable />
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default UserDashboard;
