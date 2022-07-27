import React from 'react';
import { PersonRounded } from '@mui/icons-material';
import { Avatar, Box, Button, Container, createTheme, CssBaseline, ThemeProvider, Typography } from '@mui/material';
import { logout } from '../api/auth.api';
import { useSessionContext } from '../context/session.context';

const Dashboard: React.FC = () => {

  const theme = createTheme();
  const sessionContext = useSessionContext();

  return (
    <ThemeProvider theme={theme}>
      <Container component='main' maxWidth='md'>
        <CssBaseline />
        <Box sx={{ alignItems: 'center', display: 'flex', flexDirection: 'column', marginTop: 8 }}>
          <Avatar sx={{ margin: 1, backgroundColor: 'secondary' }}>
            <PersonRounded />
          </Avatar>
          <Typography component='h1' variant='h5'>
            {sessionContext.user.firstName} {sessionContext.user.lastName}
          </Typography>
          <Button variant='contained' sx={{ marginBottom: 2, marginTop: 2 }} onClick={() => logout()}>
            Log Out
          </Button>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default Dashboard;
