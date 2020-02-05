import FilmCardComponent from '../components/film-card.js';
import FilmDetailsPopupComponent from '../components/film-details-popup.js';
import MovieModel from '../models/movie.js';
import {render, replace, remove, RenderPosition} from '../utils/utils.js';

export const Mode = {
  COMMENT: `comment`,
  FILM: `film`,
  POPUP: `popup`,
};

const SHAKE_ANIMATION_TIMEOUT = 600;

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

const parseFormData = (formData) => {
  return new MovieModel({
    text: formData.get(`text`),
    emoji: formData.get(`emoji`),
    author: formData.get(`author`),
    date: formData.get(`date`),
  });
};

export default class MovieController {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;

    this._mode = Mode.POPUP;

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
      // this._onDataChange(this, film, Object.assign({}, film, {
      //   isWatchlist: !film.isWatchlist,
      // }));
      const newFilm = MovieModel.clone(film);
      newFilm.isWatchlist = !newFilm.isWatchlist;

      this._onDataChange(this, film, newFilm);
    });

    this._filmCardComponent.setWatchedButtonClickHandler(() => {
      // this._onDataChange(this, film, Object.assign({}, film, {
      //   isWatched: !film.isWatched,
      // }));
      const newFilm = MovieModel.clone(film);
      newFilm.isWatched = !newFilm.isWatched;

      this._onDataChange(this, film, newFilm);
    });

    this._filmCardComponent.setFavoriteButtonClickHandler(() => {
      // this._onDataChange(this, film, Object.assign({}, film, {
      //   isFavorite: !film.isFavorite,
      // }));
      const newFilm = MovieModel.clone(film);
      newFilm.isFavorite = !newFilm.isFavorite;

      this._onDataChange(this, film, newFilm);
    });

    this._filmDetailsPopupComponent.setCreateCommentHandler((evt) => {
      evt.preventDefault();
      // const isCtrlKey = evt.key === `17` || evt.key === `ctrl`;
      if (evt.ctrlKey && evt.keyCode === 13) {
        this._filmDetailsPopupComponent.setData();
        //   // saveButtonText: `Saving...`, // нет там кнопки же((((
        // });
      }
      // if (evt.isEscKey) {} // TODO проверить, нажата ли кнопка ctrl и enter
      // // const data = this._filmDetailsPopupComponent.getData();
      // this._filmDetailsPopupComponent.setData({
      //   saveButtonText: `Saving...`, // нет там кнопки же((((
      // });
      const formData = this._filmDetailsPopupComponent.getData();
      const data = parseFormData(formData);
      this._onDataChange(this, comment, data);
    });

    this._filmDetailsPopupComponent.setDeleteCommentHandler(() => {
      this._filmDetailsPopupComponent.setData({
        deleteButtonText: `Deleting...`,
      });

      this._onDataChange(this, film, null);
    });

    switch (this._mode) {
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

  shake() {
    this._filmDetailsPopupComponent.getElement().style.animation = `shake ${SHAKE_ANIMATION_TIMEOUT / 1000}s`;
    this._filmCardComponent.getElement().style.animation = `shake ${SHAKE_ANIMATION_TIMEOUT / 1000}s`;

    setTimeout(() => {
      this._filmDetailsPopupComponent.getElement().style.animation = ``;
      this._filmCardComponent.getElement().style.animation = ``;

      this._filmDetailsPopupComponent.setData({
        saveButtonText: `Save`,
        deleteButtonText: `Delete`,
      });
    }, SHAKE_ANIMATION_TIMEOUT);
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
