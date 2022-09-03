import { API_URL } from '../../../constants';
import { IWord as IUserWord } from '../../../types/interfaces';

interface IUserWordsResponse extends Response {
  json(): Promise<IUserWord[]>
}

interface IUserWordResponse extends Response {
  json(): Promise<IUserWord>
}

class UserWords {
  public static getAllUserWords = async (): Promise<IUserWord[]> => {
    const { userId, token } = JSON.parse(localStorage.getItem('autentificationInfo') as string);
    const response: IUserWordsResponse = await fetch(`${API_URL}users/${userId}/words`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    return response.json();
  };

  public static getUserWord = async (wordsId: string): Promise<IUserWord> => {
    const { userId, token } = JSON.parse(localStorage.getItem('autentificationInfo') as string);
    const response: IUserWordResponse = await fetch(`${API_URL}users/${userId}/words/${wordsId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    return response.json();
  };
}

export default UserWords;
