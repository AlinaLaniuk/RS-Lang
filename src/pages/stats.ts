import { PageIds } from '../constants';
import StatsAPI from '../services/stats';
import { IComponent, IGameStat, IStats } from '../types/interfaces';
import './stats.style.css';

class StatsPage implements IComponent {
  private page: HTMLDivElement;

  constructor(id: PageIds) {
    this.page = document.createElement('div');
    this.page.id = id;
  }

  render() {
    this.getStats();
    return this.page;
  }

  private async getStats() {
    const response = await new StatsAPI().getStats() as IStats;
    const { sprint, audioChallenge } = response.optional;
    const { learnedWords } = response;
    const currentDate = new Date().toISOString().split('T')[0];
    const sprintSeries = response.optional.longestSeries.sprint || 0;
    const lastSprint = Object.values(sprint)[Object.keys(sprint).length - 1];
    const sprintData = currentDate === lastSprint.day ? lastSprint : undefined;
    const sprintBlock = this.gameBlock('Sprint', sprintData, sprintSeries);

    const challengeSeries = response.optional.longestSeries.audioChallenge || 0;
    const lastChallenge = Object.values(audioChallenge)[Object.keys(audioChallenge).length - 1];
    const challengeData = currentDate === lastChallenge.day ? lastChallenge : undefined;
    const challengeBlock = this.gameBlock('Audio challenge', challengeData, challengeSeries);

    const todayBlock = this.todayStatBlock(learnedWords, sprintData, challengeData);

    const games = document.createElement('div');
    games.className = 'games-wrapper';
    games.innerHTML = todayBlock + sprintBlock + challengeBlock;
    this.page.appendChild(games);
  }

  private gameBlock(name: string, stats?: IGameStat, series?: number) {
    return `
    <div class='game-block'>
      <h2>${name}</h2>
      <div class='today-stats-in-game'>
        <div class='new-words'>
          <span>${stats ? stats.newWords : 0}</span><span> new words</span>
        </div>
        <div class='best-result'>
          <span>${series}</span><span> best result</span>
        </div>
        <div class='correct-answers'>
          <span>${stats ? stats.percentCorrectAnswers : 0}%</span><span> correct answers</span>
        </div>
      </div>
    </div>
    `;
  }

  private todayStatBlock(learnedWords: number, sprint?: IGameStat, challenge?: IGameStat) {
    return `
    <div class='today-block'>
      <h2>Today stats</h2>
      <div class='today-stats'>
        <div class='new-words'>
          <span>${(sprint ? sprint.newWords : 0) + (challenge ? challenge.newWords : 0)}</span><span> new words</span>
        </div>
        <div class='learned-words'>
          <span>${learnedWords}</span><span> learned words</span>
        </div>
        <div class='correct-answers'>
          <span>${((sprint ? sprint.percentCorrectAnswers : 0) + (challenge ? challenge.percentCorrectAnswers : 0)) / 2}%</span><span> correct answers</span>
        </div>
      </div>
    </div>
    `;
  }
}

export default StatsPage;
