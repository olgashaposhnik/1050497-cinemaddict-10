import AbstractComponent from './abstract-component.js';

export default class FilmCard extends AbstractComponent {
  constructor({title, rating, year, duration, genre, image, description, comments}) {
    super();

    this._title = title;
    this._rating = rating;
    this._year = year;
    this._duration = duration;
    this._genre = genre;
    this._image = image;
    this._description = description;
    this._comments = comments;
  }

  getTemplate() {
    const createButtonMarkup = (name, classname) => {
      return (
        `<button class="film-card__controls-item button film-card__controls-item--${classname}">
          ${name}
        </button>`
      ).trim();
    };

    const addToWatchlistButton = createButtonMarkup(`Add to watchlist`, `add-to-watchlist`);
    const markAsWatchedButton = createButtonMarkup(`Mark as watched`, `mark-as-watched`);
    const markAsFavoriteButton = createButtonMarkup(`Mark as favorite`, `favorite`);

    return (
      `
      <article class="film-card">
        <h3 class="film-card__title">${this._title}</h3>
        <p class="film-card__rating">${this._rating}</p>
        <p class="film-card__info">
          <span class="film-card__year">${this._year}</span>
          <span class="film-card__duration">${this._duration}</span>
          <span class="film-card__genre">${this._genre}</span>
        </p>
        <img src="${this._image}" alt="" class="film-card__poster">
        <p class="film-card__description">${this._description}</p>
        <a class="film-card__comments">${this._comments.length}  comments</a>
        <form class="film-card__controls">
          ${addToWatchlistButton}
          ${markAsWatchedButton}
          ${markAsFavoriteButton}
        </form>
      </article>
    `
    ).trim();
  }

  setFilmCardClickHandler(handler) {
    this.getElement()
      .addEventListener(`click`, handler);
  }

  setWatchlistButtonClickHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--add-to-watchlist`)
      .addEventListener(`click`, handler);
  }

  setWatchedButtonClickHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--mark-as-watched`)
      .addEventListener(`click`, handler);
  }

  setFavoriteButtonClickHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--favorite`)
      .addEventListener(`click`, handler);
  }
}
