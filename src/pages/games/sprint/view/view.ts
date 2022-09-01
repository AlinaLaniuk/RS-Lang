import '../sprint.css';
import QuestionsForm from '../../components/question-form';
import Timer from '../../components/timer';
import SprintModal from './sprint-modal';
import ScorePanel from '../../components/score-panel';
import {
  ISprintQuestion, IResult, IScore, Callback, QuestionCallback,
} from '../../types/types';
import ResultModal from './result-modal';
import LoadModal from '../../components/load-modal';

class View {
  constructor(private questionCallback: QuestionCallback, private gameOverCallback: Callback) { }

  private isStopped = false;

  private stopGame = () => { this.isStopped = true; };

  private loadModal = new LoadModal();

  private modal = new SprintModal(this.stopGame);

  private scorePanel = new ScorePanel();

  private questionForm = new QuestionsForm(this.questionCallback);

  private timer = new Timer(this.gameOverCallback);

  private parent = document.getElementById('sprint');

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

  renderScorePanel(score: IScore) {
    const place = document.getElementById(this.modal.scorePlace.id);
    place?.append(this.scorePanel.render(score));
  }

  renderQuestionForm(question: ISprintQuestion) {
    const place = document.getElementById(this.modal.questionPlace.id);
    const form = this.questionForm.render(question);
    place?.append(form);
    form.focus();
  }

  private renderTimer() {
    const place = document.getElementById(this.modal.timerPlace.id);
    place?.append(this.timer.render());
  }

  gameOver(result: IResult) {
    this.remove(this.modal.id);
    if (!this.isStopped) this.renderResults(result);
    this.timer.stop();
  }

  render(
    score: IScore,
    question: ISprintQuestion,
  ) {
    this.remove(this.loadModal.id);
    this.renderModal();
    this.renderScorePanel(score);
    this.renderQuestionForm(question);
    this.renderTimer();
    document.getElementById(this.questionForm.id)?.focus();
  }

  private remove(id: string): void {
    document.getElementById(id)?.remove();
  }
}

export default View;
