import { PageIds } from '../constants';
import { IComponent } from '../types/interfaces';

class Games implements IComponent {
  private page: HTMLDivElement;

  constructor(id: PageIds) {
    this.page = document.createElement('div');
    this.page.id = id;
    this.page.innerText = id;
  }

  render() {
    return this.page;
  }
}

export default Games;
