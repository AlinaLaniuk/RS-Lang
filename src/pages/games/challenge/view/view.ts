import '../challenge.css';
import ChallengeModal from './challenge-modal';
import {
  Callback, QuestionCallback, IChallengeQuestion, IResult,
} from '../../types/types';
import ChallengeTimer from '../../components/challenge-timer/challenge-timer';
import { challengeGameLength } from '../../utils/constants';
import ChallengeQuestionForm from '../../components/challenge-question-form';
import ResultModal from '../../components/result-modal';
import LoadModal from '../../components/load-modal';

class View {
  constructor(private questionCallback: QuestionCallback, private gameOverCallback: Callback) { }

  private isStopped = false;

  private stopGame = () => { this.isStopped = true; };

  private loadModal = new LoadModal();

  private modal = new ChallengeModal(this.stopGame);

  private questionForm = new ChallengeQuestionForm(this.questionCallback);

  private timer = new ChallengeTimer();

  private parent = document.body;
  // private parent = document.getElementById('challenge');

  renderModal() {
    this.parent?.append(this.modal.render());
  }

  renderLoadModal() {
    this.parent?.append(this.loadModal.render());
  }

  renderResults(result: IResult) {
    const resultModal = new ResultModal(result);
    this.parent?.append(resultModal.render());
  }

  private renderTimer() {
    const place = document.getElementById(this.modal.timerPlace.id);
    this.setScore(0);
    place?.append(this.timer.render());
  }

  setScore(value: number) {
    this.timer.label = `${value} / ${challengeGameLength}`;
  }

  renderQuestionForm(question: IChallengeQuestion) {
    const place = document.getElementById(this.modal.questionPlace.id);
    const form = this.questionForm.render(question);
    place?.append(form);
    form.focus();
  }

  gameOver(result: IResult) {
    const gameOverSound = document.createElement('audio');
    gameOverSound.src = '../../../../assets/sounds/winner.mp3';
    gameOverSound.preload = 'auto';
    gameOverSound.autoplay = true;
    this.remove(this.modal.id);
    if (!this.isStopped) this.renderResults(result);
  }

  render(
    question: IChallengeQuestion,
  ) {
    this.remove(this.loadModal.id);
    this.renderModal();
    this.renderTimer();
    this.renderQuestionForm(question);
    document.getElementById(this.questionForm.id)?.focus();
  }

  private remove(id: string): void {
    document.getElementById(id)?.remove();
  }
}

export default View;
