import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, Box, Button, Container, createTheme, CssBaseline, TextField, ThemeProvider, Typography } from '@mui/material';
import { LockOutlined } from '@mui/icons-material';
import { login, setTokenStorage } from '../api/auth.api';
import { useSessionContext } from '../context/session.context';

const LoginForm: React.FC = () => {

  const theme = createTheme();
  const sessionContext = useSessionContext();
  const navigate = useNavigate();

  const [currentError, setCurrentError] = React.useState<string>('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const userEmail = String(formData.get('email'));
    const userPassword = String(formData.get('password'));

    login(userEmail, userPassword)
      .then((response) => response.data)
      .then((data) => {
        setTokenStorage(data);
        sessionContext.setSession(true, data.user);
        navigate('/');
      })
      .catch((error: any) => {
        console.error(error.response.data);
        setCurrentError(error.response.data);
      });
  };

  useEffect(() => {
    if (sessionContext.isLoggedIn) {
      navigate('/');
    };
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Container component='main' maxWidth='md'>
        <CssBaseline />
        <Box sx={{ alignItems: 'center', display: 'flex', flexDirection: 'column', marginTop: 8 }}>
          <Avatar sx={{ margin: 1, backgroundColor: 'secondary' }}>
            <LockOutlined />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Admin Login
          </Typography>

          <Box component='form' onSubmit={handleSubmit} sx={{ marginTop: 1 }}>
            <TextField
              fullWidth
              margin='normal'
              label='Email'
              name='email'
              autoFocus
            />
            <TextField
              fullWidth
              margin='normal'
              label='Password'
              name='password'
              type='password'
            />
            <Button fullWidth type='submit' variant='contained' sx={{ marginBottom: 2, marginTop: 2 }}>
              Log In
            </Button>
          </Box>

          <Typography color='red' variant='h6'>
            {currentError}
          </Typography>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default LoginForm;
