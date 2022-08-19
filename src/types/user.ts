export interface IUser {
  email: string;
  password: string;
}

export interface IAutentificationInfo {
  message: string;
  name: string;
  refreshToken: string;
  token: string;
  userId: string;
  tokenExpired: Date;
}
