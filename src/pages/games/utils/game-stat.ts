import { IStats, Word } from '../types/types';
import { IWord as IUserWord } from '../../../types/interfaces';
import UserWords from '../services/user-words-api';
import AutorizationModel from '../../../autorization/autorization.model';
import WordsAPI from '../../../services/words';

class GameStat {
  private rightAnswers: Word[] = [];

  private wrongAnswers: Word[] = [];

  private currentSeries = 0;

  private longestSeries = 0;

  private auth = new AutorizationModel();

  private wordsApi = new WordsAPI();

  private userWordsIds: string[] = [];

  private userWords: IUserWord[] = [];

  private newWords = 0;

  constructor(private game: 'sprint' | 'audioChallenge') {
    this.loadUserWords();
  }

  private async loadUserWords(): Promise<void> {
    this.userWords = await UserWords.getAllUserWords();
    this.userWords.forEach((word) => {
      if (word.wordId) this.userWordsIds.push(word.wordId);
    });
    console.log(this.userWords);
    console.log(this.userWordsIds);
  }

  private addNewUserWord(word: Word, answer: boolean): void {
    this.wordsApi.createUserWord(
      word.id,
      {
        difficulty: 'easy',
        optional: {
          isLearned: false,
          guessed: answer ? 1 : 0,
          mistakes: answer ? 0 : 1,
        },
      },
    );
  }

  private updateUserWord(word: Word, answer: boolean): void {
    const userWord = this.userWords.find((item) => item.wordId === word.id);
    if (userWord) {
      const isHardLearned = userWord.optional.guessed - userWord.optional.mistakes > 3;
      const isLearned = userWord.optional.guessed - userWord.optional.mistakes > 1;

      this.wordsApi.updateUserWord(
        word.id,
        {
          difficulty: isHardLearned && answer ? 'easy' : userWord.difficulty,
          optional: {
            isLearned: isLearned && answer,
            guessed: answer ? userWord.optional.guessed + 1 : userWord.optional.guessed,
            mistakes: answer ? userWord.optional.mistakes : userWord.optional.mistakes + 1,
          },
        },
      );
    }
  }

  get rights(): Word[] {
    return this.rightAnswers;
  }

  get wrongs(): Word[] {
    return this.wrongAnswers;
  }

  get series(): number {
    return this.longestSeries;
  }

  get rightPercent(): number {
    const count = this.rightAnswers.length + this.wrongAnswers.length;
    return Math.round((this.rightAnswers.length / count) * 100);
  }

  get stats(): IStats {
    return {
      learnedWords: this.rightAnswers.length,
      optional: {},
    };
  }

  addAnswer(word: Word, result: boolean): void {
    if (result) {
      this.rightAnswers.push(word);
      this.currentSeries += 1;
      if (this.currentSeries > this.longestSeries) {
        this.longestSeries = this.currentSeries;
      }
    } else {
      this.wrongAnswers.push(word);
      this.currentSeries = 0;
    }

    if (this.auth.isLogedIn()) {
      if (!this.userWordsIds.includes(word.id)) {
        this.newWords += 1;
        this.addNewUserWord(word, result);
      } else {
        this.updateUserWord(word, result);
      }
    }
  }
}

export default GameStat;
