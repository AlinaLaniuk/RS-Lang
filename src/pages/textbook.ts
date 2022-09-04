import { PageIds } from '../constants';
import { IComponent } from '../types/interfaces';
import TextBookController from '../textbook/textbook.controller';

class Textbook implements IComponent {
  private page: HTMLDivElement;

  constructor(id: PageIds) {
    this.page = document.createElement('div');
    this.page.id = id;
    this.page.innerText = id;
  }

  render() {
    window.location.hash = PageIds.TextbookPage;
    const textbookController = new TextBookController();
    textbookController.launch();
    return this.page;
  }
}

export default Textbook;
