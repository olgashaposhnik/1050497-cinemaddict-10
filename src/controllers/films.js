import FilmCardComponent from '../components/film-card.js';
import FilmDetailsPopupComponent from '../components/film-details-popup.js';
import ShowMoreButtonComponent from '../components/show-more-button.js';
import {render, RenderPosition} from '../mock/utils.js';
import {SortType} from '../components/sort.js';

const FILM_CARD_QUANTITY = 5;
const TOP_RATED_MOVIES_QUANTITY = 2;
const MOST_COMMENTED_MOVIES_QUANTITY = 2;
const SHOWING_FILMS_QUANTITY_BY_BUTTON = 5;

const body = document.querySelector(`body`);

const renderFilm = (film, filmsContainer) => {
  const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;
    if (isEscKey) {
      removePopup();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  const removePopup = () => {
    document.querySelector(`.film-details`).remove();
  };

  const openPopup = (singleFilm) => {
    const filmPopup = new FilmDetailsPopupComponent(singleFilm);
    filmPopup.setClosePopupButtonClickHandler(() => {
      removePopup();
      document.removeEventListener(`keydown`, onEscKeyDown);
    });

    render(body, filmPopup, RenderPosition.BEFOREEND);
  };

  const filmCardComponent = new FilmCardComponent(film);
  filmCardComponent.setFilmCardClickHandler(() => {
    openPopup(film);
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  render(filmsContainer, filmCardComponent, RenderPosition.BEFOREEND);
};

const renderFilms = (container, films) => {
  films.forEach((film) => {
    renderFilm(film, container);
  });
};

export default class FilmsController {
  constructor(container, sort) {
    this._container = container;
    this._sort = sort;

    this._ShowMoreButtonComponent = new ShowMoreButtonComponent();
    this._siteMainElement = document.querySelector(`.main`);
    this._filmsList = this._container.getElement().querySelector(`.films-list`);
    this._filmsListContainer = this._container.getElement().querySelector(`.films-list__container`);
    this._filmsListExtra = this._container.getElement().querySelectorAll(`.films-list--extra`);
    this._filmsTopRatedContainer = this._filmsListExtra[0].querySelector(`.films-list__container`);
    this._filmsMostCommentedContainer = this._filmsListExtra[1].querySelector(`.films-list__container`);
  }

  render(filmCards) {
    let showingFilms = FILM_CARD_QUANTITY; // создаем карточки фильмов в основном разделе
    filmCards.slice(0, showingFilms)
      .forEach((film) => {
        renderFilm(film, this._filmsListContainer);
      });

    const topRatedFilms = TOP_RATED_MOVIES_QUANTITY; // создаем карточки фильмов в разделе топ рейтинг
    const topRatedFilmCards = filmCards.sort((a, b) => b.rating - a.rating);
    topRatedFilmCards.slice(0, topRatedFilms)
      .forEach((film) => {
        renderFilm(film, this._filmsTopRatedContainer);
      });

    const mostCommentedFilms = MOST_COMMENTED_MOVIES_QUANTITY; // создаем карточки фильмов в разделе самых просматриваемых
    const mostCommentedFilmCards = filmCards.sort((a, b) => b.comments.length - a.comments.length);
    mostCommentedFilmCards.slice(0, mostCommentedFilms)
      .forEach((film) => {
        renderFilm(film, this._filmsMostCommentedContainer);
      });

    const renderShowMoreButton = () => {
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
    };

    renderShowMoreButton();

    this._sort.setSortTypeChangeHandler((sortType) => {
      showingFilms = FILM_CARD_QUANTITY;
      let sortedFilms = [];

      switch (sortType) {
        case SortType.DATE:
          sortedFilms = filmCards.sort((a, b) => b.year - a.year);
          break;
        case SortType.RATING:
          sortedFilms = filmCards.sort((a, b) => b.rating - a.rating);
          break;
        case SortType.DEFAULT:
          sortedFilms = filmCards;
          break;
      }

      this._filmsListContainer.innerHTML = ``;

      renderFilms(this._filmsListContainer, sortedFilms.slice(0, showingFilms));
    });
  }
}
