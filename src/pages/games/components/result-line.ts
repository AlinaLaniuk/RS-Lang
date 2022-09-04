import { API_URL } from '../../../constants';

interface IResulTLine {
  sound: string
  word: string
  translate: string
}

class ResultLine {
  private line = document.createElement('div');

  constructor(line: IResulTLine) {
    this.line.className = 'result-line';
    const audio = document.createElement('audio');
    audio.src = API_URL + line.sound;
    audio.preload = 'auto';

    const playIcon = document.createElement('div');
    playIcon.className = 'play-icon';
    playIcon.addEventListener('click', () => audio.play());

    const word = document.createElement('div');
    word.className = 'result-word';
    word.innerText = `${line.word} `;

    const translate = document.createElement('div');
    translate.className = 'result-translate';
    translate.innerText = `- ${line.translate}`;

    this.line.append(playIcon, word, translate);
  }

  render() {
    return this.line;
  }
}

export default ResultLine;
