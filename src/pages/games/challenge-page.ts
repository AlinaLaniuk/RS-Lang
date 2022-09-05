import './games.css';
import LevelHeader from './components/level-header';
import LevelButton from './components/level-button';
import ChallengeController from './challenge/controller/controller';
import { PageIds } from '../../constants';
import { getRange } from './utils/functions';

class ChallengePage {
  private page: HTMLDivElement;

  private header = new LevelHeader('Выберите уровень');

  constructor(id: PageIds) {
    this.page = document.createElement('div');
    this.page.className = 'game-container';
    this.page.id = id;
  }

  private levelButtonHandler(level: number) {
    const controller = new ChallengeController();
    controller.launch(level);
  }

  render() {
    const buttons = document.createElement('div');
    buttons.className = 'buttons-container';
    const buttonsArray = getRange(6).map((index) => {
      const btn = new LevelButton(index, () => this.levelButtonHandler(index));
      return btn.render();
    });
    buttons.append(...buttonsArray);
    this.page.append(this.header.render(), buttons);

    return this.page;
  }
}

export default ChallengePage;
