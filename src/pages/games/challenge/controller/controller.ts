import { getWords } from '../../services/words-api';
import ChallengeQuestions from '../model/challenge-questions';
import GameStat from '../../utils/game-stat';
import View from '../view/view';
import { omitLearned } from '../../utils/functions';
import AutorizationModel from '../../../../autorization/autorization.model';

class ChallengeController {
  isLoggedIn = new AutorizationModel().isLogedIn();

  private questionNumber = 0;

  private questions = new ChallengeQuestions();

  private gameStats = new GameStat('audioChallenge');

  private answerHandler = (answer: boolean) => {
    this.questionNumber += 1;

    this.gameStats.addAnswer(this.questions.currentWord, answer);
    this.view.setScore(this.questionNumber);

    const question = this.questions.next();
    if (question.hasNext) {
      this.view.renderQuestionForm(question);
    } else {
      this.gameOverHandler();
    }
  };

  private gameOverHandler = async () => {
    this.view.gameOver({
      points: this.questionNumber,
      rights: this.gameStats.rights,
      wrongs: this.gameStats.wrongs,
    });

    this.gameStats.sendStats();
  };

  private view = new View(this.answerHandler, this.gameOverHandler);

  async launch(group: number, page?: number): Promise<void> {
    this.view.renderLoadModal();
    let words = await getWords(group, page);
    if (this.isLoggedIn && page) words = await omitLearned(words);

    this.questions.addWords(words, !page);
    this.view.render(this.questions.next());
  }
}

export default ChallengeController;
