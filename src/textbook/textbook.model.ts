import constants from '../constants';

class TextbookModel {
  async getWordsInfo(group: number, page: number) {
    const wordsInfo = await (await fetch(`${constants.API_URL}words?group=${group}&page=${page}`)).json();
    console.log(`${constants.API_URL}words?group=${group}&page=${page}`);
    return wordsInfo;
  }
}

export default TextbookModel;
