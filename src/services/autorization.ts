import { INewUser, IUser } from '../types/user';
import API from './api';

class AutorizationAPI extends API {
  public login = async (user: IUser): Promise<Response> => {
    const rawResponse = await fetch(`${this.url}signin`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });

    return rawResponse;
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

    let result = 'Ok';
    console.log(rawResponse);
    if (rawResponse.status === 200) {
      this.login({ email: user.email, password: user.password });
    } else if (rawResponse.status === 417) {
      result = 'user with this e-mail exists';
    } else {
      const { message } = (await rawResponse.json()).error.errors[0];
      result = message;
    }

    return result;
  };
}

export default AutorizationAPI;
