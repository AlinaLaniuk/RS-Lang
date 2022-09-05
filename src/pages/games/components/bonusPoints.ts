class BonusPoints {
  private bonusPoints = document.createElement('div');

  id = 'bonus-points';

  constructor() {
    this.bonusPoints.className = 'bonus-points';
    this.bonusPoints.id = this.id;
  }

  render(count: number) {
    this.bonusPoints.innerText = `+${count * 10} очков`;
    return this.bonusPoints;
  }
}

export default BonusPoints;
