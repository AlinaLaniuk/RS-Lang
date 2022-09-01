import './games.css';
import LevelHeader from './components/level-header';
import LevelButton from './components/level-button';
import SprintController from './sprint/controller/controller';
import { PageIds } from '../../constants';

class SprintPage {
  private page: HTMLDivElement;

  private header = new LevelHeader('Выберите уровень');

  constructor(id: PageIds) {
    this.page = document.createElement('div');
    this.page.className = 'game-container';
    this.page.id = id;
  }

  private levelButtonHandler(level: number) {
    const controller = new SprintController();
    controller.launch(level);
  }

  render() {
    const buttons = document.createElement('div');
    buttons.className = 'buttons-container';
    const buttonsArray = [...Array(6).keys()].map((index) => {
      const btn = new LevelButton(index, () => this.levelButtonHandler(index));
      return btn.render();
    });
    buttons.append(...buttonsArray);
    this.page.append(this.header.render(), buttons);

    return this.page;
  }
}

export default SprintPage;
