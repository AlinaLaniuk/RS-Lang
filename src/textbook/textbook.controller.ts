import IWordInfo from '../types/textbook.types';
import TextbookModel from './textbook.model';
import TextbookView from './textbook.view';

const textbookModel = new TextbookModel();
const textbookView = new TextbookView();
class TextbookController {
  currentPage = 1;

  totalPage = 30;

  paginationListener() {
    const paginationPanel = document.body.querySelector('.pagination-wrapper') as HTMLElement;
    paginationPanel.addEventListener('click', (event) => {
      const eventTarget = event.target as HTMLElement;
      const eventTargetContent = eventTarget.innerHTML;
      if (eventTarget.classList.contains('pagination-button')) {
        if (eventTargetContent === 'Next') {
          this.currentPage += 1;
        } else if (eventTargetContent === 'Prev') {
          this.currentPage -= 1;
        } else if (this.currentPage < this.totalPage - 1) {
          this.currentPage = +eventTargetContent;
        }
        this.createPagination(this.currentPage);
        textbookModel.getWordsInfo()
          .then((wordsInfo) => {
            wordsInfo.forEach((wordInfo: IWordInfo) => {
              textbookView.setWordCard(wordInfo);
            });
          });
      }
    });
  }

  createPagination(page: number) {
    const paginationPanel = document.querySelector('.pagination') as HTMLElement;
    let liTag = '';
    let active;
    let beforePage = page - 1;
    let afterPage = page + 1;
    if (afterPage === 31) {
      afterPage = 30;
    }
    if (page > 1) {
      liTag += '<li class="pagination-button frame">Prev</li>';
    }
    if (page > 2) {
      liTag += '<li class="pagination-button frame">1</li>';
      if (page > 3) {
        liTag += '<li class="pagination-button frame">...</li>';
      }
    }
    if (page === this.totalPage) {
      beforePage -= 2;
    } else if (page === this.totalPage - 1) {
      beforePage -= 1;
    }
    if (page === 1) {
      afterPage += 2;
    } else if (page === 2) {
      afterPage += 1;
    }
    for (let pagesBetweenDots = beforePage; pagesBetweenDots <= afterPage; pagesBetweenDots += 1) {
      if (pagesBetweenDots === 0) {
        pagesBetweenDots += 1;
      }
      if (page === pagesBetweenDots) {
        active = 'active';
      } else {
        active = '';
      }
      liTag += `<li class="pagination-button frame ${active}">${pagesBetweenDots}</li>`;
    }
    if (page <= this.totalPage - 1) {
      if (page < this.totalPage - 2) {
        liTag += '<li class="pagination-button frame">...</li>';
      }
      // liTag += `<li class="pagination-button frame">${this.totalPage}</li>`;
    }
    if (page < this.totalPage) {
      liTag += '<li class="pagination-button frame">Next</li>';
    }
    paginationPanel.innerHTML = liTag;
    return liTag;
  }
}
export default TextbookController;
