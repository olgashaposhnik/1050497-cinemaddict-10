import {createElement} from '../mock//utils.js';

export default class Comments {
  constructor(items) {
    this._items = items;

    this._element = null;
  }

  getTemplate() {
    return this._items
    .map((item) => {
      return (
        `<li class="film-details__comment">
              <span class="film-details__comment-emoji">
                <img src="${item.emoji}" width="55" height="55" alt="emoji">
              </span>
              <div>
                <p class="film-details__comment-text">${item.text}</p>
                <p class="film-details__comment-info">
                  <span class="film-details__comment-author">${item.author}</span>
                  <span class="film-details__comment-day">${item.date}</span>
                  <button class="film-details__comment-delete">Delete</button>
                </p>
              </div>
            </li>`
      );
    })
    .join(``).trim();
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
