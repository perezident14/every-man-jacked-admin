export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export interface User {
  firstName: string
  lastName: string
  email: string
  password: string
  role: UserRole
  workouts: string[]
}
