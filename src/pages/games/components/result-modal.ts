import LevelHeader from './level-header';
import CloseButton from './close-button';
import ResultLine from './result-line';
import { IResult } from '../types/types';

class ResultModal {
  private resultModal = document.createElement('div');

  id = 'result-modal';

  constructor(result: IResult) {
    this.resultModal.id = this.id;
    this.resultModal.className = 'result-modal';

    const rights = result.rights.map(
      (item) => new ResultLine({
        sound: item.audio,
        word: item.word,
        translate: item.wordTranslate,
      }).render(),
    );

    const wrongs = result.wrongs.map(
      (item) => new ResultLine({
        sound: item.audio,
        word: item.word,
        translate: item.wordTranslate,
      }).render(),
    );

    const header = new LevelHeader(`Result: ${result.points} points`);
    const close = new CloseButton(this.id);

    const rightsContainer = document.createElement('div');
    const wrongsContainer = document.createElement('div');
    rightsContainer.className = 'rights-container';
    wrongsContainer.className = 'wrongs-container';

    rightsContainer.append(...rights);
    wrongsContainer.append(...wrongs);

    this.resultModal.append(close.render(), header.render(), wrongsContainer, rightsContainer);
  }

  render(): HTMLDivElement {
    return this.resultModal;
  }
}

export default ResultModal;
