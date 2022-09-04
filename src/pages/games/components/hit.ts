class Hit {
  hit: HTMLDivElement;

  constructor(active: boolean) {
    this.hit = document.createElement('div');
    this.hit.className = active ? 'hit true' : 'hit';
  }

  render() {
    return this.hit;
  }
}

export default Hit;
