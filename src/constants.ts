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
    img: './assets/img/main-page.svg',
  },
  {
    id: PageIds.TextbookPage,
    text: 'Textbook',
    img: './assets/img/textbook.svg',
  },
  {
    id: PageIds.GamesPage,
    text: 'Games',
    img: './assets/img/game-pad.svg',
  },
  {
    id: PageIds.StatsPage,
    text: 'Stats',
    img: './assets/img/statistics.svg',
  },
];
