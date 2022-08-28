import IWordInfo from '../types/textbook.types';
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

class TextbookController {
  currentPage = 1;

  currentLevel = 0;

  levelPanelListener() {
    const levelPanel = document.querySelector('.level-panel') as HTMLElement;
    levelPanel.addEventListener('click', (event) => {
      const eventTarget = event.target as HTMLElement;
      if (eventTarget.classList.contains('level-button')) {
        this.currentLevel = +(eventTarget.dataset.id as string);
        this.currentPage = 1;
        this.createWordCards(this.currentLevel, this.currentPage);
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

  createWordCards(level: number, page: number) {
    const wordCardWrapper = document.querySelector('.word-card-wrapper') as HTMLElement;
    wordCardWrapper.innerHTML = '';
    textbookModel.getWordsInfo(level, page)
      .then((wordsInfo) => {
        wordsInfo.forEach((wordInfo: IWordInfo) => {
          textbookView.setWordCard(wordInfo);
          this.audioButtonListener();
        });
      });
  }

  audioButtonListener() {
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
    this.createWordCards(0, this.currentPage);
  }
}
export default TextbookController;



import TextBookController from './textbook/textbook.controller';

const textbookController = new TextBookController();
textbookController.launch();
