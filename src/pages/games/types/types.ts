export type Callback = () => void;
export type QuestionCallback = (answer: boolean) => void;

export type Word = {
  id: string
  group: string
  page: string
  word: string
  image: string
  audio: string
  audioMeaning: string
  audioExample: string
  textMeaning: string
  textExample: string
  transcription: string
  textExampleTranslate: string
  textMeaningTranslate: string
  wordTranslate: string
};

export interface IAuth {
  message: string
  name: string
  userId: string
  token: string
  refreshToken: string
  tokenExpired: string
}

export interface IStats {
  learnedWords: number
  optional: Partial<OptionalStats>
}

type OptionalStats = {
  sprint: Game,
  audioChallenge: Game,
  longestSeries: {
    sprint: number,
    audioChallenge: number
  }
};

type Game = {
  gameNumber:{
    day : string
    newWords: number
    percentCorrectAnswer: number
  }
};

export interface ISprintQuestion {
  word: string
  wordTranslate: string
  answer: boolean
  hasNext: boolean
}

export interface IChallengeQuestion {
  word: Word
  translates: string[]
  rightAnswer: number
  hasNext: boolean
}

export interface IResult {
  points: number
  rights: Word[]
  wrongs: Word[]
}

export interface IScore {
  points: number
  bonus: number
  hits: number
}

export interface IWordsResponse extends Response {
  json(): Promise<Word[]>;
}
export interface IStatsResponse extends Response {
  json(): Promise<IStats>;
}
