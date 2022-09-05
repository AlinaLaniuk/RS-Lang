import './style.css';

class LoadModal {
  private loadModal = document.createElement('div');

  id = 'load-modal';

  constructor() {
    this.loadModal.id = this.id;
    this.loadModal.className = 'load-modal';

    const spinner = document.createElement('div');
    spinner.className = 'load-spinner';
    this.loadModal.append(spinner);
  }

  render(): HTMLDivElement {
    return this.loadModal;
  }
}

export default LoadModal;
