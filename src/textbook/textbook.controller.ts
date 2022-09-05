import { IWordInfo } from '../types/interfaces';
import TextbookModel from './textbook.model';
import TextbookView from './textbook.view';

function promisifyAudioPlaying(mediaElement: HTMLMediaElement):Promise<void> {
  return new Promise((resolve) => {
    mediaElement.addEventListener('ended', () => {
      resolve();
    });
    mediaElement.play();
  });
}

function removeHideClass() {
  const learnedCollection = document.querySelectorAll('.not-learned-yet');
  const difficultCollection = document.querySelectorAll('.not-difficult-yet');
  learnedCollection.forEach((learnedIndicator) => {
    learnedIndicator.classList.remove('hide');
  });
  difficultCollection.forEach((difficultIndicator) => {
    difficultIndicator.classList.remove('hide');
  });
}
class TextbookController {
  model: TextbookModel;

  view: TextbookView;

  container: HTMLElement;

  currentPage = 1;

  currentLevel = 0;

  constructor(container: HTMLElement) {
    this.container = container;
    this.model = new TextbookModel();
    this.view = new TextbookView(container);
  }

  levelPanelListener() {
    const levelPanel = this.container.querySelector('.level-panel') as HTMLElement;
    levelPanel.addEventListener('click', async (event) => {
      const eventTarget = event.target as HTMLElement;
      if (eventTarget.classList.contains('level-button')) {
        this.currentLevel = +(eventTarget.dataset.id as string);
        this.currentPage = 1;
        const paginationPanel = this.container.querySelector('.pagination-wrapper');
        if (eventTarget.classList.contains('my-word')) {
          paginationPanel?.classList.add('hide');
          this.createWordCards(this.currentLevel, this.currentPage, true);
          this.changePageLevelInfo(this.currentLevel + 1, this.currentPage);
        } else {
          this.createWordCards(this.currentLevel, this.currentPage);
          this.changePageLevelInfo(this.currentLevel + 1, this.currentPage);
          paginationPanel?.classList.remove('hide');
          this.view.createPagination(this.currentPage);
        }
      }
    });
  }

  paginationListener() {
    const paginationPanel = this.container.querySelector('.pagination-wrapper') as HTMLElement;
    paginationPanel.addEventListener('click', (event) => {
      const eventTarget = event.target as HTMLElement;
      const eventTargetContent = eventTarget.innerHTML;
      if (eventTarget.classList.contains('pagination-button')) {
        const pageNumber = +eventTargetContent;
        if (eventTarget.id === 'dots-to-prev') {
          this.currentPage -= 3;
        } else if (eventTarget.id === 'dots-to-next') {
          this.currentPage += 3;
        } else if (eventTargetContent === 'Next') {
          this.currentPage += 1;
        } else if (eventTargetContent === 'Prev') {
          this.currentPage -= 1;
        } else if (pageNumber <= this.view.totalPage && pageNumber >= 0) {
          this.currentPage = pageNumber;
        }
        this.view.createPagination(this.currentPage);
        this.createWordCards(this.currentLevel, this.currentPage);
        this.changePageLevelInfo(this.currentLevel + 1, this.currentPage);
      }
    });
  }

  changePageLevelInfo(level: number, page: number) {
    const levelInfo = this.container.querySelector('.level') as HTMLElement;
    const pageInfo = this.container.querySelector('.page') as HTMLElement;
    if (level === 7) {
      levelInfo.textContent = 'My words';
    } else {
      levelInfo.textContent = `Level ${level}`;
      pageInfo.textContent = `Page ${page}`;
    }
  }

  createWordCards(level: number, page: number, myWord?: boolean) {
    const wordCardWrapper = this.container.querySelector('.word-card-wrapper') as HTMLElement;
    wordCardWrapper.innerHTML = '';
    this.model.getWordsInfo(level, page - 1)
      .then((wordsInfo) => {
        if (wordsInfo.length > 1) {
          wordsInfo.forEach((wordInfo: IWordInfo) => {
            this.view.setWordCard(wordInfo);
            this.setLearnedPage();
          });
          this.setAudioButtonListener();
        } else {
          wordsInfo[0].paginatedResults.forEach((wordInfo: IWordInfo) => {
            this.view.setWordCard(wordInfo);
          });
          removeHideClass();
          this.setAudioButtonListener();
          // eslint-disable-next-line no-underscore-dangle
          this.setLearnedButtonListener();
          this.setDifficultButtonListener();
          this.setLearnedPage();
          if (myWord) {
            const wordCardInfoBlockCollection = this.container.querySelectorAll('.word-card_info_word');
            wordCardInfoBlockCollection.forEach((wordCardInfoBlock) => {
              wordCardInfoBlock.classList.add('my-word');
            });
            const learnedButtonCollection = this.container.querySelectorAll('.not-learned-yet');
            for (let i = 0; i < learnedButtonCollection.length; i += 1) {
              learnedButtonCollection[i].innerHTML = 'Learned and delete';
            }
            const difficultButtonCollection = this.container.querySelectorAll('.not-difficult-yet');
            for (let i = 0; i < difficultButtonCollection.length; i += 1) {
              difficultButtonCollection[i].classList.add('hide');
            }
          }
        }
      });
  }

  sendWordInfoStylingButton(event: Event, isWordLearnedOrDifficult: string) {
    const eventTarget = event.target as HTMLElement;
    const card = eventTarget.closest('.word-card') as HTMLElement;
    const eventTargetParent = eventTarget.closest('.word-card_info_word-and-sound') as HTMLElement;
    const closestDifficult = eventTargetParent.querySelector('.not-difficult-yet') as HTMLElement;
    const closestLearned = eventTargetParent.querySelector('.not-learned-yet') as HTMLElement;
    console.log(eventTargetParent);
    const wordId = card.dataset.identifier as string;
    if (isWordLearnedOrDifficult === 'learned') {
      eventTarget.classList.add('learned');
      closestDifficult.classList.remove('difficult');
    } else if (isWordLearnedOrDifficult === 'difficult') {
      eventTarget.classList.add('difficult');
      closestLearned.classList.remove('learned');
    }
    return this.model.createOrUpdateLearnedWord(wordId, isWordLearnedOrDifficult);
  }

  setLearnedPage() {
    const learnedButtonCollection = this.container.querySelectorAll('.learned');
    const difficultButtonCollection = this.container.querySelectorAll('.difficult');
    const allWordsLearnedMark = this.container.querySelector('.all-words-learned');
    const wordCardWrapper = this.container.querySelector('.word-card-wrapper');
    const level = this.container.querySelector('.level')?.textContent;
    if ((learnedButtonCollection.length + difficultButtonCollection.length) === 20 && !(level === 'My words')) {
      allWordsLearnedMark?.classList.remove('hide');
      wordCardWrapper?.classList.add('learned-page');
    } else {
      allWordsLearnedMark?.classList.add('hide');
      wordCardWrapper?.classList.remove('learned-page');
    }
  }

  setLearnedButtonListener() {
    const notLearnedButtonsCollection = this.container.querySelectorAll('.not-learned-yet');
    notLearnedButtonsCollection.forEach((learnedButton) => {
      learnedButton.addEventListener('click', (event) => {
        const eventTarget = event.target as HTMLElement;
        if (eventTarget.innerHTML === 'Learned and delete') {
          this.sendWordInfoStylingButton(event, 'learnedOnMyWordPage').then(() => {
            this.createWordCards(this.currentLevel, this.currentPage, true);
          });
        } else {
          this.sendWordInfoStylingButton(event, 'learned');
        }
        this.setLearnedPage();
      });
    });
  }

  setDifficultButtonListener() {
    const difficultButtonsCollection = this.container.querySelectorAll('.not-difficult-yet');
    difficultButtonsCollection.forEach((difficultButton) => {
      difficultButton.addEventListener('click', (event) => {
        this.sendWordInfoStylingButton(event, 'difficult');
        this.setLearnedPage();
      });
    });
  }

  setAudioButtonListener() {
    const audioButtonCollection = this.container.querySelectorAll('.word-card_info_sound');
    audioButtonCollection.forEach((audioButton) => {
      audioButton.addEventListener('click', (event) => {
        const eventTarget = event.target as HTMLElement;
        const eventTargetParent = eventTarget.closest('.word-card_info_sound') as HTMLElement;
        const audioCollection = eventTargetParent.querySelectorAll('.audio') as NodeListOf<HTMLMediaElement>;
        let audioPlayingPromise: Promise<void> = Promise.resolve();
        audioCollection.forEach((audio: HTMLMediaElement) => {
          audioPlayingPromise = audioPlayingPromise.then(() => promisifyAudioPlaying(audio));
        });
      });
    });
  }

  launch() {
    this.view.setLevelPanel();
    this.levelPanelListener();
    this.view.setPaginationPanel();
    this.view.setWordCardWrapper();
    this.paginationListener();
    this.createWordCards(this.currentLevel, this.currentPage);
    this.changePageLevelInfo(this.currentLevel + 1, this.currentPage);
  }
}
export default TextbookController;
