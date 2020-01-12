import AbstractComponent from './abstract-component.js';

export default class Footer extends AbstractComponent {
  constructor(filmСards) {
    super();

    this._filmСards = filmСards;
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
}
