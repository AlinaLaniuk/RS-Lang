import AutorizationModel from '../autorization/autorization.model';
import { API_URL } from '../constants';
import AgregationAPI from '../services/agregation';
import WordsAPI from '../services/words';
import { IWord } from '../types/interfaces';

const isAuthorized = new AutorizationModel().isLogedIn();
const agregationAPI = new AgregationAPI();
const wordsApi = new WordsAPI();
function getAutentificationInfo() {
  const userInfo = JSON.parse((localStorage.getItem('autentificationInfo') as string));
  return userInfo;
}
class TextbookModel {
  async getWordsInfo(group: number, page: number) {
    const userInfo = getAutentificationInfo();
    const wordsInfoForNotAutorizated = await (await fetch(`${API_URL}words?group=${group}&page=${page}`)).json();
    console.log(`${API_URL}words?group=${group}&page=${page}`);
    if (userInfo && isAuthorized) {
      const wordsInfoForAutorizated = await agregationAPI.getAllAgregations({ group: `${group}`, page: `${page}`, wordsPerPage: '20' });
      console.log(wordsInfoForAutorizated);
      return wordsInfoForAutorizated;
    }
    return wordsInfoForNotAutorizated;
  }

  async createOrUpdateLearnedWord(
    wordId: string,
    isWordLearnedOrDifficult: string,
  ) {
    await wordsApi.getUserWord(wordId)
      .then((response : IWord | string) => {
        if (response === '404') {
          let getParams: IWord;
          if (isWordLearnedOrDifficult === 'learned') {
            getParams = {
              difficulty: 'easy',
              optional: {
                isLearned: true,
              },
            };
          } else {
            getParams = {
              difficulty: 'hard',
              optional: {
                isLearned: false,
              },
            };
          }
          wordsApi.createUserWord(wordId, getParams);
        } else {
          const updateParam = {
            difficulty: (response as IWord).difficulty,
            optional: { ...(response as IWord).optional, isLearned: true },
          };
          if (isWordLearnedOrDifficult === 'learned') {
            updateParam.optional.isLearned = true;
          } else {
            updateParam.difficulty = 'hard';
          }
          wordsApi.updateUserWord(wordId, updateParam);
        }
      });
  }

  async setMyWordsInfo() {
    const userInfo = getAutentificationInfo();
    let wordsInfoForMyWordPage;
    if (userInfo && isAuthorized) {
      wordsInfoForMyWordPage = await agregationAPI.getAllAgregations({ wordsPerPage: '20', filter: { 'userWord.difficulty': 'hard' } });
      console.log(wordsInfoForMyWordPage);
    }
    return wordsInfoForMyWordPage;
  }
}

export default TextbookModel;
