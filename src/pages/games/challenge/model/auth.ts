import { IAuth } from '../../types/types';

class Auth {
  private static auth: IAuth = JSON.parse(localStorage.getItem('autentificationInfo') ?? '');

  static token = this.auth.token;

  static userId = this.auth.userId;
}

export default Auth;
