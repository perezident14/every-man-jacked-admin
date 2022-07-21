import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { isTokenExpired, refresh } from '../../api/auth.api';
import { User, UserRole } from '../../models/user.model';

export const setupConfig = async (method: string, url: string, data?: User): Promise<AxiosRequestConfig> => {
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

export const updateUser = async (id: string, user: User): Promise<AxiosResponse> => {
  const config = await setupConfig('PUT', `/users/${id}`, user);
  return axios.request(config);
};

export const initialUserData: User = {
  firstName: '',
  lastName: '',
  email: '',
  role: UserRole.USER,
  workouts: [] as string[],
};

// Still needed?
export const parseUser = (data: User): User => {
  return {
    '_id': data._id,
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    role: data.role,
    workouts: data.workouts,
  } as User;
};
