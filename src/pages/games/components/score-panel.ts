import { IScore } from '../types/types';
import BonusPoints from './bonusPoints';
import Hits from './hits';
import Points from './points';

class ScorePanel {
  private scorePanel = document.createElement('div');

  id = 'score-panel';

  private points = new Points();

  private bonusPoints = new BonusPoints();

  private hits = new Hits();

  constructor() {
    this.scorePanel.className = this.id;
    this.scorePanel.id = this.id;
  }

  renderPoints(count: number) {
    this.scorePanel.append(this.points.render(count));
  }

  renderBonus(count: number) {
    this.scorePanel.append(this.bonusPoints.render(count));
  }

  renderHits(count: number) {
    this.scorePanel.append(this.hits.render(count));
  }

  render(score: IScore) {
    this.renderPoints(score.points);
    this.renderBonus(score.bonus);
    this.renderHits(score.hits);
    return this.scorePanel;
  }
}

export default ScorePanel;
