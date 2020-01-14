import {generateProfileRating} from '../mock/user-profile.js';
import AbstractComponent from './abstract-component.js';

export default class HeaderProfile extends AbstractComponent {
  constructor(rating) {
    super();
    this._rating = rating;
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
}
