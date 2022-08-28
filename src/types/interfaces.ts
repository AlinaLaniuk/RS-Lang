export interface IComponent {
  render(): HTMLDivElement;
}

export interface IStats {
  id?: string;
  learnedWords: number;
  optional: {
    sprint: { [key: number]: IGameStat; };
    audioChallenge: { [key: number]: IGameStat; };
    longestSeries: {
      sprint: number;
      audioChallenge: number;
    }
  }
}

export interface IGameStat {
  day: string;
  newWords: number;
  percentCorrectAnswers: number;
}
