import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Container, createTheme, CssBaseline, LinearProgress, ThemeProvider, Typography } from '@mui/material';
import { useUserContext } from '../../context/user.context';
import { User } from '../../models/user.model';
import { initialUserData } from './user.service';
import UserForm from './UserForm';

const UserEditor: React.FC = () => {

  const { id } = useParams();
  const userContext = useUserContext();
  const theme = createTheme();

  const [user, setUser] = useState<User>(initialUserData);
  const [currentError, setCurrentError] = useState<String>('');
  const [loading, setLoading] = useState<Boolean>(true);

  const handleSetUser = (updatedUser: User) => {
    const index = userContext.users.findIndex((user) => user._id === id);
    const updatedUsers = [...userContext.users];
    updatedUsers[index] = updatedUser;
    userContext.setUsers(updatedUsers);
    setUser(updatedUser);
  };

  useEffect(() => {
    if (id && userContext.users.length) {
      const userData = userContext.users.find((user) => user._id === id);
      if (userData) {
        setUser(userData);
        setCurrentError('');
        setLoading(false);
      } else {
        setCurrentError('User Not Found');
        setLoading(false);
      }
    }
  }, [userContext]);

  return (
    <>
      { loading &&
        <ThemeProvider theme={theme}>
          <Container component='main' maxWidth='md'>
            <CssBaseline />
            <Box sx={{ marginTop: 8 }}>
              <LinearProgress />
            </Box>
          </Container>
        </ThemeProvider>
      }
      { currentError &&
        <ThemeProvider theme={theme}>
          <Container component='main' maxWidth='md'>
            <CssBaseline />
            <Box sx={{ alignItems: 'center', display: 'flex', flexDirection: 'column', marginTop: 8 }}>
              <Typography color='red' variant='h6'>
                {currentError}
              </Typography>
            </Box>
          </Container>
        </ThemeProvider>
      }
      { id && !loading && !currentError &&
        <UserForm id={id} user={user} handleSetUser={handleSetUser} />
      }
    </>
  );
}

export default UserEditor;
