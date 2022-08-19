import { IUser } from '../types/user';
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
      new AutorizationModel().showValidationError(rawResponse.status);
    }
  };

  // public registration = async (user: IUser) => {
  //   const rawResponse = await fetch(`${API_URL}users`, {
  //     method: 'POST',
  //     headers: {
  //       Accept: 'application/json',
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(user),
  //   });
  //   const content = await rawResponse.json();

  //   console.log(content);
  // };

  public logout = async (user: IUser) => {
    const rawResponse = await fetch(`${this.url}users`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    const content = await rawResponse.json();

    console.log(content);
  };
}

export default AutorizationAPI;
