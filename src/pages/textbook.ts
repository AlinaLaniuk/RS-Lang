import { PageIds } from '../constants';
import { IComponent } from '../types/interfaces';
import TextBookController from '../textbook/textbook.controller';
import AutorizationModel from '../autorization/autorization.model';
import AutorizationController from '../autorization/autorization.controller';
import './textbook.style.css';

class Textbook implements IComponent {
  private page: HTMLDivElement;

  constructor(id: PageIds) {
    this.page = document.createElement('div');
    this.page.id = id;
  }

  render() {
    const autorized = new AutorizationModel().isLogedIn();
    if (autorized) {
      new AutorizationController().listenLogoutButton();
    } else {
      new AutorizationController().listenLoginButton();
    }
    window.location.hash = PageIds.TextbookPage;
    const textbookController = new TextBookController(this.page);
    textbookController.launch();
    return this.page;
  }
}

export default Textbook;
