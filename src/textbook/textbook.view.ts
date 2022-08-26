import './textbook.style.css';
import IWordInfo from '../types/textbook.types';
import TextbookController from './textbook.controller';

const textbookController = new TextbookController();
class TextbookView {
//   data: IWordInfo;

  //   constructor(wordInfo: IWordInfo) {
  //     this.data = wordInfo;
  //   }

  setWordCard(data: IWordInfo) {
    document.body.insertAdjacentHTML(
      'beforeend',
      `<div class="frame word-card">
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
                 <div class="word-card_info_sound">
                    <img src="./assets/sound.svg">
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
  }

  setLevelPanel() {
    document.body.insertAdjacentHTML(
      'beforeend',
      `<div class="level-panel">
           <button class="level-1">Level 1</button>
           <button class="level-2">Level 2</button>
           <button class="level-3">Level 3</button>
           <button class="level-4">Level 4</button>
           <button class="level-5">Level 5</button>
           <button class="level-6">Level 6</button>
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
    textbookController.paginationListener();
    textbookController.createPagination(1);
  }
}
export default TextbookView;
