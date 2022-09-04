class Points {
  private points = document.createElement('div');

  id = 'points';

  constructor() {
    this.points.className = 'points';
    this.points.id = this.id;
  }

  render(counts: number) {
    this.points.innerText = counts.toString();
    return this.points;
  }
}

export default Points;
