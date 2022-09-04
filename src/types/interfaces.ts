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
  newWords: number;
  percentCorrectAnswers: number;
  longestSeries: number;
}

export interface ITotalLearnedStat {
  day: string;
  learned: number;
}

export interface IWord {
  id?: string;
  wordId?: string;
  difficulty: string;
  optional: IWordParams;
}

export interface IWordParams {
  isLearned: boolean;
  guessed?: number;
  mistakes?: number;
}

export interface IAgregation {
  group?: string;
  page?: string;
  wordsPerPage?: string;
  filter?: string;
}
export interface IWordInfo {
  _id? : string,
  id? : string,
  group: number,
  page: number,
  word: string,
  image: string,
  audio: string,
  audioMeaning: string,
  audioExample: string,
  textMeaning: string,
  textExample: string,
  transcription: string,
  wordTranslate: string,
  textMeaningTranslate: string,
  textExampleTranslate: string,
  userWord?: IWord,
}
