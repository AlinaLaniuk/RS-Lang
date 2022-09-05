import { Callback } from '../types/types';

class CloseButton {
  private button = document.createElement('button');

  constructor(id: string, callback?: Callback) {
    this.button.className = 'close-button';

    this.button.addEventListener('click', () => {
      document.getElementById(id)?.remove();
      if (callback) callback();
    });
  }

  render() {
    return this.button;
  }
}

export default CloseButton;
