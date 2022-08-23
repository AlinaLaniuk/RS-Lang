import MainPage from '../pages/main';
import TextbookPage from '../pages/textbook';
import GamesPage from '../pages/games';
import StatsPage from '../pages/stats';
import { PageIds } from '../constants';
import Nav from '../components/nav';
import { IComponent } from '../types/interfaces';

class App {
  private static container: HTMLElement = document.body;

  private static defaultPageId = 'main';

  private nav = new Nav();

  static renderPage(id: PageIds) {
    const currentPageHTML = document.getElementById(App.defaultPageId);

    if (currentPageHTML) {
      currentPageHTML.remove();
    }

    let page: IComponent;

    switch (id) {
      case 'main':
        page = new MainPage(id);
        break;

      case 'textbook':
        page = new TextbookPage(id);
        break;

      case 'games':
        page = new GamesPage(id);
        break;

      case 'stats':
        page = new StatsPage(id);
        break;

      default:
        page = new MainPage(id);
        break;
    }

    App.defaultPageId = id;
    App.container.append(page.render());
  }

  private enableRouteChange() {
    window.addEventListener('hashchange', () => {
      const hash = window.location.hash.slice(1) as PageIds;
      App.renderPage(hash);
    });
  }

  run() {
    window.location.hash = PageIds.MainPage;
    App.container.append(this.nav.render());
    App.renderPage(PageIds.MainPage);
    this.enableRouteChange();
  }
}

export default App;
