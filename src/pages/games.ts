import { PageIds } from '../constants';
import StatsAPI from '../services/stats';
import { IComponent, IGameStat } from '../types/interfaces';

class Games implements IComponent {
  private page: HTMLDivElement;

  constructor(id: PageIds) {
    this.page = document.createElement('div');
    this.page.id = id;
    this.page.innerText = id;
  }

  render() {
    this.stat();
    return this.page;
  }

  // ниже пример использования, не забудьте удалить и желательно сделать менее убого
  async stat() {
    const prevStat = await new StatsAPI().getStats();
    const sprintStatistic = prevStat.optional.sprint;
    const currentDate = new Date().toISOString().split('T')[0];
    const lastIndex = Object.keys(sprintStatistic)[Object.keys(sprintStatistic).length - 1];

    const current = {
      day: currentDate,
      newWords: 1,
      percentCorrectAnswers: 30,
      longestSeries: 10,
    };

    const defaultData = new Map(Object.entries(sprintStatistic));
    if (defaultData.get(lastIndex)?.day === currentDate) {
      const old = defaultData.get(lastIndex) as IGameStat;
      const { longestSeries } = old;
      const percent = (old.percentCorrectAnswers + current.percentCorrectAnswers) / 2;
      const series = longestSeries > current.longestSeries ? longestSeries : current.longestSeries;
      const newDay = {
        day: old.day,
        newWords: old.newWords + current.newWords,
        percentCorrectAnswers: percent,
        longestSeries: series,
      };

      defaultData.delete(lastIndex);
      defaultData.set(lastIndex, newDay);
    } else {
      defaultData.set((Number(lastIndex) + 1).toString(), current);
    }

    const newStat = {
      learnedWords: prevStat.learnedWords,
      optional: {
        sprint: Object.fromEntries(defaultData),
        audioChallenge: prevStat.optional.audioChallenge,
        totalWords: prevStat.optional.totalWords,
      },
    };
    new StatsAPI().setStats(newStat);
  }
}

export default Games;
