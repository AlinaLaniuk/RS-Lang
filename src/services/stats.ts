import { IStats } from '../types/interfaces';
import API from './api';

class StatsAPI extends API {
  public getStats = async (): Promise<IStats | number> => {
    const { userId, token } = JSON.parse(localStorage.getItem('autentificationInfo') as string);
    const rawResponse = await fetch(`${this.url}users/${userId}/statistics`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    if (rawResponse.status === 404) {
      return rawResponse.status;
    }
    return rawResponse.json();
  };

  public setStats = async (stats: IStats) => {
    const { userId, token } = JSON.parse(localStorage.getItem('autentificationInfo') as string);
    const rawResponse = await fetch(`${this.url}users/${userId}/statistics`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(stats),
    });
    return rawResponse.json();
  };
}

export default StatsAPI;
