// import FilmCardComponent from '../components/film-card.js';
// import FilmDetailsPopupComponent from '../components/film-details-popup.js';
import ShowMoreButtonComponent from '../components/show-more-button.js';
import {SortType} from '../components/sort.js';
import MovieController from './movie-controller.js';
import {render, remove, RenderPosition} from '../mock/utils.js';
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
    const movieController = new MovieController(filmsList, onDataChange, onViewChange);
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
    this._mainFilmControllers = [];
    this._topRatedFilmControllers = [];
    this._mostCommentedFilmControllers = [];
    this._newFilmsByButtonControllers = [];
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
    this._showingFilms = FILM_CARD_QUANTITY;
    this._topRatedFilms = TOP_RATED_MOVIES_QUANTITY;
    this._mostCommentedFilms = MOST_COMMENTED_MOVIES_QUANTITY;
    this._showingFilmsQuantityByButton = SHOWING_FILMS_QUANTITY_BY_BUTTON;

    this._sort.setSortTypeChangeHandler(this._onSortTypeChange);
  }

  render(filmCards) {
    this._filmCards = filmCards;

    const newFilms = renderFilms(this._filmsListContainer, this._filmCards.slice(0, this._showingFilms), this._onDataChange, this._onViewChange);
    this._mainFilmControllers = this._mainFilmControllers.concat(newFilms);

    const topRatedFilms = renderFilms(this._filmsTopRatedContainer, this._filmCards.sort((a, b) => b.rating - a.rating).slice(0, this._topRatedFilms), this._onDataChange, this._onViewChange);
    this._topRatedFilmControllers = this._topRatedFilmControllers.concat(topRatedFilms);

    const mostCommentedFilms = renderFilms(this._filmsMostCommentedContainer, this._filmCards.sort((a, b) => b.comments.length - a.comments.length).slice(0, this._mostCommentedFilms), this._onDataChange, this._onViewChange);
    this._mostCommentedFilmControllers = this._mostCommentedFilmControllers.concat(mostCommentedFilms);

    this._renderShowMoreButton();
  }

  _renderShowMoreButton() {
    if (this._showingFilms >= this._filmCards.length) {
      return;
    }

    render(this._filmsList, this._ShowMoreButtonComponent, RenderPosition.BEFOREEND);
    const showMoreButton = this._ShowMoreButtonComponent.getElement();
    this._ShowMoreButtonComponent.setShowMoreButtonClickHandler(() => {
      let prevFilmsCount = this._showingFilms;
      this._showingFilms = this._showingFilms + this._showingFilmsQuantityByButton;

      const newFilmsByButton = renderFilms(this._filmsListContainer, this._filmCards.slice(prevFilmsCount, this._showingFilms), this._onDataChange, this._onViewChange);
      this._newFilmsByButtonControllers = this._newFilmsByButtonControllers.concat(newFilmsByButton);

      if (this._showingFilms >= this._filmCards.length) {
        showMoreButton.remove();
      }
    });
    render(this._filmsList, this._ShowMoreButtonComponent, RenderPosition.BEFOREEND);
  }

  _onDataChange(movieController, oldData, newData) {
    const index = this._filmCards.findIndex((it) => it === oldData);
    if (index === -1) {
      return;
    }

    this._filmCards = [].concat(this._filmCards.slice(0, index), newData, this._filmCards.slice(index + 1));
    movieController.render(this._filmCards[index]);
  }

  _onViewChange() {
    this._mainFilmControllers.forEach((it) => it.setDefaultView());
  }

  _onSortTypeChange(sortType) {
    this._showingFilms = FILM_CARD_QUANTITY;
    let sortedFilms = this._filmCards.slice();

    switch (sortType) {
      case SortType.DATE:
        sortedFilms = sortedFilms.sort((a, b) => b.year - a.year);
        break;
      case SortType.RATING:
        sortedFilms = sortedFilms.sort((a, b) => b.rating - a.rating);
        break;
      case SortType.DEFAULT:
        sortedFilms = this._filmCards;
        break;
    }

    this._filmsListContainer.innerHTML = ``;
    // return sortedFilms;

    renderFilms(this._filmsListContainer, sortedFilms.slice(0, this._showingFilms), this._onDataChange, this._onViewChange);
    this._renderShowMoreButton();

    // renderFilms(this._filmsListContainer, sortedFilms.slice(0, this._showingFilms), this._onDataChange, this._onViewChange);
    // // this._showedFilmControllers = newFilms;

    // this._renderShowMoreButton();

    // if (sortType === SortType.DEFAULT) {
    //   this._renderShowMoreButton();
    // } else {
    //   remove(this._ShowMoreButtonComponent);
    // }
  }
}
