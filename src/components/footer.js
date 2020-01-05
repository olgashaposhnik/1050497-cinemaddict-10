import {createElement} from '../mock//utils.js';

// const createFooter = (filmСards) => {
//   return (
//     `
//     <section class="footer__logo logo logo--smaller">Cinemaddict</section>
//     <section class="footer__statistics">
//     <p>${filmСards.length} movies inside</p>
//     </section>
//   `
//   );
// };

export default class Footer {
  constructor(filmСards) {
    this._filmСards = filmСards;

    this._element = null;
  }

  getTemplate() {
    return (
      `
      <section class="footer__logo logo logo--smaller">Cinemaddict</section>
      <section class="footer__statistics">
      <p>${this._length} movies inside</p>
      </section>
    `
    ).trim();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
