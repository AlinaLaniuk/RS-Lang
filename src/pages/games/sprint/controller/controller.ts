import { getWords } from '../../services/words-api';
import { IScore } from '../../types/types';
import GameStat from '../model/game-stat';
import Questions from '../model/questions';
import View from '../view/view';

class SprintController {
  private score: IScore = {
    points: 0,
    bonus: 1,
    hits: 0,
  };

  private answerHandler = (answer: boolean) => {
    this.gameStat.addAnswer(this.questions.currentWord, answer);
    this.updateScore(answer);
    this.view.renderScorePanel(this.score);
    const question = this.questions.next();

    if (question.hasNext) {
      setTimeout(() => {
        this.view.renderQuestionForm(question);
      }, 1400);
    } else {
      this.gameOverHandler();
    }
  };

  private gameOverHandler = async () => {
    this.view.gameOver({
      points: this.score.points,
      rights: this.gameStat.rights,
      wrongs: this.gameStat.wrongs,
    });
  };

  private view = new View(this.answerHandler, this.gameOverHandler);

  private questions = new Questions();

  private gameStat = new GameStat();

  async launch(group: number, page?: number): Promise<void> {
    this.view.renderLoadModal();
    const words = await getWords(group, page);
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
