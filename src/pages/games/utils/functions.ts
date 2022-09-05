import UserWords from '../services/user-words-api';
import { Word } from '../types/types';

export const getRange = (count: number) => [...Array(count).keys()];

export const getRandomInt = (max: number) => Math.floor(Math.random() * max);

export function shuffle <T>(array: Array<T>): Array<T> {
  const arr = [...array];

  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = getRandomInt(i + 1);
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  return arr;
}

export const omitLearned = async (words : Word[]): Promise<Word[]> => {
  const userWords = await UserWords.getAllUserWords();
  const learnedWords = userWords.filter((word) => word.optional.isLearned);
  const learnedWordsIds = learnedWords.map((word) => word.wordId);
  return words.filter((word) => !learnedWordsIds.includes(word.id));
};

export default {};
