import { INewUser, IUser } from '../types/user';
import AutorizationModel from '../autorization/autorization.model';
import API from './api';

class AutorizationAPI extends API {
  public login = async (user: IUser) => {
    const rawResponse = await fetch(`${this.url}signin`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    if (rawResponse.status === 200) {
      new AutorizationModel().closeModal();
      new AutorizationModel().saveInfo(await rawResponse.json());
    } else {
      new AutorizationModel().showLoginError(rawResponse.status);
    }
  };

  public registration = async (user: INewUser) => {
    const rawResponse = await fetch(`${this.url}users`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });

    if (rawResponse.status === 200) {
      this.login({ email: user.email, password: user.password });
    } else {
      const message = (await rawResponse.json()).error.errors[0].message;
      new AutorizationModel().showRegistrationError(message);
    }
  };
}

export default AutorizationAPI;
