import AutorizationModel from '../../../../autorization/autorization.model';
import { getWords } from '../../services/words-api';
import { IScore } from '../../types/types';
import { omitLearned } from '../../utils/functions';
import GameStat from '../../utils/game-stat';
import Questions from '../model/questions';
import View from '../view/view';

class SprintController {
  isLoggedIn = new AutorizationModel().isLogedIn();

  private score: IScore = {
    points: 0,
    bonus: 1,
    hits: 0,
  };

  private answerHandler = (answer: boolean) => {
    this.gameStats.addAnswer(this.questions.currentWord, answer);
    this.updateScore(answer);
    this.view.renderScorePanel(this.score);
    const question = this.questions.next();

    setTimeout(() => {
      if (question.hasNext) {
        this.view.renderQuestionForm(question);
      } else {
        this.gameOverHandler();
      }
    }, 2000);
  };

  private gameOverHandler = async () => {
    this.view.gameOver({
      points: this.score.points,
      rights: this.gameStats.rights,
      wrongs: this.gameStats.wrongs,
    });

    this.gameStats.sendStats();
  };

  private view = new View(this.answerHandler, this.gameOverHandler);

  private questions = new Questions();

  private gameStats = new GameStat('sprint');

  async launch(group: number, page?: number): Promise<void> {
    this.view.renderLoadModal();
    let words = await getWords(group, page);
    if (this.isLoggedIn && page) words = await omitLearned(words);

    this.questions.addWords(words, !page);
    this.view.render(
      this.score,
      this.questions.next(),
    );
  }

  private updateScore(answer: boolean) {
    if (answer) {
      this.score.hits += 1;
      if (this.score.hits > 3) {
        this.score.bonus += 1;
        this.score.hits = 0;
      }
      this.score.points += 10 * this.score.bonus;
    } else {
      this.score.hits = 0;
      this.score.bonus = 1;
    }
  }
}

export default SprintController;
