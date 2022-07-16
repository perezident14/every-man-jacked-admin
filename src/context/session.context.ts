import { createContext, useContext } from 'react';
import jwt_decode from 'jwt-decode';
import { UserRole } from '../models/user.model';
import { clearTokenStorage, isExpired, refresh } from '../api/auth.api';

export interface SessionUser {
  '_id': string
  firstName: string
  lastName: string
  email: string
  role: UserRole
  workouts: string[]
}

export interface SessionContextUser {
  isLoggedIn: boolean
  user: SessionUser
}

export const initialSessionContext: SessionContextUser = {
  isLoggedIn: false,
  user: {
    '_id': '',
    firstName: '',
    lastName: '',
    email: '',
    role: UserRole.USER,
    workouts: [] as string[],
  } as SessionUser,
};

export const setUserState = (isLoggedIn: boolean, data: SessionUser): SessionContextUser => {
  return {
    isLoggedIn,
    user: {
      '_id': data._id,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      role: data.role,
      workouts: data.workouts,
    } as SessionUser,
  };
};

export const sessionContextSetup = (): SessionContextUser => {
  const accessToken = localStorage.getItem('AccessToken');
  const refreshToken = localStorage.getItem('RefreshToken');
  if (!accessToken || !refreshToken) {
    clearTokenStorage();
    return initialSessionContext;
  }

  const accessTokenDecoded = jwt_decode(accessToken) as any;
  const accessTokenExpiration = parseInt(accessTokenDecoded.exp);
  if (!isExpired(accessTokenExpiration)) {
    return setUserState(true, accessTokenDecoded);
  } 

  const refreshTokenDecoded = jwt_decode(String(refreshToken)) as any;
  const refreshTokenExpiration = parseInt(refreshTokenDecoded.exp);
  if (!isExpired(refreshTokenExpiration)) {
    refresh();
    return setUserState(true, refreshTokenDecoded);
  }

  clearTokenStorage();
  return initialSessionContext;
};

export const SessionContext = createContext({ ...sessionContextSetup(), setUser: (isLoggedIn: boolean, user: SessionUser) => {} });

export const useSessionContext = () => useContext(SessionContext);
