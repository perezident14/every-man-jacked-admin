import jwt_decode from 'jwt-decode';
import { TokenData } from '../models/auth.model';

export const init = (method: string, body: any) => {
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
  localStorage.setItem('Expires', String(Date.now() + (1000 * 60 * 60))); // Now + 1 hour 
};

export const clearTokenStorage = (): void => {
  localStorage.removeItem('AccessToken');
  localStorage.removeItem('RefreshToken');
  localStorage.removeItem('Expires');
};

export const login = async (email: string, password: string) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/account/login`, init('POST', { email, password }));
  return response.json();
};

export const logout = (): void => {
  clearTokenStorage();
};

export const register = async (body: any) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/account/register`, init('POST', body));
  return response.json();
};

export const isExpired = () => {
  const unixTime = parseInt(String(localStorage.getItem('Expires')));
  if (!isNaN(unixTime)) {
    return (unixTime < Date.now());
  }
  return true;
};

export const decodeToken = (token: 'AccessToken'): any => {
  try {
    return jwt_decode(String(localStorage.getItem(token)));
  } catch (error) {
    return undefined;
  }
};

export const isLoggedIn = (): boolean => {
  return localStorage.getItem('AccessToken') !== undefined;
};
