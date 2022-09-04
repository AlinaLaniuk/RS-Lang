import { getWords } from '../../services/words-api';
import ChallengeQuestions from '../model/challenge-questions';
import GameStat from '../../utils/game-stat';
import View from '../view/view';

class ChallengeController {
  private score = 0;

  private questions = new ChallengeQuestions();

  private gameStats = new GameStat('audioChallenge');

  private answerHandler = (answer: boolean) => {
    if (answer) {
      this.score += 1;
    }
    this.gameStats.addAnswer(this.questions.currentWord, answer);
    this.view.setScore(this.score);

    const question = this.questions.next();
    if (question.hasNext) {
      this.view.renderQuestionForm(question);
    } else {
      this.gameOverHandler();
    }
  };

  private gameOverHandler = async () => {
    this.view.gameOver({
      points: this.score,
      rights: this.gameStats.rights,
      wrongs: this.gameStats.wrongs,
    });

    this.gameStats.sendStats();
  };

  private view = new View(this.answerHandler, this.gameOverHandler);

  async launch(group: number, page?: number): Promise<void> {
    this.view.renderLoadModal();
    const words = await getWords(group, page);
    this.questions.addWords(words, !page);
    this.view.render(this.questions.next());
  }
}

export default ChallengeController;
