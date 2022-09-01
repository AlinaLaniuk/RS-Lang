import Hit from './hit';

class Hits {
  private hits = document.createElement('div');

  id = 'hits';

  constructor() {
    this.hits.id = this.id;
    this.hits.className = this.id;
  }

  render(count: number) {
    this.hits.innerHTML = '';
    const hit1 = new Hit(count > 0);
    const hit2 = new Hit(count > 1);
    const hit3 = new Hit(count > 2);
    this.hits.append(hit1.render(), hit2.render(), hit3.render());
    return this.hits;
  }
}

export default Hits;
