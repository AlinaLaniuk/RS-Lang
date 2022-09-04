import { Chart, registerables } from 'chart.js';
import Footer from '../components/footer';
import { PageIds } from '../constants';
import StatsAPI from '../services/stats';
import {
  IComponent,
  IGameStat,
  IStats,
  ITotalLearnedStat,
} from '../types/interfaces';
import './stats.style.css';

class StatsPage implements IComponent {
  private page: HTMLDivElement;

  private footer = new Footer();

  constructor(id: PageIds) {
    this.page = document.createElement('div');
    this.page.id = id;
  }

  render() {
    const autorizationBtn = document.querySelector('.button-wrapper');
    if (autorizationBtn) {
      autorizationBtn.remove();
    }
    this.getStats();
    return this.page;
  }

  private async getStats() {
    const response = await new StatsAPI().getStats();
    const { sprint, audioChallenge, totalWords } = response.optional;
    const currentDate = new Date().toISOString().split('T')[0];
    const lastSprint = Object.values(sprint)[Object.keys(sprint).length - 1];
    const sprintData = currentDate === lastSprint.day ? lastSprint : undefined;
    const sprintBlock = this.gameBlock('Sprint', sprintData);

    const lastChallenge = Object.values(audioChallenge)[Object.keys(audioChallenge).length - 1];
    const challengeData = currentDate === lastChallenge.day ? lastChallenge : undefined;
    const challengeBlock = this.gameBlock('Audio challenge', challengeData);

    const lastDay = Object.values(totalWords)[Object.keys(audioChallenge).length - 1];
    const todayData = currentDate === lastDay.day ? lastDay : undefined;
    const todayBlock = this.todayStatBlock(todayData, sprintData, challengeData);

    const games = document.createElement('div');
    games.className = 'games-wrapper';
    games.innerHTML = todayBlock + sprintBlock + challengeBlock;
    this.page.appendChild(games);
    this.renderCharts(response);
    this.page.appendChild(this.footer.render());
  }

  private gameBlock(name: string, stats?: IGameStat) {
    return `
    <div class='game-block'>
      <h2>${name}</h2>
      <div class='today-stats-in-game'>
        <div class='new-words'>
          <span>${stats ? stats.newWords : 0}</span><span> new words</span>
        </div>
        <div class='best-result'>
          <span>${stats ? stats.longestSeries : 0}</span><span> best series</span>
        </div>
        <div class='correct-answers'>
          <span>${stats ? stats.percentCorrectAnswers : 0}%</span><span> correct answers</span>
        </div>
      </div>
    </div>
    `;
  }

  private todayStatBlock(todayData?: ITotalLearnedStat, sprint?: IGameStat, challenge?: IGameStat) {
    const sprintWords = sprint ? sprint.newWords : 0;
    const challengeWords = challenge ? challenge.newWords : 0;
    let procent;
    if (sprint && challenge) {
      procent = sprint.percentCorrectAnswers + challenge.percentCorrectAnswers / 2;
    } else if (sprint) {
      procent = sprint.percentCorrectAnswers;
    } else if (challenge) {
      procent = challenge.percentCorrectAnswers;
    } else {
      procent = 0;
    }
    return `
    <div class='today-block'>
      <h2>Today stats</h2>
      <div class='today-stats'>
        <div class='new-words'>
          <span>${sprintWords + challengeWords}</span><span> new words</span>
        </div>
        <div class='learned-words'>
          <span>${todayData ? todayData.learned : 0}</span><span> learned words</span>
        </div>
        <div class='correct-answers'>
          <span>${procent}%</span><span> correct answers</span>
        </div>
      </div>
    </div>
    `;
  }

  private renderCharts(stats: IStats) {
    const chartsWrapper = document.createElement('div');
    const canvas = '<canvas id="newWordsChart" width="400" height="400"></canvas><canvas id="totalWordsChart" width="400" height="400"></canvas>';
    chartsWrapper.className = 'charts-wrapper';
    chartsWrapper.innerHTML = canvas;
    this.page.appendChild(chartsWrapper);

    const lastDates:Array<number> = [];
    for (let i = 0; i < 10; i += 1) {
      lastDates.unshift(new Date().setDate(new Date().getDate() - i));
    }
    const strDates:Array<string> = lastDates.map((el) => new Date(el).toISOString().split('T')[0]);
    const defaultData:Array<number> = Array(10).fill(0);
    Object.values(stats.optional.sprint).forEach((el) => {
      const { day, newWords } = el;
      if (strDates.includes(day)) {
        defaultData.splice(strDates.indexOf(day), 1, newWords);
      }
    });

    Object.values(stats.optional.audioChallenge).forEach((el) => {
      const { day, newWords } = el;
      if (strDates.includes(day)) {
        const sum = defaultData[strDates.indexOf(day)] + newWords;
        defaultData.splice(strDates.indexOf(day), 1, sum);
      }
    });

    const totalLearned:Array<number> = Array(10).fill(0);
    Object.values(stats.optional.totalWords).forEach((el) => {
      const { day, learned } = el;
      if (strDates.includes(day)) {
        totalLearned.splice(strDates.indexOf(day), 1, learned);
      }
    });
    let temp = 0;
    totalLearned.reverse().forEach((el, index) => {
      if (index === 0) {
        temp = el;
        totalLearned.splice(index, 1, stats.learnedWords);
      } else {
        const current = totalLearned[index - 1] - temp;
        temp = el;
        totalLearned.splice(index, 1, current);
      }
    });

    this.drawChart(strDates, defaultData, 'New words');
    this.drawChart(strDates, totalLearned.reverse(), 'Total learned');
  }

  private drawChart(lastDates: Array<string>, data: Array<number>, label: string) {
    const type = label === 'New words' ? 'newWordsChart' : 'totalWordsChart';
    const ctx = (document.getElementById(type) as HTMLCanvasElement).getContext('2d') as CanvasRenderingContext2D;

    Chart.register(...registerables);
    return new Chart(ctx, {
      type: 'line',
      data: {
        labels: lastDates,
        datasets: [{
          label,
          backgroundColor: 'rgb(255, 255, 255)',
          borderColor: '#7AA999',
          data,
        }],
      },
      options: {
        scales: {
          y: {
            ticks: {
              stepSize: 1,
            },
          },
        },
      },
    });
  }
}

export default StatsPage;
