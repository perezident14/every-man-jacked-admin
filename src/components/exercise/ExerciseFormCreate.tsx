import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FitnessCenterRounded } from '@mui/icons-material';
import { Avatar, Box, Button, Container, createTheme, CssBaseline, FormControl, Grid, MenuItem, TextField, ThemeProvider, Typography } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useFeedbackContext } from '../../context/feedback.context';
import { Exercise, ExerciseCategory, initialExerciseData, NewExercise } from '../../models/exercise.model';
import { createExercise, parseExercise } from './exercise.service';
import { useExerciseContext } from '../../context/exercise.context';

const ExerciseFormCreate: React.FC = () => {

  const theme = createTheme();
  const exerciseContext = useExerciseContext();
  const feedbackContext = useFeedbackContext();
  const navigate = useNavigate();

  const handleSetExercise = (newExercise: Exercise) => {
    const updatedExercises = [...exerciseContext.exercises];
    updatedExercises.push(newExercise);
    exerciseContext.setExercises(updatedExercises);
  };

  const handleCreateExercise = (exercise: NewExercise) => {
    createExercise(exercise)
      .then((response) => response.data)
      .then((data) => {
        const exerciseData = parseExercise(data);
        handleSetExercise(exerciseData);
        feedbackContext.setFeedback({
          message: 'Exercise Created!',
          open: true,
          type: 0
        });
        navigate(`/exercises/${exerciseData._id}`);
      })
      .catch((error: any) => {
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
    title: Yup.string().required(),
    categories: Yup.array(
      Yup.mixed<ExerciseCategory>().oneOf(
        Object.values(ExerciseCategory)
      ).required()
    ).min(1).required(),
  });

  const formik = useFormik({
    initialValues: initialExerciseData,
    validationSchema,
    onSubmit: (values: NewExercise) => handleCreateExercise(values),
  });

  return (
    <ThemeProvider theme={theme}>
      <Container component='main' maxWidth='md'>
        <CssBaseline />
        <Box sx={{ alignItems: 'center', display: 'flex', flexDirection: 'column', marginTop: 8 }}>
          <Avatar sx={{ margin: 1, backgroundColor: 'secondary' }}>
            <FitnessCenterRounded />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Create Exercise
          </Typography>

          <FormControl fullWidth>
            <Box component='form' onSubmit={formik.handleSubmit} sx={{ marginTop: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    value={formik.values.title}
                    onChange={formik.handleChange}
                    error={formik.touched.title && Boolean(formik.errors.title)}
                    helperText={formik.touched.title && formik.errors.title}
                    name='title'
                    label='Title'
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    select
                    fullWidth
                    value={formik.values.categories}
                    onChange={formik.handleChange}
                    SelectProps={{
                      multiple: true,
                      value: formik.values.categories,
                    }}
                    error={formik.touched.categories && Boolean(formik.errors.categories)}
                    helperText={formik.touched.categories && formik.errors.categories}
                    name='categories'
                    label='Categories'
                  >
                    <MenuItem key={ExerciseCategory.CHEST} value={ExerciseCategory.CHEST}>Chest</MenuItem>
                    <MenuItem key={ExerciseCategory.BACK} value={ExerciseCategory.BACK}>Back</MenuItem>
                    <MenuItem key={ExerciseCategory.ARMS} value={ExerciseCategory.ARMS}>Arms</MenuItem>
                    <MenuItem key={ExerciseCategory.SHOULDERS} value={ExerciseCategory.SHOULDERS}>Shoulders</MenuItem>
                    <MenuItem key={ExerciseCategory.LEGS} value={ExerciseCategory.LEGS}>Legs</MenuItem>
                    <MenuItem key={ExerciseCategory.PUSH} value={ExerciseCategory.PUSH}>Push</MenuItem>
                    <MenuItem key={ExerciseCategory.PULL} value={ExerciseCategory.PULL}>Pull</MenuItem>
                    <MenuItem key={ExerciseCategory.UPPER} value={ExerciseCategory.UPPER}>Upper</MenuItem>
                    <MenuItem key={ExerciseCategory.LOWER} value={ExerciseCategory.LOWER}>Lower</MenuItem>
                    <MenuItem key={ExerciseCategory.HIIT} value={ExerciseCategory.HIIT}>HIIT</MenuItem>
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

export default ExerciseFormCreate;
