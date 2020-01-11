import {createElement} from '../mock//utils.js';

export default class Footer {
  constructor(filmСards) {
    this._filmСards = filmСards;

    this._element = null;
  }

  getTemplate() {
    return (
      `
      <footer class="footer">
      <section class="footer__logo logo logo--smaller">Cinemaddict</section>
      <section class="footer__statistics">
      <p>${this._filmСards.length} movies inside</p>
      </section>
      </footer>
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
