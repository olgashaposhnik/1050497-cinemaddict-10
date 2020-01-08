import HeaderProfileComponent from './components/header-profile.js';
import SiteMenuComponent from './components/menu.js';
import SortComponent from './components/sort.js';
import FilmCardComponent from './components/film-card.js';
import FilmsSectionComponent from './components/films-section.js';
import FilmDetailsPopupComponent from './components/film-details-popup.js';
import ShowMoreButtonComponent from './components/show-more-button.js';
import FooterComponent from './components/footer.js';
import {generateFilmCards} from './mock/film-card-object.js';
import {render/* , RenderPosition*/} from './mock/utils.js';

const FILM_LIST_CARD_QUANTITY = 15;
const FILM_CARD_QUANTITY = 5;
const SHOWING_FILMS_QUANTITY_BY_BUTTON = 5;
const TOP_RATED_MOVIES_QUANTITY = 2;
const MOST_COMMENTED_MOVIES_QUANTITY = 2;
const POPUP_QUANTITY = 1;
const ESC_KEYCODE = 27;

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = document.querySelector(`.header`);
const siteFooterElement = document.querySelector(`footer`);

const films = generateFilmCards(FILM_LIST_CARD_QUANTITY);

const headerProfile = new HeaderProfileComponent();
const siteMenu = new SiteMenuComponent(films);
const sort = new SortComponent();
const filmsSection = new FilmsSectionComponent().getElement();
render(siteHeaderElement, headerProfile.getElement(), `beforeend`);
render(siteMainElement, siteMenu.getElement(), `beforeend`);
render(siteMainElement, sort.getElement(), `beforeend`);
render(siteMainElement, filmsSection, `beforeend`);

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
      replacePopupToFilmsList();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  const replacePopupToFilmsList = () => {
    document.replaceChild(FilmDetailsPopupComponent.getElement(), FilmCardComponent.getElement());
  };

  const replaceFilmsListToPopup = () => {
    document.replaceChild(FilmCardComponent.getElement(), FilmDetailsPopupComponent.getElement());
  };

  const filmDetailsPopupComponent = new FilmDetailsPopupComponent(film);
  const closePopupButton = filmDetailsPopupComponent.getElement().querySelector(`.film-details__close-btn`);

  closePopupButton.addEventListener(`click`, () => {
    replacePopupToFilmsList();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  const filmCardComponent = new FilmCardComponent(film);
  filmCardComponent.addEventListener(`click`, () => {
    replaceFilmsListToPopup();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  render(filmsListContainer, new FilmCardComponent(film).getElement(), `beforeend`);
};


let showingFilms = FILM_CARD_QUANTITY; // создаем карточки фильмов в основном разделе
films.slice(0, showingFilms)
  .forEach((film) => {
    renderFilm(film);
    // render(filmsListContainer, new FilmCardComponent(film).getElement(), `beforeend`);
  });

const topRatedFilms = TOP_RATED_MOVIES_QUANTITY; // создаем карточки фильмов в разделе топ рейтинг
const topRatedFilmCards = films.sort((a, b) => b.rating - a.rating);
topRatedFilmCards.slice(0, topRatedFilms)
  .forEach((film) => {
    render(filmsTopRatedContainer, new FilmCardComponent(film).getElement(), `beforeend`);
  });

const mostCommentedFilms = MOST_COMMENTED_MOVIES_QUANTITY; // создаем карточки фильмов в разделе самых просматриваемых
const mostCommentedFilmCards = films.sort((a, b) => b.comments.length - a.comments.length);
mostCommentedFilmCards.slice(0, mostCommentedFilms)
  .forEach((film) => {
    render(filmsMostCommentedContainer, new FilmCardComponent(film).getElement(), `beforeend`);
  });

films.slice(0, POPUP_QUANTITY)
  .forEach((film) => {
    render(body, new FilmDetailsPopupComponent(film).getElement(), `beforeend`);
  });

render(filmsList, new ShowMoreButtonComponent().getElement(), `beforeend`);
render(siteFooterElement, new FooterComponent(films).getElement(), `beforeend`);

const closePopupButton = document.querySelector(`.film-details__close-btn`);

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

document.addEventListener(`keydown`, onEscDown);
closePopupButton.addEventListener(`keydown`, onEscDown);

const showMoreButton = document.querySelector(`.films-list__show-more`);
showMoreButton.addEventListener(`click`, () => {
  let prevFilmsCount = showingFilms;
  showingFilms = showingFilms + SHOWING_FILMS_QUANTITY_BY_BUTTON;

  films.slice(prevFilmsCount, showingFilms)
    .forEach((film) => render(filmsListContainer, new FilmCardComponent(film).getElement(), `beforeend`));

  if (showingFilms >= films.length) {
    showMoreButton.remove();
  }
});
