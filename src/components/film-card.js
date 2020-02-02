import AbstractComponent from './abstract-component.js';

const MINUTES_IN_HOUR = 60;

const calculateMinutesToHours = (duration) => {
  const hours = Math.floor(duration / MINUTES_IN_HOUR);
  const minutes = duration - hours * MINUTES_IN_HOUR;
  return hours + `h ` + minutes + `m`;
};

export default class FilmCard extends AbstractComponent {
  constructor({title, rating, year, duration, genres, image, description, comments, isWatchlist, isWatched, isFavorite}) {
    super();

    this._title = title;
    this._rating = rating;
    this._year = year;
    this._duration = duration;
    this._genres = genres;
    this._image = image;
    this._description = description;
    this._comments = comments;
    this._isWatchlist = isWatchlist;
    this._isWatched = isWatched;
    this._isFavorite = isFavorite;
  }

  getTemplate() {
    const createButtonMarkup = (name, classname, isActive) => {
      return (
        `<button class="film-card__controls-item button film-card__controls-item--${classname} ${isActive ? `film-card__controls-item--active` : ``}">
          ${name}
        </button>`
      ).trim();
    };

    const addToWatchlistButton = createButtonMarkup(`Add to watchlist`, `add-to-watchlist`, this._isWatchlist);
    const markAsWatchedButton = createButtonMarkup(`Mark as watched`, `mark-as-watched`, this._isWatched);
    const markAsFavoriteButton = createButtonMarkup(`Mark as favorite`, `favorite`, this._isFavorite);

    return (
      `
      <article class="film-card">
        <h3 class="film-card__title">${this._title}</h3>
        <p class="film-card__rating">${this._rating}</p>
        <p class="film-card__info">
          <span class="film-card__year">${this._year}</span>
          <span class="film-card__duration">${calculateMinutesToHours(this._duration)}</span>
          <span class="film-card__genre">${this._genres[0]}</span>
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
    this.getElement().querySelector(`.film-card__poster`).addEventListener(`click`, handler);
    this.getElement().querySelector(`.film-card__title`).addEventListener(`click`, handler);
    this.getElement().querySelector(`.film-card__comments`).addEventListener(`click`, handler);
  }

  setWatchlistButtonClickHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--add-to-watchlist`)
      .addEventListener(`click`, (evt) => {
        evt.preventDefault();
        handler();
      });
  }

  setWatchedButtonClickHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--mark-as-watched`)
      .addEventListener(`click`, (evt) => {
        evt.preventDefault();
        handler();
      });
  }

  setFavoriteButtonClickHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--favorite`)
      .addEventListener(`click`, (evt) => {
        evt.preventDefault();
        handler();
      });
  }
}
