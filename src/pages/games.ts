import { PageIds } from '../constants';
import { IComponent } from '../types/interfaces';

class Games implements IComponent {
  private page: HTMLDivElement;

  constructor(id: PageIds) {
    this.page = document.createElement('div');
    this.page.id = id;
    this.page.innerText = id;
  }

  render() {
    return this.page;
  }
}

// const stats = {
//   learnedWords: 0,
//   optional: {
//     sprint: {
//       0: {
//         day: '2022-08-23',
//         newWords: "['34g34gdgfgfd','dfgdgf34']",
//         percentCorrectAnswers: 32,
//         longestSeries: 20,
//       },
//     },
//     audioChallenge: {},
//     totalWords: {
//       0: {
//         day: '121212'[Symbol]
//       }
//     },
//   },
// };

export default Games;
