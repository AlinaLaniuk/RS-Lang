import { API_URL } from '../../../constants';
import { QuestionCallback, IChallengeQuestion } from '../types/types';
import { getRange } from '../utils/functions';
import ChallengeQuestionButton from './challenge-question-button';

class QuestionForm {
  private questionForm = document.createElement('div');

  private playCorrect = document.createElement('audio');

  private playIncorrect = document.createElement('audio');

  id = 'challenge-question-form';

  constructor(private callback: QuestionCallback) {
    this.questionForm.className = this.id;
    this.questionForm.id = this.id;

    this.playCorrect.src = '../../../assets/sounds/correct.mp3';
    this.playCorrect.preload = 'auto';
    this.playIncorrect.src = '../../../assets/sounds/incorrect.mp3';
    this.playIncorrect.preload = 'auto';
  }

  private playAnswer(answer: boolean): void {
    if (answer) {
      this.playCorrect.play();
    } else {
      this.playIncorrect.play();
    }
  }

  private onAnswer = (answer: boolean) => {
    this.playAnswer(answer);
    this.callback(answer);
    this.disableButtons();
  };

  private answerButtons: HTMLButtonElement[] = [];

  private onKeyboardChoose(index: number) {
    const isRight = this.answerButtons[index].id === 'answer-true';
    this.answerButtons[index].classList.add(isRight ? 'button-right' : 'button-wrong');
    this.onAnswer(isRight);
    this.questionForm.removeEventListener('keyup', this.keyboardListener);
  }

  private keyboardListener = (event: KeyboardEvent) => {
    switch (event.code) {
      case 'Digit1':
        this.onKeyboardChoose(0);
        break;
      case 'Digit2':
        this.onKeyboardChoose(1);
        break;

      case 'Digit3':
        this.onKeyboardChoose(2);
        break;

      case 'Digit4':
        this.onKeyboardChoose(3);
        break;

      case 'Space':
        this.onAnswer(false);
        this.questionForm.removeEventListener('keyup', this.keyboardListener);
        break;

      case 'Enter':
        this.onAnswer(false);
        this.questionForm.removeEventListener('keyup', this.keyboardListener);
        break;

      default:
        break;
    }
    this.questionForm.focus();
  };

  private disableButtons() {
    getRange(4).forEach((i) => { this.answerButtons[i].disabled = true; });
    const skipButton:HTMLButtonElement = document.getElementById('skip-button') as HTMLButtonElement;
    if (skipButton) skipButton.disabled = true;
  }

  render(question: IChallengeQuestion) {
    this.questionForm.tabIndex = -1;
    this.questionForm.innerHTML = '';

    const questionButton = document.createElement('div');
    questionButton.className = 'challenge-question-button';

    const questionAudio = document.createElement('audio');
    questionAudio.src = API_URL + question.word.audio;
    questionAudio.preload = 'auto';
    questionAudio.autoplay = true;
    questionButton.onclick = () => questionAudio.play();

    const buttonsContainer = document.createElement('div');
    buttonsContainer.className = 'challenge-question-buttons';

    this.answerButtons = question.translates.map(
      (item, i) => {
        const button = new ChallengeQuestionButton(`${i + 1}\n${item}`).render();
        const isRight = i === question.rightAnswer;
        button.id = `answer-${isRight}`;

        const clickListener = () => {
          button.classList.add(isRight ? 'button-right' : 'button-wrong');
          this.onAnswer(isRight);
          button.removeEventListener('click', clickListener);
          this.questionForm.removeEventListener('keyup', this.keyboardListener);
        };

        button.addEventListener('click', clickListener);
        return button;
      },
    );

    buttonsContainer.append(...this.answerButtons);

    const skipButton = new ChallengeQuestionButton('Не знаю').render();
    skipButton.classList.add('skip-button');
    skipButton.id = 'skip-button';
    skipButton.onclick = () => {
      this.onAnswer(false);
      skipButton.disabled = true;
    };

    this.questionForm.addEventListener('keyup', this.keyboardListener);
    this.questionForm.append(questionButton, buttonsContainer, skipButton);

    return this.questionForm;
  }
}
export default QuestionForm;
