import { PageIds } from '../constants';
import { IComponent } from '../types/interfaces';

class MainPage implements IComponent {
  private page: HTMLDivElement;

  constructor(id: PageIds) {
    this.page = document.createElement('div');
    this.page.id = id;
    this.page.innerText = id;
  }

  render() {
    window.location.hash = PageIds.MainPage;
    return this.page;
  }
}

export default MainPage;
