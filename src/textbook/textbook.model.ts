import constants from '../constants';

class TextbookModel {
  async getWordsInfo() {
    const wordsInfo = await (await fetch(`${constants.API_URL}words`)).json();
    return wordsInfo;
  }
}

export default TextbookModel;
