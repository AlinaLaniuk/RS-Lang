import { IWordInfo } from '../types/interfaces';
import TextbookModel from './textbook.model';
import TextbookView from './textbook.view';

const textbookModel = new TextbookModel();
const textbookView = new TextbookView();

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
  currentPage = 1;

  currentLevel = 0;

  levelPanelListener() {
    const levelPanel = document.querySelector('.level-panel') as HTMLElement;
    levelPanel.addEventListener('click', async (event) => {
      const eventTarget = event.target as HTMLElement;
      if (eventTarget.classList.contains('level-button')) {
        this.currentLevel = +(eventTarget.dataset.id as string);
        this.currentPage = 1;
        if (eventTarget.classList.contains('my-word')) {
          this.createWordCards(this.currentLevel, this.currentPage, true);
        } else {
          this.createWordCards(this.currentLevel, this.currentPage);
        }
        textbookView.createPagination(this.currentPage);
      }
    });
  }

  paginationListener() {
    const paginationPanel = document.body.querySelector('.pagination-wrapper') as HTMLElement;
    paginationPanel.addEventListener('click', (event) => {
      const eventTarget = event.target as HTMLElement;
      const eventTargetContent = eventTarget.innerHTML;
      if (eventTarget.classList.contains('pagination-button')) {
        if (eventTargetContent === 'Next') {
          this.currentPage += 1;
        } else if (eventTargetContent === 'Prev') {
          this.currentPage -= 1;
        } else if (this.currentPage < textbookView.totalPage - 1) {
          this.currentPage = +eventTargetContent;
        }
        textbookView.createPagination(this.currentPage);
        this.createWordCards(this.currentLevel, this.currentPage);
      }
    });
  }

  createWordCards(level: number, page: number, myWord?: boolean) {
    const wordCardWrapper = document.querySelector('.word-card-wrapper') as HTMLElement;
    wordCardWrapper.innerHTML = '';
    textbookModel.getWordsInfo(level, page - 1)
      .then((wordsInfo) => {
        if (level === 6) {
          textbookView.setMyWordPageWithoutAuthentication();
        }
        if (wordsInfo.length > 1) {
          wordsInfo.forEach((wordInfo: IWordInfo) => {
            textbookView.setWordCard(wordInfo);
          });
          this.setAudioButtonListener();
        } else {
          wordsInfo[0].paginatedResults.forEach((wordInfo: IWordInfo) => {
            textbookView.setWordCard(wordInfo);
          });
          removeHideClass();
          this.setAudioButtonListener();
          // eslint-disable-next-line no-underscore-dangle
          this.setLearnedButtonListener();
          this.setDifficultButtonListener();
          if (myWord) {
            const wordCardInfoBlockCollection = document.querySelectorAll('.word-card_info_word');
            wordCardInfoBlockCollection.forEach((wordCardInfoBlock) => {
              wordCardInfoBlock.classList.add('my-word');
            });
            const learnedButtonCollection = document.querySelectorAll('.not-learned-yet');
            for (let i = 0; i < learnedButtonCollection.length; i += 1) {
              learnedButtonCollection[i].innerHTML = 'Learned and delete';
            }
            const difficultButtonCollection = document.querySelectorAll('.not-difficult-yet');
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
    const wordId = card.dataset.identifier as string;
    if (isWordLearnedOrDifficult === 'learned') {
      eventTarget.classList.add('learned');
    } else if (isWordLearnedOrDifficult === 'difficult') {
      eventTarget.classList.add('difficult');
    }
    return textbookModel.createOrUpdateLearnedWord(wordId, isWordLearnedOrDifficult);
  }

  setLearnedButtonListener() {
    const notLearnedButtonsCollection = document.querySelectorAll('.not-learned-yet');
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
        const learnedButtonCollection = document.querySelectorAll('.learned');
        if (learnedButtonCollection.length === 20) {
          const allWordsLearnedMark = document.querySelector('.all-words-learned');
          allWordsLearnedMark?.classList.remove('hide');
        }
      });
    });
  }

  setDifficultButtonListener() {
    const difficultButtonsCollection = document.querySelectorAll('.not-difficult-yet');
    difficultButtonsCollection.forEach((difficultButton) => {
      difficultButton.addEventListener('click', (event) => {
        this.sendWordInfoStylingButton(event, 'difficult');
      });
    });
  }

  setAudioButtonListener() {
    const audioButtonCollection = document.querySelectorAll('.word-card_info_sound');
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
    textbookView.setLevelPanel();
    this.levelPanelListener();
    textbookView.setPaginationPanel();
    textbookView.setWordCardWrapper();
    this.paginationListener();
    this.createWordCards(this.currentLevel, this.currentPage);
  }
}
export default TextbookController;
