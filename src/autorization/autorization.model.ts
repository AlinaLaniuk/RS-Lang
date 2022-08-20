import AutorizationAPI from '../services/autorization';
import { IAutentificationInfo, INewUser, IUser } from '../types/user';
import AutorizationController from './autorization.controller';
import AutorizationView from './autorization.view';

class AutorizationModel {
  public drawModal = () => {
    new AutorizationView().modal();
  };

  public closeModal = () => {
    const modal = document.getElementById('box') as HTMLDivElement;
    modal.remove();
  };

  public showLoginError = (statusCode: number) => {
    const wrapper = document.getElementById(
      'login-error'
    ) as HTMLTableCellElement;
    if (document.querySelector('.error-message') as HTMLDivElement) {
      wrapper.lastChild?.remove();
    }
    const error = document.createElement('div');
    error.classList.toggle('error-message');
    error.style.color = '#DD6F6F';
    error.innerHTML = `${
      statusCode === 404 ? 'Email not found' : 'Wrong password or email'
    }`;
    wrapper.appendChild(error);
  };

  public showRegistrationError = (apiAnswer: string) => {
    const wrapper = document.getElementById(
      'register-error'
    ) as HTMLTableCellElement;
    if (document.querySelector('.reg-error') as HTMLDivElement) {
      wrapper.lastChild?.remove();
    }
    let message = '';
    switch (apiAnswer) {
      case '"email" must be a valid email':
        message = 'Email must be a valid';
        break;
      case '"password" length must be at least 8 characters long':
        message = 'Password length must be at least 8 characters long';
        break;
      default:
        message = 'Name, Email and Password must not be empty';
        break;
    }
    const error = document.createElement('div');
    error.classList.toggle('reg-error');
    error.style.color = '#DD6F6F';
    error.innerHTML = `${message}`;
    wrapper.appendChild(error);
  };

  public saveInfo = (info: IAutentificationInfo) => {
    const infoWithExpiredTime = {
      ...info,
      tokenExpired: this.expiredTime(),
    };
    localStorage.setItem(
      'autentificationInfo',
      JSON.stringify(infoWithExpiredTime)
    );
    this.isLogedIn();
  };

  public isLogedIn = () => {
    const info = JSON.parse(
      localStorage.getItem('autentificationInfo') || '{}'
    );
    const authenticated =
      info &&
      info.message === 'Authenticated' &&
      new Date(info.tokenExpired) > new Date();
    new AutorizationView().loginButton(authenticated);
    authenticated
      ? new AutorizationController().listenLogoutButton()
      : new AutorizationController().listenLoginButton();
  };

  public logout = () => {
    localStorage.removeItem('autentificationInfo');
    new AutorizationView().loginButton(false);
    new AutorizationController().listenLoginButton();
  };

  public login = (user: IUser) => {
    new AutorizationAPI().login({
      email: user.email,
      password: user.password,
    });
  };

  public register = (user: INewUser) => {
    new AutorizationAPI().registration({
      name: user.name,
      email: user.email,
      password: user.password,
    });
  };

  private expiredTime = () => {
    const currentDate = new Date();
    currentDate.setTime(currentDate.getTime() + 4 * 60 * 60 * 1000);
    return currentDate;
  };
}

export default AutorizationModel;
