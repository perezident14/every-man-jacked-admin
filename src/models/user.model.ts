export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export interface User {
  _id: string
  firstName: string
  lastName: string
  email: string
  password?: string
  role: UserRole
  workouts: string[]
}

export interface NewUser {
  firstName: string
  lastName: string
  email: string
  password?: string
  role: UserRole
  workouts: string[]
}

export const initialUserRender: User = {
  _id: '',
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  role: UserRole.USER,
  workouts: [],
};

export const initialUserData: NewUser = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  role: UserRole.USER,
  workouts: [],
};
