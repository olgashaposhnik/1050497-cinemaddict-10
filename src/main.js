import HeaderProfileComponent from './components/header-profile.js';
import SiteMenuComponent from './components/menu.js';
import SortComponent from './components/sort.js';
import FilmCardComponent from './components/film-card.js';
import FilmsSectionComponent from './components/films-section.js';
import FilmDetailsPopupComponent from './components/film-details-popup.js';
import ShowMoreButtonComponent from './components/show-more-button.js';
import FooterComponent from './components/footer.js';
import NoFilmsComponent from './components/no-films.js';
import {generateFilmCards} from './mock/film-card-object.js';
import {render, RenderPosition} from './mock/utils.js';

const FILM_LIST_CARD_QUANTITY = 15;
const FILM_CARD_QUANTITY = 5;
const SHOWING_FILMS_QUANTITY_BY_BUTTON = 5;
const TOP_RATED_MOVIES_QUANTITY = 2;
const MOST_COMMENTED_MOVIES_QUANTITY = 2;
const ESC_KEYCODE = 27;

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = document.querySelector(`.header`);

const films = generateFilmCards(FILM_LIST_CARD_QUANTITY);

const headerProfile = new HeaderProfileComponent();
const siteMenu = new SiteMenuComponent(films);
const sort = new SortComponent();
const filmsSection = new FilmsSectionComponent().getElement();
render(siteHeaderElement, headerProfile.getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, siteMenu.getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, sort.getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, filmsSection, RenderPosition.BEFOREEND);

const filmsList = filmsSection.querySelector(`.films-list`);
const filmsListContainer = filmsList.querySelector(`.films-list__container`);
const filmsListExtra = filmsSection.querySelectorAll(`.films-list--extra`);
const filmsTopRatedContainer = filmsListExtra[0].querySelector(`.films-list__container`);
const filmsMostCommentedContainer = filmsListExtra[1].querySelector(`.films-list__container`);
const body = document.querySelector(`body`);

const renderFilm = (film) => {
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
    const filmPopup = new FilmDetailsPopupComponent(singleFilm).getElement();
    const closePopupButton = filmPopup.querySelector(`.film-details__close-btn`);
    closePopupButton.addEventListener(`click`, () => {
      removePopup();
      document.removeEventListener(`keydown`, onEscKeyDown);
    });
    render(body, filmPopup, RenderPosition.BEFOREEND);
  };

  const filmCardComponent = new FilmCardComponent(film).getElement();
  filmCardComponent.addEventListener(`click`, () => {
    openPopup(film);
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  render(filmsListContainer, filmCardComponent, RenderPosition.BEFOREEND);

  if (films.length === 0) {
    render(filmsListContainer, new NoFilmsComponent().getElement(), RenderPosition.BEFOREEND);
  }
};

let showingFilms = FILM_CARD_QUANTITY; // создаем карточки фильмов в основном разделе
films.slice(0, showingFilms)
  .forEach((film) => {
    renderFilm(film);
  });

const topRatedFilms = TOP_RATED_MOVIES_QUANTITY; // создаем карточки фильмов в разделе топ рейтинг
const topRatedFilmCards = films.sort((a, b) => b.rating - a.rating);
topRatedFilmCards.slice(0, topRatedFilms)
  .forEach((film) => {
    render(filmsTopRatedContainer, new FilmCardComponent(film).getElement(), RenderPosition.BEFOREEND);
  });

const mostCommentedFilms = MOST_COMMENTED_MOVIES_QUANTITY; // создаем карточки фильмов в разделе самых просматриваемых
const mostCommentedFilmCards = films.sort((a, b) => b.comments.length - a.comments.length);
mostCommentedFilmCards.slice(0, mostCommentedFilms)
  .forEach((film) => {
    render(filmsMostCommentedContainer, new FilmCardComponent(film).getElement(), RenderPosition.BEFOREEND);
  });

render(filmsList, new ShowMoreButtonComponent().getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, new FooterComponent(films).getElement(), RenderPosition.BEFOREEND);

const closePopup = () => {
  const activeFilmCard = document.querySelector(`.film-card.active`); // не забыть присвоить такой класс потом
  const popupFilmCard = document.querySelector(`.film-details`);
  if (popupFilmCard) {
    popupFilmCard.remove();
    document.removeEventListener(`keydown`, onEscDown);
  }
  if (activeFilmCard) {
    activeFilmCard.classList.remove(`active`);
  }
};

const onEscDown = (evt) => {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
};

const showMoreButton = document.querySelector(`.films-list__show-more`);
showMoreButton.addEventListener(`click`, () => {
  let prevFilmsCount = showingFilms;
  showingFilms = showingFilms + SHOWING_FILMS_QUANTITY_BY_BUTTON;

  films.slice(prevFilmsCount, showingFilms)
    .forEach((film) => render(filmsListContainer, new FilmCardComponent(film).getElement(), RenderPosition.BEFOREEND));

  if (showingFilms >= films.length) {
    showMoreButton.remove();
  }
});
