import './textbook.style.css';
import IWordInfo from '../types/textbook.types';

export function setLevelPanel() {
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
export class WordCard {
  data: IWordInfo;

  constructor(wordInfo: IWordInfo) {
    this.data = wordInfo;
  }

  setWordCard() {
    document.body.insertAdjacentHTML(
      'beforeend',
      `<div class="frame word-card">
           <div class="word-card-img-wrapper">
              <img class="word-card_img" src="https://team-171.herokuapp.com/${this.data.image}">
           </div>
           <div class="word-card_info">
              <div class="word-card_info_word-and-sound">
                 <div class="word-card_info_word">
                    <span>${this.data.word}</span>
                    <span>${this.data.transcription}</span>
                    <span>${this.data.wordTranslate}</span>
                 </div>
                 <div class="word-card_info_sound">
                    <img src="./assets/sound.svg">
                 </div>
              </div>
              <div class="word-card_info_meaning">
                 <span>${this.data.textMeaning}</span>
                 <span>${this.data.textMeaningTranslate}</span>
              </div>
              <div class="word-card_info_example">
              <span>${this.data.textExample}</span>
              <span>${this.data.textExampleTranslate}</span>
              </div>
           </div>
        </div>`,
    );
  }
}
