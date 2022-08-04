import axios, { AxiosResponse } from 'axios';
import { User } from '../../models/user.model';
import { setupConfig } from '../../utils/helpers';

export const updateUser = async (id: string, user: User): Promise<AxiosResponse> => {
  const config = await setupConfig('PUT', `/users/${id}`, user);
  return axios.request(config);
};

export const createUser = async (user: User): Promise<AxiosResponse> => {
  const config = await setupConfig('POST', '/users', user);
  return axios.request(config);
};

export const parseUser = (data: User): User => {
  return {
    _id: data._id,
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    role: data.role,
    workouts: data.workouts,
  };
};
