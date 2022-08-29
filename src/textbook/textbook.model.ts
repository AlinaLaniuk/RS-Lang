import AutorizationModel from '../autorization/autorization.model';
import constants from '../constants';

const isAuthorized = new AutorizationModel().isLogedIn();
class TextbookModel {
  async getWordsInfo(group: number, page: number) {
    const userInfo = JSON.parse((localStorage.getItem('autentificationInfo') as string));
    const { userId } = userInfo;
    const wordsInfoForNotAutorizated = await (await fetch(`${constants.API_URL}words?group=${group}&page=${page}`)).json();
    console.log(`${constants.API_URL}words?group=${group}&page=${page}`);
    if (userInfo && isAuthorized) {
      const wordsInfoForAutorizated = await (await fetch(`${constants.API_URL}users/${userId}/aggregatedWords`)).json();
      console.log(`${constants.API_URL}users/${userId}/aggregatedWords`);
      return wordsInfoForAutorizated;
    }
    return wordsInfoForNotAutorizated;
  }
}

export default TextbookModel;
