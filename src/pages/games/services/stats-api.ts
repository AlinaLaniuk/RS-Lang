import { API_URL } from '../../../constants';
import { IStats } from '../../../types/interfaces';
import { initStats } from '../utils/constants';

interface IStatsResponse extends Response {
  json(): Promise<IStats>
}

class StatsAPI {
  public static getStats = async (): Promise<IStats> => {
    const { userId, token } = JSON.parse(localStorage.getItem('autentificationInfo') as string);
    const response: IStatsResponse = await fetch(`${API_URL}users/${userId}/statistics`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    return response.status === 404 ? initStats : response.json();
  };

  public static setStats = async (stats: IStats) => {
    const { userId, token } = JSON.parse(localStorage.getItem('autentificationInfo') as string);
    const rawResponse = await fetch(`${API_URL}users/${userId}/statistics`, {
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
