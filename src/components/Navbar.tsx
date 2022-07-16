import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, Button, Toolbar, Typography } from '@mui/material';

const Navbar: React.FC = () => {

  const navigate = useNavigate();

  return (
    <AppBar position='static'>
      <Toolbar sx={{ alignSelf: 'center', maxWidth: '1200px', width: '100%' }}>
        <Typography variant='h6' sx={{ cursor: 'pointer', flexGrow: 1, fontWeight: 600 }} onClick={() => navigate('/')}>
          EveryManJacked
        </Typography>
        <Button color='inherit' onClick={() => navigate('/users')}>
          Users
        </Button>
        <Button color='inherit' onClick={() => navigate('/exercises')}>
          Exercises
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
