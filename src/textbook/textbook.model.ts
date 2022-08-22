import constants from '../constants';

async function getWordsInfo() {
  const wordsInfo = await (await fetch(`${constants.API_URL}words`)).json();
  return wordsInfo;
}

export default getWordsInfo;
