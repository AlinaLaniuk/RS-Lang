import { API_URL } from '../../../constants';
import { IWordsResponse, Word } from '../types/types';
import { pagesCount } from '../utils/constants';
import { getRange } from '../utils/functions';

export async function loadWords(group: number, page: number): Promise<Word[]> {
  const response: IWordsResponse = await fetch(`${API_URL}words?group=${group}&page=${page}`);
  const words = await response.json();
  return words;
}

export const getWords = async (group: number, page = pagesCount): Promise<Word[]> => {
  const range = getRange(page);
  const promises = range.map(async (index) => loadWords(group, index));
  return (await Promise.all(promises)).flat();
};
