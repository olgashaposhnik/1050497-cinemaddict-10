import FilmCardComponent from '../components/film-card.js';
import FilmDetailsPopupComponent from '../components/film-details-popup.js';
import {render, replace, remove, RenderPosition} from '../utils/utils.js';

export const Mode = {
  COMMENT: `comment`,
  FILM: `film`,
  POPUP: `popup`,
};

export const EmptyComment = {
  text: ``,
  emoji: {
    angry: `./images/emoji/angry.png`,
    puke: `./images/emoji/puke.png`,
    sleeping: `./images/emoji/sleeping.png`,
    smile: `./images/emoji/smile.png`,
    trophy: `./images/emoji/trophy.png`,
  },
  author: ``,
  date: null,
};

export default class MovieController {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;

    this._mode = Mode.FILM;

    this._filmCardComponent = null;
    this._filmDetailsPopupComponent = null;
    this._filmCardImage = null;

    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  render(film, comment) {
    const oldFilmCardComponent = this._filmCardComponent;
    const oldFilmDetailsPopupComponent = this._filmDetailsPopupComponent;
    this._comment = comment;

    this._filmCardComponent = new FilmCardComponent(film);
    this._filmDetailsPopupComponent = new FilmDetailsPopupComponent(film);

    this._filmCardComponent.setFilmCardClickHandler(() => {
      this._openPopup(film);
      document.addEventListener(`keydown`, this._onEscKeyDown);
    });

    this._filmCardComponent.setWatchlistButtonClickHandler(() => {
      this._onDataChange(this, film, Object.assign({}, film, {
        isWatchlist: !film.isWatchlist,
      }));
    });

    this._filmCardComponent.setWatchedButtonClickHandler(() => {
      this._onDataChange(this, film, Object.assign({}, film, {
        isWatched: !film.isWatched,
      }));
    });

    this._filmCardComponent.setFavoriteButtonClickHandler(() => {
      this._onDataChange(this, film, Object.assign({}, film, {
        isFavorite: !film.isFavorite,
      }));
    });

    this._filmDetailsPopupComponent.setCreateCommentHandler((evt) => {
      evt.preventDefault();
      const data = this._filmDetailsPopupComponent.getData();
      this._onDataChange(this, comment, data);
    });

    switch (Mode) {
      case Mode.COMMENT:
        if (oldFilmDetailsPopupComponent && oldFilmCardComponent) {
          remove(oldFilmCardComponent);
          remove(oldFilmDetailsPopupComponent);
        }
        document.addEventListener(`keydown`, this._onEscKeyDown);
        render(this._container, this._filmDetailsPopupComponent, RenderPosition.AFTERBEGIN);
        break;

      case Mode.POPUP:
        if (oldFilmCardComponent && oldFilmDetailsPopupComponent) {
          replace(this._filmCardComponent, oldFilmCardComponent);
          replace(this._filmDetailsPopupComponent, oldFilmDetailsPopupComponent);
        } else {
          render(this._container, this._filmCardComponent, RenderPosition.BEFOREEND);
        }
    }
  }

  destroy() {
    remove(this._filmDetailsPopupComponent);
    remove(this._filmCardComponent);
    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }

  _replaceFilmToPopup() {
    this._onViewChange();

    replace(this._filmCardComponent, this._filmDetailsPopupComponent);
    this._mode = Mode.POPUP;
  }

  _openPopup() {
    this._filmDetailsPopupComponent.setClosePopupButtonClickHandler(() => {
      this._removePopup();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    });

    render(this._container, this._filmDetailsPopupComponent, RenderPosition.BEFOREEND);
  }

  _removePopup() {
    document.querySelector(`.film-details`).remove();
  }

  _onEscKeyDown(evt) {
    if (this._mode === Mode.COMMENT) {
      this._onDataChange(this, EmptyComment, null);
    }

    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      this._removePopup();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }
}
