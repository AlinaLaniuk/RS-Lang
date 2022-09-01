import './textbook.style.css';
import IWordInfo from '../types/textbook.types';

class TextbookView {
  totalPage = 30;

  setWordCardWrapper() {
    document.body.insertAdjacentHTML(
      'beforeend',
      `<div class="word-card-wrapper">
      </div>
     `,
    );
  }

  setWordCard(data: IWordInfo) {
    const wordCardWrapper = document.querySelector('.word-card-wrapper') as HTMLElement;
    wordCardWrapper.insertAdjacentHTML(
      'beforeend',
      // eslint-disable-next-line no-underscore-dangle
      `<div class="frame word-card" data-identifier=${data._id || data.id}>
           <div class="word-card-img-wrapper">
              <img class="word-card_img" src="https://team-171.herokuapp.com/${data.image}">
           </div>
           <div class="word-card_info">
              <div class="word-card_info_word-and-sound">
                 <div class="word-card_info_word">
                    <span>${data.word}</span>
                    <span>${data.transcription}</span>
                    <span>${data.wordTranslate}</span>
                 </div>
                 <button class="learned-difficult-button not-learned-yet hide">Learned word</button>
                 <button class="learned-difficult-button not-difficult-yet hide">Difficult word</button>
                 <div class="word-card_info_sound">
                    <img class="audio-button" src="./assets/sound.svg">
                    <audio class="audio" src="https://team-171.herokuapp.com/${data.audio}">
                    <audio class="audio" src="https://team-171.herokuapp.com/${data.audioMeaning}">
                    <audio class="audio" src="https://team-171.herokuapp.com/${data.audioExample}">
                 </div>
              </div>
              <div class="word-card_info_meaning">
                 <span>${data.textMeaning}</span>
                 <span>${data.textMeaningTranslate}</span>
              </div>
              <div class="word-card_info_example">
              <span>${data.textExample}</span>
              <span>${data.textExampleTranslate}</span>
              </div>
           </div>
        </div>`,
    );
    console.log(data);
  }

  setLevelPanel() {
    document.body.insertAdjacentHTML(
      'beforeend',
      `<div class="level-panel">
           <button data-id="0" class="level-button level-1">Level 1</button>
           <button data-id="1" class="level-button level-2">Level 2</button>
           <button data-id="2" class="level-button level-3">Level 3</button>
           <button data-id="3" class="level-button level-4">Level 4</button>
           <button data-id="4" class="level-button level-5">Level 5</button>
           <button data-id="5" class="level-button level-6">Level 6</button>
           <button data-id="6" class="level-button my-words">My words</button>
       </div>
       <div class="frame level-page-info">
           <span>Level 1</span>
           <span>Page 1</span>
       </div>`,
    );
  }

  setPaginationPanel() {
    document.body.insertAdjacentHTML(
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
    const paginationPanel = document.querySelector('.pagination') as HTMLElement;
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
        liTag += '<li class="pagination-button frame">...</li>';
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
        liTag += '<li class="pagination-button frame">...</li>';
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
