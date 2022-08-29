import AutorizationModel from '../autorization/autorization.model';
import { NavigationButtons } from '../constants';
import { IComponent } from '../types/interfaces';

class Nav implements IComponent {
  private nav = document.createElement('div');

  constructor() {
    this.nav.className = 'nav';
  }

  private renderNavButtons(): void {
    const navButtons = document.createElement('div');
    const auth = new AutorizationModel().isLogedIn();
    const buttons = auth ? NavigationButtons : NavigationButtons.filter((el) => el.text !== 'Stats');
    buttons.forEach((btn) => {
      const btnHTML = document.createElement('a');
      btnHTML.href = `#${btn.id}`;
      btnHTML.innerText = btn.text;
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
