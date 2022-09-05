import './textbook.style.css';
import { IWordInfo } from '../types/interfaces';
import AutorizationModel from '../autorization/autorization.model';

const isAuthorized = new AutorizationModel().isLogedIn();
class TextbookView {
  totalPage = 30;

  container: HTMLElement;

  constructor(container: HTMLElement) {
    this.container = container;
  }

  setWordCardWrapper() {
    this.container.insertAdjacentHTML(
      'beforeend',
      `<div class="word-card-wrapper">
      </div>
     `,
    );
  }

  setWordCard(wordData: IWordInfo) {
    const wordCardWrapper = document.querySelector('.word-card-wrapper') as HTMLElement;
    console.log(wordData);
    const difficultClass = () => {
      if (wordData.userWord?.difficulty === 'hard') {
        return 'difficult';
      }
      return '';
    };
    const learnedClass = () => {
      if (wordData.userWord?.optional.isLearned === true) {
        return 'learned';
      }
      return '';
    };
    const levelColor = () => {
      if (wordData.group <= 6) {
        return wordData.group;
      }
      return '';
    };
    wordCardWrapper.insertAdjacentHTML(
      'beforeend',
      // eslint-disable-next-line no-underscore-dangle
      `<div class="frame word-card" data-identifier=${wordData._id || wordData.id}>
           <div class="word-card-img-wrapper">
              <img class="word-card_img" src="https://team-171.herokuapp.com/${wordData.image}">
           </div>
           <div class="word-card_info">
              <div class="word-card_info_word-and-sound">
                 <div class="word-card_info_word level-${levelColor()}">
                    <span>${wordData.word}</span>
                    <span>${wordData.transcription}</span>
                    <span>${wordData.wordTranslate}</span>
                 </div>
                 <button class="learned-difficult-button not-learned-yet ${learnedClass()} hide" id="learned-button">Learned word</button>
                 <button class="learned-difficult-button not-difficult-yet ${difficultClass()} hide">Difficult word</button>
                 <div class="word-card_info_sound">
                    <img class="audio-button" src="./assets/sound.svg">
                    <audio class="audio" src="https://team-171.herokuapp.com/${wordData.audio}">
                    <audio class="audio" src="https://team-171.herokuapp.com/${wordData.audioMeaning}">
                    <audio class="audio" src="https://team-171.herokuapp.com/${wordData.audioExample}">
                 </div>
              </div>
              <div class="word-card_info_meaning">
                 <span>${wordData.textMeaning}</span>
                 <span>${wordData.textMeaningTranslate}</span>
              </div>
              <div class="word-card_info_example">
                 <span>${wordData.textExample}</span>
                 <span>${wordData.textExampleTranslate}</span>
              </div>
              <div class="stat-info ${isAuthorized ? '' : 'hide'}">
                 <span>Guessed: ${wordData.userWord?.optional.guessed === undefined ? 0 : wordData.userWord?.optional.guessed}</span>
                 <span>Mistakes: ${wordData.userWord?.optional.mistakes === undefined ? 0 : wordData.userWord?.optional.mistakes}</span>
              </div>
           </div>
        </div>`,
    );
  }

  setLevelPanel() {
    this.container.insertAdjacentHTML(
      'beforeend',
      `<div class="level-panel">
           <button data-id="0" class="level-button level-0">Level 1</button>
           <button data-id="1" class="level-button level-1">Level 2</button>
           <button data-id="2" class="level-button level-2">Level 3</button>
           <button data-id="3" class="level-button level-3">Level 4</button>
           <button data-id="4" class="level-button level-4">Level 5</button>
           <button data-id="5" class="level-button level-5">Level 6</button>
           <button data-id="6" class="level-button my-word ${isAuthorized ? '' : 'hide'}">My words</button>
       </div>
       <div class="level-page-info">
          <div class="level-page frame">
              <span class="level">Level 1</span>
              <span class="page">Page 1</span>
          </div>   
           <div class="all-words-learned hide"><div>Great work! This page is absolutely done!</div></div>
       </div>`,
    );
  }

  setPaginationPanel() {
    this.container.insertAdjacentHTML(
      'beforeend',
      `<div class="pagination-wrapper">
        <ul class="pagination">
        </ul>
     </div>
     `,
    );
    this.createPagination(1);
  }

  createPagination(page: number) {
    const paginationPanel = this.container.querySelector('.pagination') as HTMLElement;
    let liTag = '';
    let active;
    let beforePage = page - 1;
    let afterPage = page + 1;
    if (afterPage === 31) {
      afterPage = 30;
    }
    if (page > 1) {
      liTag += '<li class="pagination-button frame">Prev</li>';
    }
    if (page > 2) {
      liTag += '<li class="pagination-button frame">1</li>';
      if (page > 3) {
        liTag += '<li id="dots-to-prev" class="pagination-button frame">...</li>';
      }
    }
    if (page === this.totalPage) {
      beforePage -= 2;
    } else if (page === this.totalPage - 1) {
      beforePage -= 1;
    }
    if (page === 1) {
      afterPage += 2;
    } else if (page === 2) {
      afterPage += 1;
    }
    for (let pagesBetweenDots = beforePage; pagesBetweenDots <= afterPage; pagesBetweenDots += 1) {
      if (pagesBetweenDots === 0) {
        pagesBetweenDots += 1;
      }
      if (page === pagesBetweenDots) {
        active = 'active';
      } else {
        active = '';
      }
      liTag += `<li class="pagination-button frame ${active}">${pagesBetweenDots}</li>`;
    }
    if (page <= this.totalPage - 1) {
      if (page < this.totalPage - 2) {
        liTag += '<li id="dots-to-next" class="pagination-button frame">...</li>';
      }
    }
    if (page < this.totalPage) {
      liTag += '<li class="pagination-button frame">Next</li>';
    }
    paginationPanel.innerHTML = liTag;
    return liTag;
  }
}
export default TextbookView;
