export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export interface User {
  firstName: string
  lastName: string
  email: string
  role: UserRole
  workouts: string[]
}
