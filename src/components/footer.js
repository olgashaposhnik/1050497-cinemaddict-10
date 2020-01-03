import {createElement} from '../mock//utils.js';

const createFooter = (filmСards) => {
  return (
    `
    <section class="footer__logo logo logo--smaller">Cinemaddict</section>
    <section class="footer__statistics">
    <p>${filmСards.length} movies inside</p>
    </section>
  `
  );
};

export default class Footer {
  constructor(filmСards) {
    this._filmСards = filmСards;

    this._element = null;
  }

  getTemplate() {
    return createFooter(this._filmСards);
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
