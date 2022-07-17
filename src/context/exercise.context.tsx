import { createContext, useContext, useEffect, useState } from 'react';
import { fetchExercises } from '../api/exercise.api';
import { Exercise } from '../models/exercise.model';
import { useSessionContext } from './session.context';

export const ExerciseContext = createContext({ } as { exercises: Exercise[], setExercises: (exercises: Exercise[]) => void });

export const useExerciseContext = () => useContext(ExerciseContext);

export function ExerciseProvider({ children }: { children: any }) {

  const sessionContext = useSessionContext();

  const [exerciseState, setExerciseState] = useState<Exercise[]>([]);

  const setExercises = (exercises: Exercise[]): void => {
    setExerciseState(exercises);
  };

  const setupExercises = async () => {
    fetchExercises()
      .then((response) => response.data)
      .then((data) => setExercises(data))
      .catch((error: any) => console.error(error.response.data));
  };

  useEffect(() => {
    if (sessionContext.isLoggedIn) {
      setupExercises();
    } else {
      setExercises([]);
    }
  }, [sessionContext.isLoggedIn]);

  return (
    <ExerciseContext.Provider value={{ exercises: exerciseState, setExercises }}>
      {children}
    </ExerciseContext.Provider>
  );
};
