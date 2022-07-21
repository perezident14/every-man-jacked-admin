import React from 'react';
import { Avatar, Box, Button, Container, createTheme, CssBaseline, ThemeProvider, Typography } from '@mui/material';
import { FitnessCenterRounded } from '@mui/icons-material';

const ExerciseDashboard: React.FC = () => {

  const theme = createTheme();

  return (
    <ThemeProvider theme={theme}>
      <Container component='main' maxWidth='md'>
        <CssBaseline />
        <Box sx={{ alignItems: 'center', display: 'flex', flexDirection: 'column', marginTop: 8 }}>
          <Avatar sx={{ margin: 1, backgroundColor: 'secondary' }}>
            <FitnessCenterRounded />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Exercise Dashboard
          </Typography>
          <Button variant='contained' sx={{ marginBottom: 2, marginTop: 2 }}>
            Button
          </Button>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default ExerciseDashboard;
