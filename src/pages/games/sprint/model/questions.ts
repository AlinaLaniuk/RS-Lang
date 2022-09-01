import { ISprintQuestion, Word } from '../../types/types';
import { getRandomInt, shuffle } from '../../utils/functions';

class Questions {
  private storage: Word[] = [];

  private currentIndex = 0;

  addWords(words: Word[], launchFromPage: boolean): void {
    if (launchFromPage) {
      this.storage.push(...shuffle(words).reverse());
    } else {
      this.storage.push(...shuffle(words));
    }
  }

  get currentWord(): Word {
    return this.storage[this.currentIndex];
  }

  next(): ISprintQuestion {
    const { word } = this.storage[this.currentIndex];

    const index = [
      getRandomInt(this.storage.length),
      this.currentIndex,
    ][getRandomInt(2)];

    const { wordTranslate } = this.storage[index];
    const answer = index === this.currentIndex;
    this.currentIndex += 1;
    const hasNext = this.currentIndex < this.storage.length;
    return {
      word,
      wordTranslate,
      answer,
      hasNext,
    };
  }
}

export default Questions;
