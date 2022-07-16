import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import jwt_decode from 'jwt-decode';
import { TokenData } from '../models/auth.model';

export const setupConfig = (method: string, url: string, data: any): AxiosRequestConfig => {
  return {
    method,
    url: process.env.REACT_APP_API_URL + url,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Origin': '*',
    },
    data,
  }
};

export const setTokenStorage = (result: TokenData): void => {
  localStorage.setItem('AccessToken', result.AuthenticationResult.AccessToken);
  localStorage.setItem('RefreshToken', result.AuthenticationResult.RefreshToken);
};

export const checkTokenStorage = (): boolean => {
  const access = localStorage.getItem('AccessToken');
  const refresh = localStorage.getItem('RefreshToken');

  if (!access || !refresh) {
    return false;
  }

  return true;
}

export const clearTokenStorage = (): void => {
  localStorage.removeItem('AccessToken');
  localStorage.removeItem('RefreshToken');
};

// NEEDED?
export const register = async (data: any) => {
  const config = setupConfig('POST', '/account/register', data);
  return axios.request(config);


  // setTokenStorage(data);
  // return data;
};

export const login = async (email: string, password: string): Promise<AxiosResponse> => {
  const config = setupConfig('POST', '/account/admin/login', { email, password });
  return axios.request(config);
};

export const logout = (): void => {
  clearTokenStorage();
  window.location.reload();
};

export const refresh = async (): Promise<void> => {
  const refreshToken = localStorage.getItem('RefreshToken');
  if (!refreshToken) {
    throw new Error('No Refresh Token Found');
  }

  const config = setupConfig('POST', '/account/refresh', { refreshToken });
  axios.request(config)
    .then((response) => response.data)
    .then((data => setTokenStorage(data)))
    .catch((error) => console.error(error.response.data));
};

export const isExpired = (unixTime: number): boolean => {
  const expiration = unixTime * 1000;
  return expiration < Date.now();
};

export const checkExpiration = (): boolean => {
  const accessToken = localStorage.getItem('AccessToken');
  const refreshToken = localStorage.getItem('RefreshToken');
  if (!accessToken || !refreshToken) {
    clearTokenStorage();
    return true;
  }

  const accessTokenDecoded = jwt_decode(accessToken) as any;
  const accessTokenExpiration = parseInt(accessTokenDecoded.exp);
  if (!isExpired(accessTokenExpiration)) {
    return false;
  } 

  const refreshTokenDecoded = jwt_decode(String(refreshToken)) as any;
  const refreshTokenExpiration = parseInt(refreshTokenDecoded.exp);
  if (!isExpired(refreshTokenExpiration)) {
    refresh();
    return false;
  }

  clearTokenStorage();
  return true;
};
