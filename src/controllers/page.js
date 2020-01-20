// import FilmCardComponent from '../components/film-card.js';
// import FilmDetailsPopupComponent from '../components/film-details-popup.js';
import ShowMoreButtonComponent from '../components/show-more-button.js';
import {render, RenderPosition} from '../mock/utils.js';
import {SortType} from '../components/sort.js';
import MovieController from './film.js';

const FILM_CARD_QUANTITY = 5;
const TOP_RATED_MOVIES_QUANTITY = 2;
const MOST_COMMENTED_MOVIES_QUANTITY = 2;
const SHOWING_FILMS_QUANTITY_BY_BUTTON = 5;

// const body = document.querySelector(`body`);

// const renderFilm = (film, filmsContainer) => {
//   const onEscKeyDown = (evt) => {
//     const isEscKey = evt.key === `Escape` || evt.key === `Esc`;
//     if (isEscKey) {
//       removePopup();
//       document.removeEventListener(`keydown`, onEscKeyDown);
//     }
//   };

//   const removePopup = () => {
//     document.querySelector(`.film-details`).remove();
//   };

//   const openPopup = (singleFilm) => {
//     const filmPopup = new FilmDetailsPopupComponent(singleFilm);
//     filmPopup.setClosePopupButtonClickHandler(() => {
//       removePopup();
//       document.removeEventListener(`keydown`, onEscKeyDown);
//     });

//     render(body, filmPopup, RenderPosition.BEFOREEND);
//   };

//   const filmCardComponent = new FilmCardComponent(film);
//   filmCardComponent.setFilmCardClickHandler(() => {
//     openPopup(film);
//     document.addEventListener(`keydown`, onEscKeyDown);
//   });

//   render(filmsContainer, filmCardComponent, RenderPosition.BEFOREEND);
// };

const renderFilms = (filmsList, films, onDataChange, onViewChange) => {
  return films.map((film) => {
    const movieController = new MovieController(filmsList, films, onDataChange, onViewChange);
    movieController.render(film);
    return movieController;
  });
};

// const renderFilms = (container, films) => {
//   films.forEach((film) => {
//     renderFilm(film, container);
//   });
// };

export default class PageController {
  constructor(container, sort) {
    this._container = container;
    this._sort = sort;

    this._films = [];
    this._showedFilmControllers = [];
    this._showingFilmsCount = FILM_CARD_QUANTITY;
    this._ShowMoreButtonComponent = new ShowMoreButtonComponent();
    this._siteMainElement = document.querySelector(`.main`);
    this._filmsList = this._container.getElement().querySelector(`.films-list`);
    this._filmsListContainer = this._container.getElement().querySelector(`.films-list__container`);
    this._filmsListExtra = this._container.getElement().querySelectorAll(`.films-list--extra`);
    this._filmsTopRatedContainer = this._filmsListExtra[0].querySelector(`.films-list__container`);
    this._filmsMostCommentedContainer = this._filmsListExtra[1].querySelector(`.films-list__container`);
    this._onDataChange = this._onDataChange.bind(this);
    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._sortComponent.setSortTypeChangeHandler(this._onSortTypeChange);
  }

  render(filmCards) {
    this._filmCards = filmCards;
    this._topRatedFilmCards = topRatedFilmCards;
    this._mostCommentedFilmCards = mostCommentedFilmCards;

    const newFilms = renderFilms(this._filmsListContainer, this._filmCards.slice(0, showingFilms), this._onDataChange, this._onViewChange);
    this._showedFilmControllers = this._showedFilmControllers.concat(newFilms);

    let showingFilms = FILM_CARD_QUANTITY; // создаем карточки фильмов в основном разделе
    this._filmCards.slice(0, showingFilms)
      .forEach((film) => {
        renderFilm(film, this._filmsListContainer);
      });

    const topRatedFilms = TOP_RATED_MOVIES_QUANTITY; // создаем карточки фильмов в разделе топ рейтинг
    const topRatedFilmCards = filmCards.sort((a, b) => b.rating - a.rating);
    this._topRatedFilmCards.slice(0, topRatedFilms)
      .forEach((film) => {
        renderFilm(film, this._filmsTopRatedContainer);
      });

    const mostCommentedFilms = MOST_COMMENTED_MOVIES_QUANTITY; // создаем карточки фильмов в разделе самых просматриваемых
    const mostCommentedFilmCards = filmCards.sort((a, b) => b.comments.length - a.comments.length);
    this._mostCommentedFilmCards.slice(0, mostCommentedFilms)
      .forEach((film) => {
        renderFilm(film, this._filmsMostCommentedContainer);
      });

    this._renderShowMoreButton();
  }

  _renderShowMoreButton() {
    if (showingFilms >= filmCards.length) {
      return;
    }

    render(this._filmsList, this._ShowMoreButtonComponent, RenderPosition.BEFOREEND);
    const showMoreButton = document.querySelector(`.films-list__show-more`);
    this._ShowMoreButtonComponent.setShowMoreButtonClickHandler(() => {
      let prevFilmsCount = showingFilms;
      showingFilms = showingFilms + SHOWING_FILMS_QUANTITY_BY_BUTTON;

      filmCards.slice(prevFilmsCount, showingFilms)
          .forEach((film) => renderFilm(film, this._filmsListContainer));

      if (showingFilms >= filmCards.length) {
        showMoreButton.remove();
      }
    });
  }

  _onDataChange(movieController, oldData, newData) {
    const index = this._films.findIndex((it) => it === oldData);
    if (index === -1) {
      return;
    }

    this._films = [].concat(this._films.slice(0, index), newData, this._films.slice(index + 1));
    movieController.render(this._films[index]);
  }

  _onViewChange() {
    this._showedFilmControllers.forEach((it) => it.setDefaultView());
  }

  _onSortTypeChange(sortType) {
    showingFilms = FILM_CARD_QUANTITY;
    let sortedFilms = filmCards.slice();

    switch (sortType) {
      case SortType.DATE:
        sortedFilms = sortedFilms.sort((a, b) => b.year - a.year);
        break;
      case SortType.RATING:
        sortedFilms = sortedFilms.sort((a, b) => b.rating - a.rating);
        break;
      case SortType.DEFAULT:
        sortedFilms = filmCards;
        break;
    }

    this._filmsListContainer.innerHTML = ``;

    renderFilms(this._filmsListContainer, sortedFilms.slice(0, showingFilms));
    this._showedFilmControllers = newFilms;

    if (sortType === SortType.DEFAULT) {
      this._renderShowMoreButton();
    } else {
      remove(this._ShowMoreButtonComponent);
    }
  }
}
