import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Container, createTheme, CssBaseline, LinearProgress, ThemeProvider, Typography } from '@mui/material';
import { useExerciseContext } from '../../context/exercise.context';
import { Exercise } from '../../models/exercise.model';
import { initialExerciseData } from './exercise.service';
import ExerciseForm from './ExerciseForm';

const ExerciseEditor: React.FC = () => {

  const { id } = useParams();
  const exerciseContext = useExerciseContext();
  const theme = createTheme();

  const [exercise, setExercise] = useState<Exercise>(initialExerciseData);
  const [currentError, setCurrentError] = useState<String>('');
  const [loading, setLoading] = useState<Boolean>(true);

  const handleSetExercise = (updatedExercise: Exercise) => {
    const index = exerciseContext.exercises.findIndex((exercise) => exercise._id === id);
    const updatedExercises = [...exerciseContext.exercises];
    updatedExercises[index] = updatedExercise;
    exerciseContext.setExercises(updatedExercises);
    setExercise(updatedExercise);
  };

  useEffect(() => {
    if (id && exerciseContext.exercises.length) {
      const exerciseData = exerciseContext.exercises.find((exercise) => exercise._id === id);
      if (exerciseData) {
        setExercise(exerciseData);
        setCurrentError('');
        setLoading(false);
      } else {
        setCurrentError('Exercise Not Found');
        setLoading(false);
      }
    }
  }, [exerciseContext]);

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
        <ExerciseForm id={id} exercise={exercise} handleSetExercise={handleSetExercise} />
      }
    </>
  );
}

export default ExerciseEditor;
