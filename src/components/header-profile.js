import {createElement} from '../mock//utils.js';
import {generateProfileRating} from '../mock/user-profile.js';

export default class HeaderProfile {
  constructor(rating) {
    this._rating = rating;

    this._element = null;
  }

  getTemplate(rating) {
    rating = generateProfileRating();
    return (
      `
      <section class="header__profile profile">
        <p class="profile__rating">${rating}</p>
        <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
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
