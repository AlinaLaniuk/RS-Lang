class LevelHeader {
  private levelHeader: HTMLDivElement;

  constructor(header: string) {
    this.levelHeader = document.createElement('div');
    this.levelHeader.className = 'game-header';
    this.levelHeader.innerText = header;
  }

  render(): HTMLElement {
    return this.levelHeader;
  }
}

export default LevelHeader;
