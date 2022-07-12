import React from 'react';
import { AppBar, Button, Toolbar, Typography } from '@mui/material';

const Navbar: React.FC = () =>  {
  return (
    <AppBar position='static'>
      <Toolbar sx={{ alignSelf: 'center', maxWidth: '1200px', width: '100%' }}>
        <Typography variant='h6' sx={{ flexGrow: 1, fontWeight: 600 }}>
          EveryManJacked
        </Typography>
        <Button color='inherit'>
          Users
        </Button>
        <Button color='inherit'>
          Exercises
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
