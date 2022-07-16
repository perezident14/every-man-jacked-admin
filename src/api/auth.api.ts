import jwt_decode from 'jwt-decode';
import { TokenData } from '../models/auth.model';

export const setupInit = (method: string, body: any): RequestInit => {
  return {
    method,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify(body),
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

export const register = async (body: any) => {
  const init = setupInit('POST', body);
  const response = await fetch(`${process.env.REACT_APP_API_URL}/account/register`, init);
  const data = await response.json();

  setTokenStorage(data);
  return data;
};

export const login = async (email: string, password: string) => {
  const init = setupInit('POST', { email, password });
  const response = await fetch(`${process.env.REACT_APP_API_URL}/account/login`, init);
  const data = await response.json();

  setTokenStorage(data);
  return data;
};

export const logout = (): void => {
  clearTokenStorage();
};

export const refresh = async (): Promise<void> => {
  const refreshToken = localStorage.getItem('RefreshToken');
  if (!refreshToken) {
    throw new Error('No Refresh Token Found');
  }

  const init = setupInit('POST', { refreshToken });
  const response = await fetch(`${process.env.REACT_APP_API_URL}/account/refresh`, init);
  const data = await response.json();

  setTokenStorage(data);
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
