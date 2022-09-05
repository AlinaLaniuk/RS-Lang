import { Word } from '../types/types';
import { IGameStat, IStats, IWord as IUserWord } from '../../../types/interfaces';
import UserWords from '../services/user-words-api';
import AutorizationModel from '../../../autorization/autorization.model';
import WordsAPI from '../../../services/words';
import StatsAPI from '../services/stats-api';
import { initStats } from './constants';

class GameStat {
  private rightAnswers: Word[] = [];

  private wrongAnswers: Word[] = [];

  private currentSeries = 0;

  private longestSeries = 0;

  private auth = new AutorizationModel();

  private wordsApi = new WordsAPI();

  private userWordsIds: string[] = [];

  private userWords: IUserWord[] = [];

  private learnedWords = 0;

  constructor(private game: 'sprint' | 'audioChallenge') {
    if (this.auth.isLogedIn()) this.loadUserWords();
  }

  private stats: IStats = initStats;

  async sendStats(): Promise<void> {
    if (this.auth.isLogedIn()) {
      await this.getStats();
      const sprintStats = this.stats.optional.sprint;
      const challengeStats = this.stats.optional.audioChallenge;
      const currentDate = new Date().toISOString().split('T')[0];
      const gameStats = this.game === 'sprint' ? sprintStats : challengeStats;
      const lastIndex = Object.keys(gameStats)[Object.keys(gameStats).length - 1];

      const current: IGameStat = {
        day: currentDate,
        newWords: this.userWordsIds.length,
        percentCorrectAnswers: this.rightPercent,
        longestSeries: this.longestSeries,
      };

      const defaultData = new Map(Object.entries(gameStats));

      if (defaultData.get(lastIndex)?.day === currentDate) {
        const old = defaultData.get(lastIndex) as IGameStat;
        const { longestSeries } = old;
        const percent = (old.percentCorrectAnswers + current.percentCorrectAnswers) / 2;
        const series = longestSeries > current.longestSeries
          ? longestSeries
          : current.longestSeries;

        const newDay = {
          day: old.day,
          newWords: old.newWords + current.newWords,
          percentCorrectAnswers: percent,
          longestSeries: series,
        };

        defaultData.delete(lastIndex);
        defaultData.set(lastIndex, newDay);
      } else {
        defaultData.set((Number(lastIndex) + 1).toString(), current);
      }

      const newStat: IStats = {
        learnedWords: this.stats.learnedWords + this.learnedWords,
        optional: {
          sprint: this.game === 'sprint'
            ? Object.fromEntries(defaultData)
            : this.stats.optional.sprint,
          audioChallenge: this.game === 'audioChallenge'
            ? Object.fromEntries(defaultData)
            : this.stats.optional.audioChallenge,

          totalWords: this.stats.optional.totalWords,
        },
      };

      await StatsAPI.setStats(newStat);
    }
  }

  private async getStats(): Promise<void> {
    this.stats = await StatsAPI.getStats();
  }

  private async loadUserWords(): Promise<void> {
    this.userWords = await UserWords.getAllUserWords();
    this.userWords.forEach((word) => {
      if (word.wordId) this.userWordsIds.push(word.wordId);
    });
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
      const guessed = userWord.optional.guessed ?? 0;
      const mistakes = userWord.optional.mistakes ?? 0;
      const isHardLearned = guessed - mistakes > 3;
      const isLearned = guessed - mistakes > 1;

      if ((isHardLearned || isLearned) && answer) this.learnedWords += 1;

      this.wordsApi.updateUserWord(
        word.id,
        {
          difficulty: isHardLearned && answer ? 'easy' : userWord.difficulty,
          optional: {
            isLearned: isLearned && answer,
            guessed: answer ? guessed + 1 : guessed,
            mistakes: answer ? mistakes : mistakes + 1,
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
        this.addNewUserWord(word, result);
      } else {
        this.updateUserWord(word, result);
      }
    }
  }
}

export default GameStat;
