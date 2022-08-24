import AutorizationModel from './autorization.model';

class AutorizationController {
  public listenLoginButton = () => {
    const button = document.getElementById('login-button') as HTMLButtonElement;
    button.addEventListener('click', () => {
      new AutorizationModel().drawModal();
      this.listenCloseModal();
      this.listenLogin();
      this.listenRegister();
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

  public listenRegister = () => {
    const button = document.getElementById('sign-up') as HTMLInputElement;
    const name = document.getElementById('reg-name') as HTMLInputElement;
    const email = document.getElementById('reg-email') as HTMLInputElement;
    const password = document.getElementById('reg-pass') as HTMLInputElement;
    button.addEventListener('click', () => {
      new AutorizationModel().register({
        name: name.value,
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
