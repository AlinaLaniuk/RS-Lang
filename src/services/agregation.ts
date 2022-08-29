import { IAgregation } from '../types/interfaces';
import API from './api';

class AgregationAPI extends API {
  public getAllAgregations = async (): Promise<Response> => {
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

  public getOneAgregation = async (wordsId: string, params: IAgregation): Promise<Response> => {
    const result = Object.entries(params).map((el) => ({ key: el[0], value: el[1] }));
    const query = this.generateQuery(result);
    const { userId, token } = JSON.parse(localStorage.getItem('autentificationInfo') as string);
    const rawResponse = await fetch(`${this.url}users/${userId}/aggregatedWords/${wordsId}${query}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    return rawResponse.json();
  };

  private generateQuery = (
    queryParams: Array<{ key: string; value: string | number }>,
  ): string => (queryParams.length
    ? `?${queryParams.map((el) => `${el.key}=${el.value}`).join('&')}`
    : '');
}

export default AgregationAPI;
