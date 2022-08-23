import { NavigationButtons } from '../constants';
import { IComponent } from '../types/interfaces';

class Nav implements IComponent {
  private nav = document.createElement('div');

  constructor() {
    this.nav.className = 'nav';
  }

  private renderNavButtons(): void {
    const navButtons = document.createElement('div');
    NavigationButtons.forEach((btn) => {
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
