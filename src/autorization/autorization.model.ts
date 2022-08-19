import AutorizationAPI from '../services/autorization';
import { IAutentificationInfo, IUser } from '../types/user';
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

  public showValidationError = (statusCode: number) => {
    const wrapper = document.querySelector('.form-wrapper') as HTMLDivElement;
    const error = document.createElement('div');
    if ((document.querySelector('.error-message') as HTMLDivElement) !== null) {
      wrapper.lastChild?.remove();
    }
    let message = '';
    switch (statusCode) {
      case 404:
        message = 'Email not found';
        break;
      default:
        message = 'Wrong password or email';
        break;
    }
    error.classList.toggle('error-message');
    error.style.color = 'red';
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
  };

  public login = (user: IUser) => {
    new AutorizationAPI().login({
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
