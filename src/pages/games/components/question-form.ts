import { QuestionCallback, ISprintQuestion } from '../types/types';
import QuestionButton from './question-button';

class QuestionsForm {
  private questionForm = document.createElement('div');

  private playCorrect = document.createElement('audio');

  private playIncorrect = document.createElement('audio');

  id = 'question-form';

  constructor(private callback: QuestionCallback) {
    this.questionForm.className = this.id;
    this.questionForm.id = this.id;

    this.playCorrect.src = '../../../assets/sounds/correct.mp3';
    this.playCorrect.preload = 'auto';
    this.playIncorrect.src = '../../../assets/sounds/incorrect.mp3';
    this.playIncorrect.preload = 'auto';
  }

  playAnswer(answer: boolean): void {
    if (answer) {
      this.playCorrect.play();
    } else {
      this.playIncorrect.play();
    }
  }

  render(question: ISprintQuestion) {
    this.questionForm.innerHTML = '';
    const questionHTML = document.createElement('div');
    questionHTML.className = 'question';
    questionHTML.innerText = question.word;

    const answerHTML = document.createElement('div');
    answerHTML.className = 'answer';
    answerHTML.innerText = question.wordTranslate;

    const buttonsContainer = document.createElement('div');

    const onAnswer = (answer: boolean) => {
      this.playAnswer(answer);
      this.callback(answer);
    };

    const keyboardListener = (event: KeyboardEvent) => {
      if (event.code === 'ArrowLeft') {
        onAnswer(question.answer);
        this.questionForm.removeEventListener('keyup', keyboardListener);
      } else if (event.code === 'ArrowRight') {
        this.questionForm.removeEventListener('keyup', keyboardListener);
        onAnswer(!question.answer);
      }
      this.questionForm.focus();
    };

    const rightButton = new QuestionButton('right').render();
    const wrongButton = new QuestionButton('wrong').render();

    buttonsContainer.className = 'question-buttons';
    buttonsContainer.append(rightButton, wrongButton);
    rightButton.onclick = () => {
      wrongButton.disabled = true;
      rightButton.disabled = true;
      onAnswer(question.answer);
      this.questionForm.removeEventListener('keyup', keyboardListener);
    };
    wrongButton.onclick = () => {
      rightButton.disabled = true;
      wrongButton.disabled = true;
      onAnswer(!question.answer);
      this.questionForm.removeEventListener('keyup', keyboardListener);
    };

    this.questionForm.tabIndex = -1;

    this.questionForm.addEventListener('keyup', keyboardListener);

    this.questionForm.append(questionHTML, answerHTML, buttonsContainer);
    return this.questionForm;
  }
}
export default QuestionsForm;
