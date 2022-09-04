import { Callback } from '../types/types';

class LevelButton {
  private levelButton: HTMLButtonElement;

  constructor(private level: number, private callback: Callback) {
    this.levelButton = document.createElement('button');
    this.levelButton.id = `level-button${this.level + 1}`;
    this.levelButton.className = `button level-${level + 1}`;
    this.levelButton.innerText = `Level ${this.level + 1}`;
    this.levelButton.addEventListener('click', callback);
  }

  render(): HTMLElement {
    return this.levelButton;
  }
}

export default LevelButton;
