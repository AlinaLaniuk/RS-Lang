import { IChallengeQuestion, Word } from '../../types/types';
import { challengeGameLength, variantsPerQuestion } from '../../utils/constants';
import { getRandomInt, shuffle } from '../../utils/functions';

class ChallengeQuestions {
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
    return this.storage[this.currentIndex - 1];
  }

  next(): IChallengeQuestion {
    const word = this.storage[this.currentIndex];
    let translates = [word.wordTranslate];

    while (translates.length < variantsPerQuestion) {
      const randomIndex = getRandomInt(this.storage.length);
      if (randomIndex !== this.currentIndex) {
        const translate = this.storage[randomIndex].wordTranslate;
        if (!translates.includes(translate)) {
          translates.push(translate);
        }
      }
    }

    translates = shuffle(translates);
    const rightAnswer = translates.indexOf(word.wordTranslate);

    this.currentIndex += 1;
    const hasNext = this.currentIndex <= challengeGameLength;

    return {
      word,
      translates,
      rightAnswer,
      hasNext,
    };
  }
}

export default ChallengeQuestions;
