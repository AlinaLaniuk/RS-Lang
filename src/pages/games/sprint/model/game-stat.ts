import { IStats, Word } from '../../types/types';

class GameStat {
  private rightAnswers: Word[] = [];

  private wrongAnswers: Word[] = [];

  private currentSeries = 0;

  private longestSeries = 0;

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
  }
}

export default GameStat;
