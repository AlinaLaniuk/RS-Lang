import './autorization.style.css';

class AutorizationView {
  public modal = () => {
    const body = document.querySelector('body') as HTMLBodyElement;
    const html = `
        <div id="box-inner">
        </div>
        <div class="form-wrapper">
        <span class="close-modal">X</span>
        <h3 class="modal-title">Login</h3>
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
              <td>
                <button id="sign-in"> Sign in </button>
                </td>
              <td>
                <button id="sign-up"> Registration </button>
              </td>
            </tr>
          </table>
        </div>`;
    const root = document.createElement('div');
    root.id = 'box';
    root.innerHTML = html;
    body.appendChild(root);
  };

  public loginButton = (isLogedIn: boolean) => {
    const header = document.querySelector('header') as HTMLHeadingElement;
    if (document.getElementById('login-button') as HTMLButtonElement) {
      (document.getElementById('login-button') as HTMLButtonElement).remove();
    }
    const html = `
      <button
        id="login-button"
        class="login-button"
        style="margin-left: calc(100vw - 200px)">
        <span style="display: flex; align-items: center;">
          <img
            src="/assets/img/authorization.svg"
            width="64px"
            height="32px"
            viewBox="0 0 528.37 688.86"
          />
          ${isLogedIn ? 'Logout' : 'SIGN IN | JOIN'}
        </span>
      </button>`;
    const root = document.createElement('div');
    root.innerHTML = html;
    header.appendChild(root);
  };
}

export default AutorizationView;
