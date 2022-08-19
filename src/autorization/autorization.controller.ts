import AutorizationModel from './autorization.model';

class AutorizationController {
  public listenLoginButton = () => {
    const button = document.getElementById('login-button') as HTMLButtonElement;
    button.addEventListener('click', () => {
      new AutorizationModel().drawModal();
      this.listenCloseModal();
      this.listenLogin();
    });
  };

  public listenCloseModal = () => {
    const button = document.querySelector('.close-modal') as HTMLSpanElement;
    button.addEventListener('click', () => {
      new AutorizationModel().closeModal();
    });
  };

  public listenLogin = () => {
    const button = document.getElementById('sign-in') as HTMLInputElement;
    const email = document.getElementById('input-email') as HTMLInputElement;
    const password = document.getElementById('input-pass') as HTMLInputElement;
    button.addEventListener('click', () => {
      new AutorizationModel().login({
        email: email.value,
        password: password.value,
      });
    });
  };

  public listenLogoutButton = () => {
    const button = document.getElementById('login-button') as HTMLButtonElement;
    button.addEventListener('click', () => {
      new AutorizationModel().logout();
    });
  };
}

export default AutorizationController;
