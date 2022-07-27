import React from 'react';
import { useNavigate } from 'react-router-dom';
import { KeyboardBackspace, PeopleRounded } from '@mui/icons-material';
import { Avatar, Box, Button, Container, createTheme, CssBaseline, FormControl, Grid, MenuItem, TextField, ThemeProvider, Typography } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useFeedbackContext } from '../../context/feedback.context';
import { User, UserRole } from '../../models/user.model';
import { createUser, parseUser, initialUserData } from './user.service';
import { useUserContext } from '../../context/user.context';

const UserFormCreate: React.FC = () => {

  const theme = createTheme();
  const userContext = useUserContext();
  const feedbackContext = useFeedbackContext();

  const navigate = useNavigate();

  const handleSetUser = (newUser: User) => {
    const updatedUsers = [...userContext.users];
    updatedUsers.push(newUser);
    userContext.setUsers(updatedUsers);
  };

  const handleCreateUser = (user: User) => {
    createUser(user)
      .then((response) => response.data)
      .then((data) => {
        const userData = parseUser(data);
        handleSetUser(userData);
        feedbackContext.setFeedback({
          message: 'User Created!',
          open: true,
          type: 0
        });
        navigate(`/users/${userData._id}`);
      })
      .catch((error) => {
        if (typeof error === 'object') {
          feedbackContext.setFeedback({
            message: error.response.data ?? error.message, 
            error: true,
            open: true,
          });
        } else {
          feedbackContext.setFeedback({
            message: error, 
            error: true,
            open: true,
          });
        }
      });
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required(),
    lastName: Yup.string().required(),
    email: Yup.string().email('Invalid email').required(),
    password: Yup.string().required(),
    role: Yup.string().oneOf(Object.values(UserRole)).required(),
  });

  const formik = useFormik({
    initialValues: initialUserData,
    validationSchema,
    onSubmit: (values: User) => {
      handleCreateUser(values);
    }
  });

  return (
    <ThemeProvider theme={theme}>
      <Container component='main' maxWidth='md'>
        <CssBaseline />
        <Box onClick={() => navigate('/users')} sx={{ cursor: 'pointer', display: 'flex', position: 'absolute', marginTop: -4 }}>
          <KeyboardBackspace sx={{ marginRight: 0.5 }} /> Back to Users
        </Box>
        <Box sx={{ alignItems: 'center', display: 'flex', flexDirection: 'column', marginTop: 8 }}>
          <Avatar sx={{ margin: 1, backgroundColor: 'secondary' }}>
            <PeopleRounded />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Create User
          </Typography>

          <FormControl fullWidth>
            <Box component='form' onSubmit={formik.handleSubmit} sx={{ marginTop: 3 }}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                    error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                    helperText={formik.touched.firstName && formik.errors.firstName}
                    name='firstName'
                    label='First Name'
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                    error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                    helperText={formik.touched.lastName && formik.errors.lastName}
                    name='lastName'
                    label='Last Name'
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                    name='email'
                    label='Email'
                    type='email'
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                    name='password'
                    label='Password'
                    type='password'
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    select
                    fullWidth
                    value={formik.values.role}
                    onChange={formik.handleChange}
                    error={formik.touched.role && Boolean(formik.errors.role)}
                    helperText={formik.touched.role && formik.errors.role}
                    name='role'
                    label='Role'
                  >
                    <MenuItem key={UserRole.USER} value={UserRole.USER}>User</MenuItem>
                    <MenuItem key={UserRole.ADMIN} value={UserRole.ADMIN}>Admin</MenuItem>
                  </TextField>
                </Grid>
              </Grid>

              <Button variant='contained' type='submit' sx={{ marginBottom: 2, marginTop: 2 }}>
                Save
              </Button>
            </Box>
          </FormControl>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default UserFormCreate;
