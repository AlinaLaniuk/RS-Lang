class ChallengeQuestionButton {
  button: HTMLButtonElement;

  id: string;

  constructor(label?: string) {
    this.button = document.createElement('button');
    this.button.className = 'challenge-answers-button';
    this.id = this.button.id;
    this.button.innerText = label ?? '';
  }

  render() {
    return this.button;
  }
}

export default ChallengeQuestionButton;
