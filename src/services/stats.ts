import API from './api';

class StatsAPI extends API {
  public getStats = async () => {
    const { userId, token } = JSON.parse(localStorage.getItem('autentificationInfo') as string);
    const rawResponse = await fetch(`${this.url}users/${userId}/statistics`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    return rawResponse.json();
  };
}

export default StatsAPI;
