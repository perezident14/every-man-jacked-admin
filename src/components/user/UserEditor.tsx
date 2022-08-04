import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Container, createTheme, CssBaseline, LinearProgress, ThemeProvider } from '@mui/material';
import { useFeedbackContext } from '../../context/feedback.context';
import { useUserContext } from '../../context/user.context';
import { initialUserData, User } from '../../models/user.model';
import UserForm from './UserForm';

const UserEditor: React.FC = () => {

  const { id } = useParams();
  const userContext = useUserContext();
  const feedbackContext = useFeedbackContext();
  const theme = createTheme();

  const navigate = useNavigate();

  const [user, setUser] = useState<User>(initialUserData);
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
        setLoading(false);
      } else {
        feedbackContext.setFeedback({
          message: 'User Not Found', 
          error: true,
          open: true,
        });
        setLoading(false);
        navigate('/users');
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
      { id && !loading &&
        <UserForm id={id} user={user} handleSetUser={handleSetUser} />
      }
    </>
  );
}

export default UserEditor;
