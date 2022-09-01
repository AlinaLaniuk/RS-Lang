import { Callback } from '../../types/types';
import CloseButton from '../../components/close-button';

class SprintModal {
  private sprintModal = document.createElement('div');

  scorePlace = document.createElement('div');

  questionPlace = document.createElement('div');

  timerPlace = document.createElement('div');

  id = 'sprint-modal';

  constructor(callback: Callback) {
    this.sprintModal.className = 'modal active';
    this.sprintModal.id = this.id;
    this.scorePlace.id = 'score-place';
    this.questionPlace.id = 'question-place';
    this.timerPlace.id = 'timer-place';

    const close = new CloseButton(this.id, callback);
    this.sprintModal.append(this.scorePlace, this.questionPlace, this.timerPlace, close.render());
    this.sprintModal.onclick = () => {
      document.getElementById('question-form')?.focus();
    };
  }

  render(): HTMLDivElement {
    return this.sprintModal;
  }
}

export default SprintModal;
