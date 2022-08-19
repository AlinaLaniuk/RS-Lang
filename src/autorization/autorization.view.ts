import './autorization.style.css';

class AutorizationView {
  public modal = () => {
    const body = document.querySelector('body') as HTMLBodyElement;
    const html = `
        <div id="box-inner">
        </div>
        <form>
        <span class="close-modal">X</span>
        <h3 class="modal-title">Login</h3>
          <table>
            <tr>
              <td>Email</td>
              <td>
                <input>
              </td>
            </tr>
            <tr>
              <td>Password</td>
              <td>
                <input>
              </td>
            </tr>
            <tr>
              <td>
                <input type="submit" value="Sign in">
                </td>
              <td>
                <input type="submit" value="Registration">
              </td>
            </tr>
          </table>
        </form>`;
    const root = document.createElement('div');
    root.id = 'box';
    root.innerHTML = html;
    body.appendChild(root);
  };
}

export default AutorizationView;
