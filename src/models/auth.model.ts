export interface TokenData {
  AuthenticationResult: any
}

export interface LoginData {
  email: string
  password: string
}

export const initialLoginData = {
  email: '',
  password: '',
}
