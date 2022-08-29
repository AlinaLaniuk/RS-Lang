export interface IComponent {
  render(): HTMLDivElement;
}

export interface IStats {
  id?: string;
  learnedWords: number;
  optional: {
    sprint: { [key: number]: IGameStat; };
    audioChallenge: { [key: number]: IGameStat; };
    totalWords: { [key: number]: ITotalLearnedStat; }
  }
}

export interface IGameStat {
  day: string;
  newWords: string;
  percentCorrectAnswers: number;
  longestSeries: number;
}

export interface ITotalLearnedStat {
  day: string;
  learned: string;
}

export interface IWord {
  id?: string;
  wordId?: string;
  difficulty: string;
  optional: IWordParams;
}

export interface IWordParams {
  isLearned: boolean;
  guessed: number;
  mistakes: number;
}

export interface IAgregation {
  group: string;
  page: string;
  wordsPerPage: string;
  filter?: string;
}
