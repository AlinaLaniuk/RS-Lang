import AutorizationModel from '../autorization/autorization.model';
import { NavigationButtons } from '../constants';
import { IComponent } from '../types/interfaces';
import './nav.style.css';

class Nav implements IComponent {
  private nav = document.createElement('div');

  constructor() {
    this.nav.className = 'nav';
  }

  private renderNavButtons(): void {
    const navButtons = document.createElement('div');
    navButtons.className = 'nav-buttons-wrapper';
    const auth = new AutorizationModel().isLogedIn();
    const buttons = auth ? NavigationButtons : NavigationButtons.filter((el) => el.text !== 'Stats');
    buttons.forEach((btn) => {
      const btnHTML = document.createElement('a');
      const img = document.createElement('img');
      img.src = `${btn.img}`;
      btnHTML.href = `#${btn.id}`;
      btnHTML.innerText = btn.text;
      btnHTML.appendChild(img);
      navButtons.append(btnHTML);
    });

    this.nav.append(navButtons);
  }

  render(): HTMLDivElement {
    this.renderNavButtons();
    return this.nav;
  }
}

export default Nav;
