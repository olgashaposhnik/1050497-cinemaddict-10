import FilmCardComponent from '../components/film-card.js';
import FilmDetailsPopupComponent from '../components/film-details-popup.js';
import NoFilmsComponent from '../components/no-films.js';
import ShowMoreButtonComponent from './components/show-more-button.js';
import {render, remove, RenderPosition} from '../mock/utils.js';
import FilmsSectionComponent from './components/films-section.js';
import {generateFilmCards} from './mock/film-card-object.js';

const FILM_LIST_CARD_QUANTITY = 15;
const FILM_CARD_QUANTITY = 5;
const TOP_RATED_MOVIES_QUANTITY = 2;
const MOST_COMMENTED_MOVIES_QUANTITY = 2;
const SHOWING_FILMS_QUANTITY_BY_BUTTON = 5;

const body = document.querySelector(`body`);
const filmsSection = new FilmsSectionComponent();
const filmsList = filmsSection.getElement().querySelector(`.films-list`);
const filmsListContainer = filmsList.querySelector(`.films-list__container`);
// const filmsTopRatedContainer = filmsListExtra[0].querySelector(`.films-list__container`);
// const filmsMostCommentedContainer = filmsListExtra[1].querySelector(`.films-list__container`);
// const filmsListExtra = filmsSection.getElement().querySelectorAll(`.films-list--extra`);
const films = generateFilmCards(FILM_LIST_CARD_QUANTITY);

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
    FilmDetailsPopupComponent.setClosePopupButtonClickHandler(() => {
      removePopup();
      document.removeEventListener(`keydown`, onEscKeyDown);
    });

    // const closePopupButton = filmPopup.getElement().querySelector(`.film-details__close-btn`);
    // closePopupButton.addEventListener(`click`, () => {
    //   removePopup();
    //   document.removeEventListener(`keydown`, onEscKeyDown);
    // });
    render(body, filmPopup, RenderPosition.BEFOREEND);
  };

  const filmCardComponent = new FilmCardComponent(film);
  filmCardComponent.setFilmCardClickHandler(() => {
    openPopup(film);
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  // filmCardComponent.getElement().addEventListener(`click`, () => {
  //   openPopup(film);
  //   document.addEventListener(`keydown`, onEscKeyDown);
  // });

  render(filmsContainer, filmCardComponent, RenderPosition.BEFOREEND);

  if (films.length === 0) {
    render(filmsListContainer, new NoFilmsComponent(), RenderPosition.BEFOREEND);
  }
};

export default class FilmsController {
  constructor(container) {
    this._container = container;

    this._ShowMoreButtonComponent = new ShowMoreButtonComponent();
  }

  render(filmCards) {
    const container = this._container.getElement();
    let showingFilms = FILM_CARD_QUANTITY; // создаем карточки фильмов в основном разделе
    filmCards.slice(0, showingFilms)
      .forEach((film) => {
        renderFilm(film, container);
      });

    const topRatedFilms = TOP_RATED_MOVIES_QUANTITY; // создаем карточки фильмов в разделе топ рейтинг
    const topRatedFilmCards = filmCards.sort((a, b) => b.rating - a.rating);
    topRatedFilmCards.slice(0, topRatedFilms)
      .forEach((film) => {
        renderFilm(film, container);
      });

    const mostCommentedFilms = MOST_COMMENTED_MOVIES_QUANTITY; // создаем карточки фильмов в разделе самых просматриваемых
    const mostCommentedFilmCards = filmCards.sort((a, b) => b.comments.length - a.comments.length);
    mostCommentedFilmCards.slice(0, mostCommentedFilms)
      .forEach((film) => {
        renderFilm(film, container);
      });

    render(container, this._ShowMoreButtonComponent, RenderPosition.BEFOREEND);
    const showMoreButton = document.querySelector(`.films-list__show-more`);
    this._ShowMoreButtonComponent.setShowMoreButtonClickHandler(() => {
      let prevFilmsCount = showingFilms;
      showingFilms = showingFilms + SHOWING_FILMS_QUANTITY_BY_BUTTON;

      filmCards.slice(prevFilmsCount, showingFilms)
          .forEach((film) => renderFilm(film, filmsListContainer));

      if (showingFilms >= filmCards.length) {
        remove(showMoreButton);
      }
    });
  }
}
