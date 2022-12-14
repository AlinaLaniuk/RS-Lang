import AutorizationAPI from '../services/autorization';
import { IAutentificationInfo, INewUser, IUser } from '../types/user';
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
    const wrapper = document.getElementById('login-error') as HTMLElement;
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
    const wrapper = document.getElementById('register-error') as HTMLElement;
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
      case 'user with this e-mail exists':
        message = 'User with this e-mail exists';
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
    const fullInfo = {
      ...info,
      tokenExpired: this.expiredTime(),
    };
    localStorage.setItem('autentificationInfo', JSON.stringify(fullInfo));
    this.isLogedIn();
  };

  public isLogedIn = ():boolean => {
    const info = JSON.parse(localStorage.getItem('autentificationInfo') || '{}');
    const tokenExpired = new Date(info.tokenExpired) > new Date();
    const authenticated = info && info.message === 'Authenticated' && tokenExpired;
    new AutorizationView().loginButton(authenticated);
    return authenticated;
  };

  public logout = () => {
    localStorage.removeItem('autentificationInfo');
    new AutorizationView().loginButton(false);
    window.location.reload();
  };

  public login = async (user: IUser):Promise<boolean> => {
    const response = new AutorizationAPI().login({
      email: user.email,
      password: user.password,
    });
    if ((await response).status === 200) {
      this.closeModal();
      this.saveInfo(await (await response).json());
      window.location.reload();
      return true;
    }
    this.showLoginError((await response).status);
    return false;
  };

  public register = async (user: INewUser):Promise<boolean> => {
    const message = new AutorizationAPI().registration({
      name: user.name,
      email: user.email,
      password: user.password,
    });
    const status = await message;
    if (status !== 'Ok') {
      this.showRegistrationError(status);
      return false;
    }
    return true;
  };

  // TODO: ?????????? ?????????????? ?? utils
  private expiredTime = () => {
    const currentDate = new Date();
    currentDate.setTime(currentDate.getTime() + 4 * 60 * 60 * 1000);
    return currentDate;
  };
}

export default AutorizationModel;
