import AutorizationController from '../autorization/autorization.controller';
import AutorizationModel from '../autorization/autorization.model';
import Footer from '../components/footer';
import { PageIds } from '../constants';
import { IComponent } from '../types/interfaces';
import './main.style.css';

class MainPage implements IComponent {
  private page: HTMLDivElement;

  private footer = new Footer();

  constructor(id: PageIds) {
    this.page = document.createElement('div');
    this.page.id = id;
  }

  render() {
    window.location.hash = PageIds.MainPage;
    const autorized = new AutorizationModel().isLogedIn();
    if (autorized) {
      new AutorizationController().listenLogoutButton();
    } else {
      new AutorizationController().listenLoginButton();
    }
    this.renderMainInfo();
    this.renderPossibilities();
    this.renderTutorial();
    this.renderTeam();
    this.page.appendChild(this.footer.render());
    return this.page;
  }

  renderMainInfo() {
    const html = `
      <div class="main-info-text">
      <div class="main-label"><h1>RS Lang</h1></div>
        <p class="main-info-description">Learning English has never been so easy. Memorizing English words can be fun and chellenging. Play games, listen to pronunciation, improve your knowledge. With our app, learning is a joy.</p>
      </div>
      <div class="main-info-img">
        <img
        src="/assets/img/imf-for-main.svg"
        />
      </div>`;
    const root = document.createElement('div');
    root.id = 'main-info-wrapper';
    root.innerHTML = html;
    this.page.appendChild(root);
  }

  renderPossibilities() {
    const html = `
      <hr>
      <h1>Welcome to RS Lang</h1>
      <div class="feature-wrapper">
        <div class="feature">
          <img src="/assets/img/textbook.svg"></img>
          <h3>Textbook</h3>
          <p>The electronic textbook consists of six sections. Each section has 30 pages of 20 words. The tfanslation of the word, the thematic image, as well as the pronunciation of both the word separately and as part of the phase are presente.</p>
        </div>
        <div class="feature">
          <img src="/assets/img/pen.svg"></img>
          <h3>Dictionary</h3>
          <p>The dictionary contains lists of studied words, words that do not need to be learned, as well as those that cause difficulties. The dictionary reflects statistics for each section and stadent progress.</p>
        </div>
        <div class="feature">
          <img src="/assets/img/game-pad.svg"></img>
          <h3>Games</h3>
          <p>For learning words and reinforcing memorization, the application has 2 games: Sprint and Audio chellenge, which will help you to "pump" your vocabulary in a playful way.</p>
        </div>
        <div class="feature">
          <img src="/assets/img/statistics.svg"></img>
          <h3>Statistics</h3>
          <p>All the progress of training can be viewed in statistics, where data for the current day, as well as for the entire training period, are presented. The information is presented both in the form of a table and graphs, which is very convenient.</p>
        </div>
      </div>`;
    const root = document.createElement('div');
    root.id = 'main-possibilities-wrapper';
    root.innerHTML = html;
    this.page.appendChild(root);
  }

  renderTutorial() {
    const html = `
      <hr>
      <h1>Developer's team</h1>
      <div class="team-wrapper">
        <div class="coworker">
          <img class="coworker-avatar" src="/assets/img/alina.png"></img>
          <div class="coworker-role">
            <h3>Team lead</h3>
            <a class="github-button" href="https://github.com/AlinaLaniuk">
              <svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="github" class="svg-inline--fa fa-github fa-w-16 " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512"><path fill="currentColor" d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"></path></svg>
              Alina
            </a>
            <p>Design development, TextBook page.</p>
          </div>
        </div>
        <div class="coworker">
          <img class="coworker-avatar" src="/assets/img/alibek.png"></img>
          <div class="coworker-role">
            <h3>Developer</h3>
            <a class="github-button" href="https://github.com/aapanasov">
              <svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="github" class="svg-inline--fa fa-github fa-w-16 " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512"><path fill="currentColor" d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"></path></svg>
              Alibek
            </a>
            <p>Project architecture, configuration, Sprint game, Audiochallendge game</p>
          </div>
        </div>
        <div class="coworker">
          <img class="coworker-avatar" src="/assets/img/dima.png"></img>
          <div class="coworker-role">
            <h3>Developer</h3>
            <a class="github-button" href="https://github.com/Liirus91">
              <svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="github" class="svg-inline--fa fa-github fa-w-16 " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512"><path fill="currentColor" d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"></path></svg>
              Dmitry
            </a>
            <p>Backend, autorization, main page, statistics.</p>

          </div>
        </div>
      </div>
      <hr>`;
    const root = document.createElement('div');
    root.id = 'main-team-wrapper';
    root.innerHTML = html;
    this.page.appendChild(root);
  }

  renderTeam() {
    const html = `
      <hr>
      <h1>How to use</h1>
      <div class="video-wrapper">
       
      </div>`;
    const root = document.createElement('div');
    root.id = 'main-video-wrapper';
    root.innerHTML = html;
    this.page.appendChild(root);
  }
}

export default MainPage;
