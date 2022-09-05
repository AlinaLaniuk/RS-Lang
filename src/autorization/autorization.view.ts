import './autorization.style.css';

class AutorizationView {
  public modal = () => {
    const body = document.querySelector('body') as HTMLBodyElement;
    const html = `
        <div id="box-inner">
        </div>
        <div class="form-wrapper">
          <div class="tabs">
            <input type="radio" name="tab-btn" id="tab-btn-1" value="" checked>
            <label for="tab-btn-1">Login</label>
            <input type="radio" name="tab-btn" id="tab-btn-2" value="">
            <label for="tab-btn-2">Registration</label>
            <div id="content-login">
              ${this.loginContent()}
            </div>
            <div id="content-registration">
              ${this.registrationContent()}
            </div>
          </div>
          <span class="close-modal">X</span>
        </div>`;
    const root = document.createElement('div');
    root.id = 'box';
    root.innerHTML = html;
    body.appendChild(root);
  };

  public loginButton = (isLogedIn: boolean) => {
    const header = document.querySelector('header') as HTMLHeadingElement;
    const autorizationBtn = document.querySelector('.button-wrapper') as HTMLDivElement;
    if (autorizationBtn) {
      autorizationBtn.remove();
    }
    const html = `
      <button
        id="login-button"
        class="login-button"
        style="margin-left: calc(100vw - 200px)">
        <span style="display: flex; align-items: center;">
          <img
            src="./assets/img/authorization.svg"
            width="32px"
            height="32px"
            viewBox="0 0 528.37 688.86"
          />
          ${isLogedIn ? 'Logout' : 'SIGN IN | JOIN'}
        </span>
      </button>`;
    const root = document.createElement('div');
    root.className = 'button-wrapper';
    root.innerHTML = html;
    header.appendChild(root);
  };

  private loginContent = (): string => `
  <table>
    <tr>
      <td>Email</td>
      <td>
        <input id="input-email">
      </td>
    </tr>
    <tr>
      <td>Password</td>
      <td>
        <input id="input-pass">
      </td>
    </tr>
    <tr>
      <td colspan="2" id='login-error'></td>
    </tr>
    <tr>
      <td colspan="2">
        <button id="sign-in"> Sign in </button>
      </td>
    </tr>
  </table>`;

  private registrationContent = (): string => `
  <table>
    <tr>
      <td>Name</td>
      <td>
        <input id="reg-name">
      </td>
    </tr>
    <tr>
      <td>Email</td>
      <td>
        <input id="reg-email">
      </td>
    </tr>
    <tr>
      <td>Password</td>
      <td>
        <input id="reg-pass">
      </td>
    </tr>
    <tr>
      <td colspan="2" id='register-error'></td>
    </tr>
    <tr>
      <td colspan="2">
        <button id="sign-up"> Sign up </button>
      </td>
    </tr>
  </table>`;
}

export default AutorizationView;
