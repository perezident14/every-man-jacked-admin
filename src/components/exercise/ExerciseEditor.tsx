import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Container, createTheme, CssBaseline, LinearProgress, ThemeProvider } from '@mui/material';
import { useExerciseContext } from '../../context/exercise.context';
import { useFeedbackContext } from '../../context/feedback.context';
import { Exercise, initialExerciseRender } from '../../models/exercise.model';
import ExerciseForm from './ExerciseForm';

const ExerciseEditor: React.FC = () => {

  const { id } = useParams();
  const exerciseContext = useExerciseContext();
  const feedbackContext = useFeedbackContext();
  const theme = createTheme();

  const navigate = useNavigate();

  const [exercise, setExercise] = useState<Exercise>(initialExerciseRender);
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
        setLoading(false);
      } else {
        feedbackContext.setFeedback({
          message: 'Exercise Not Found', 
          error: true,
          open: true,
        });
        setLoading(false);
        navigate('/exercises');
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
      { id && !loading &&
        <ExerciseForm id={id} exercise={exercise} handleSetExercise={handleSetExercise} />
      }
    </>
  );
}

export default ExerciseEditor;
