import AutorizationController from '../../autorization/autorization.controller';
import AutorizationModel from '../../autorization/autorization.model';
import { PageIds } from '../../constants';
import './games.css';

class GamesPage {
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
    const sprint = document.createElement('a');
    sprint.id = 'sprint';
    sprint.className = 'game-button';
    sprint.href = `#${PageIds.SprintPage}`;

    const sprintIcon = document.createElement('div');
    sprintIcon.className = 'icon sprint';
    sprint.append(sprintIcon);

    const sprintLabel = document.createElement('span');
    sprintLabel.className = 'label';
    sprintLabel.innerText = 'Sprint';
    sprint.append(sprintLabel);

    const challenge = document.createElement('a');
    challenge.id = 'challenge';
    challenge.className = 'game-button';
    challenge.href = `#${PageIds.ChallengePage}`;

    const challengeIcon = document.createElement('div');
    challengeIcon.className = 'icon challenge';
    challenge.append(challengeIcon);

    const challengeLabel = document.createElement('span');
    challengeLabel.className = 'label challenge';
    challengeLabel.innerText = 'Audio challenge';
    challenge.append(challengeLabel);

    this.page.append(sprint, challenge);
    this.page.className = 'games';
    return this.page;
  }
}

export default GamesPage;
