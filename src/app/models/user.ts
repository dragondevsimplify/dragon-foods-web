export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
}

export type UserSignin = Pick<User, 'username' | 'password'>
