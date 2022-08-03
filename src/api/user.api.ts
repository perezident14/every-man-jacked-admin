import axios, { AxiosResponse } from 'axios';
import { setupConfig } from '../utils/helpers';

export const fetchUsers = async (): Promise<AxiosResponse> => {
  const config = await setupConfig('GET', '/users');
  return axios.request(config);
};
