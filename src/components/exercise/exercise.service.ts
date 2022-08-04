import axios, { AxiosResponse } from 'axios';
import { Exercise } from '../../models/exercise.model';
import { setupConfig } from '../../utils/helpers';

export const updateExercise = async (id: string, exercise: Exercise): Promise<AxiosResponse> => {
  const config = await setupConfig('PUT', `/exercises/${id}`, exercise);
  return axios.request(config);
};

export const createExercise = async (exercise: Exercise): Promise<AxiosResponse> => {
  const config = await setupConfig('POST', '/exercises', exercise);
  return axios.request(config);
};

export const parseExercise = (data: Exercise): Exercise => {
  return {
    _id: data._id,
    title: data.title,
    categories: data.categories,
  };
};
