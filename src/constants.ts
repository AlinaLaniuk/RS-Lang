export const API_URL = 'https://team-171.herokuapp.com/';

export const enum PageIds {
  MainPage = 'main',
  GamesPage = 'games',
  TextbookPage = 'textbook',
  StatsPage = 'stats',
  SprintPage = 'sprint',
  ChallengePage = 'challenge',
}

export const NavigationButtons = [
  {
    id: PageIds.MainPage,
    text: 'Main',
  },
  {
    id: PageIds.TextbookPage,
    text: 'Textbook',
  },
  {
    id: PageIds.GamesPage,
    text: 'Games',
  },
  {
    id: PageIds.StatsPage,
    text: 'Stats',
  },
];
