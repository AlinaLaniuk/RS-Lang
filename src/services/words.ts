import { IWord } from '../types/interfaces';
import API from './api';

class WordsAPI extends API {
  public getAllUserWords = async (): Promise<Response> => {
    const { userId, token } = JSON.parse(localStorage.getItem('autentificationInfo') as string);
    const rawResponse = await fetch(`${this.url}users/${userId}/words`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    return rawResponse.json();
  };

  public createUserWord = async (wordsId: string, params: IWord): Promise<Response> => {
    const { userId, token } = JSON.parse(localStorage.getItem('autentificationInfo') as string);
    const rawResponse = await fetch(`${this.url}users/${userId}/words/${wordsId}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });
    return rawResponse.json();
  };

  public getUserWord = async (wordsId: string): Promise<Response> => {
    const { userId, token } = JSON.parse(localStorage.getItem('autentificationInfo') as string);
    const rawResponse = await fetch(`${this.url}users/${userId}/words/${wordsId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    return rawResponse.json();
  };

  public updateUserWord = async (wordsId: string, params: IWord): Promise<Response> => {
    const { userId, token } = JSON.parse(localStorage.getItem('autentificationInfo') as string);
    const rawResponse = await fetch(`${this.url}users/${userId}/words/${wordsId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });
    return rawResponse.json();
  };

  public deleteUserWord = async (wordsId: string) => {
    const { userId, token } = JSON.parse(localStorage.getItem('autentificationInfo') as string);
    await fetch(`${this.url}users/${userId}/words/${wordsId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
  };
}

export default WordsAPI;
