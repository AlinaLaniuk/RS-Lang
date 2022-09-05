class QuestionButton {
  button: HTMLButtonElement;

  id: string;

  constructor(label: 'right' | 'wrong') {
    this.button = document.createElement('button');
    this.button.className = `question-button button-${label}`;
    this.button.id = `button-${label}`;
    this.id = this.button.id;
    this.button.innerText = label;
  }

  render() {
    return this.button;
  }
}

export default QuestionButton;
