import AutorizationView from './autorization.view';

class AutorizationController {
  public listenLogin = () => {
    const button = document.getElementById('login-button') as HTMLButtonElement;
    button.addEventListener('click', () => {
      new AutorizationView().modal();
      this.listenCloseModal();
    });
  };

  public listenCloseModal = () => {
    const button = document.querySelector('.close-modal') as HTMLSpanElement;
    const modal = document.getElementById('box') as HTMLDivElement;
    button.addEventListener('click', () => {
      modal.remove();
    });
  };
}

export default AutorizationController;
