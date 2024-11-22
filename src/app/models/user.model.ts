export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
}

export interface UserSignin {
  username: string;
  password: string;
}

export interface UserSignup {
  username: string;
  email: string;
  password: string;
}
