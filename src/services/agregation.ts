import { IAgregation } from '../types/interfaces';
import API from './api';

class AgregationAPI extends API {
  public getAllAgregations = async (params: IAgregation): Promise<Response> => {
    const { userId, token } = JSON.parse(localStorage.getItem('autentificationInfo') as string);
    const result = Object.entries(params).map((el) => ({ key: el[0], value: el[1] }));
    const query = this.generateQuery(result);
    const rawResponse = await fetch(`${this.url}users/${userId}/aggregatedWords${query}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    return rawResponse.json();
  };

  public getOneAgregation = async (wordsId: string): Promise<Response> => {
    const { userId, token } = JSON.parse(localStorage.getItem('autentificationInfo') as string);
    const rawResponse = await fetch(`${this.url}users/${userId}/aggregatedWords/${wordsId}`, {
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
