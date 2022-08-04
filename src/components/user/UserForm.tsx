import { useNavigate } from 'react-router-dom';
import { KeyboardBackspace, PeopleRounded } from '@mui/icons-material';
import { Avatar, Box, Button, Container, createTheme, CssBaseline, FormControl, Grid, MenuItem, TextField, ThemeProvider, Typography } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useFeedbackContext } from '../../context/feedback.context';
import { UserRole, User } from '../../models/user.model';
import { parseUser, updateUser } from './user.service';

interface UserFormProps {
  id: string
  user: User
  handleSetUser: (updatedUser: User) => void
}

const UserForm = ({ id, user, handleSetUser }: UserFormProps) => {

  const theme = createTheme();
  const feedbackContext = useFeedbackContext();
  const navigate = useNavigate();

  const handleUpdateUser = (updatedUser: User) => {
    updateUser(id, updatedUser)
      .then((response) => response.data)
      .then((data) => {
        const userData = parseUser(data);
        handleSetUser(userData);
        feedbackContext.setFeedback({
          message: 'User Updated!',
          open: true,
          type: 0
        });
      })
      .catch((error) => {
        feedbackContext.setFeedback({
          message: error, 
          error: true,
          open: true,
        });
      });
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required(),
    lastName: Yup.string().required(),
    email: Yup.string().email('Invalid email').required(),
    role: Yup.string().oneOf(Object.values(UserRole)).required(),
  });

  const formik = useFormik({
    initialValues: user,
    validationSchema,
    onSubmit: (values: User) => handleUpdateUser(values),
  });

  return (
    <ThemeProvider theme={theme}>
      <Container component='main' maxWidth='md'>
        <CssBaseline />
        <Button onClick={() => navigate('/users')} sx={{ display: 'flex', position: 'absolute', marginTop: -4 }}>
          <KeyboardBackspace />
          &nbsp;
          Back to Users
        </Button>
        <Box sx={{ alignItems: 'center', display: 'flex', flexDirection: 'column', marginTop: 8 }}>
          <Avatar sx={{ margin: 1, backgroundColor: 'secondary' }}>
            <PeopleRounded />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Edit User
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

export default UserForm;
