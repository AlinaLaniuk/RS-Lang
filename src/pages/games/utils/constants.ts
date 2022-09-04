import { IGameStat, IStats } from '../../../types/interfaces';

export const enum PageIds {
  MainPage = 'main',
  GamesPage = 'games',
  TextbookPage = 'textbook',
  StatsPage = 'stats',
  SprintPage = 'sprint',
  ChallengePage = 'challenge',
}

export const pagesCount = 30;

export const challengeGameLength = 20;

export const variantsPerQuestion = 4;

const initGameStats:IGameStat = {
  day: new Date().toISOString().split('T')[0],
  newWords: 0,
  percentCorrectAnswers: 0,
  longestSeries: 0,
};

export const initStats: IStats = {
  learnedWords: 0,
  optional: {
    sprint: {
      0: initGameStats,
    },
    audioChallenge: {
      0: initGameStats,
    },
    totalWords: {
      0: {
        day: new Date().toISOString().split('T')[0],
        learned: 0,
      },
    },
  },
};

export default {};
