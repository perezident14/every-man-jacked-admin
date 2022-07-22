import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { isTokenExpired, refresh } from '../../api/auth.api';
import { Exercise, ExerciseCategory } from '../../models/exercise.model';

export const setupConfig = async (method: string, url: string, data?: Exercise): Promise<AxiosRequestConfig> => {
  let accessToken = String(localStorage.getItem('AccessToken'));
  if (isTokenExpired(accessToken)) {
    accessToken = await refresh();
  }

  return {
    method,
    url: process.env.REACT_APP_API_URL + url,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Origin': '*',
      'Authorization': accessToken,
    },
    data,
  }
};

export const updateExercise = async (id: string, exercise: Exercise): Promise<AxiosResponse> => {
  const config = await setupConfig('PUT', `/exercises/${id}`, exercise);
  return axios.request(config);
};

export const createExercise = async (exercise: Exercise): Promise<AxiosResponse> => {
  const config = await setupConfig('POST', '/exercises', exercise);
  return axios.request(config);
};

export const initialExerciseData: Exercise = {
  title: '',
  categories: [] as ExerciseCategory[],
};

export const parseExercise = (data: Exercise): Exercise => {
  return {
    '_id': data._id,
    title: data.title,
    categories: data.categories,
  } as Exercise;
};
