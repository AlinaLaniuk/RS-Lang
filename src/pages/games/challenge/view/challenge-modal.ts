import { Callback } from '../../types/types';
import CloseButton from '../../components/close-button';

class ChallengeModal {
  private sprintModal = document.createElement('div');

  scorePlace = document.createElement('div');

  questionPlace = document.createElement('div');

  timerPlace = document.createElement('div');

  id = 'challenge-modal';

  constructor(callback: Callback) {
    this.sprintModal.className = 'modal';
    this.sprintModal.id = this.id;
    this.questionPlace.id = 'question-place';
    this.timerPlace.id = 'timer-place';

    const close = new CloseButton(this.id, callback);
    this.sprintModal.append(
      this.timerPlace,
      this.questionPlace,
      close.render(),
    );
    this.sprintModal.onclick = () => {
      document.getElementById('challenge-question-form')?.focus();
    };
  }

  render(): HTMLDivElement {
    return this.sprintModal;
  }
}

export default ChallengeModal;
