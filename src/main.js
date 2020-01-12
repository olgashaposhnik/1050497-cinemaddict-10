import HeaderProfileComponent from './components/header-profile.js';
import SiteMenuComponent from './components/menu.js';
import SortComponent from './components/sort.js';
import FilmsSectionComponent from './components/films-section.js';
// import ShowMoreButtonComponent from './components/show-more-button.js';
import FilmsController from './controllers/films.js';
import FooterComponent from './components/footer.js';
import {generateFilmCards} from './mock/film-card-object.js';
import {render, RenderPosition} from './mock/utils.js';

const FILM_LIST_CARD_QUANTITY = 15;
// const SHOWING_FILMS_QUANTITY_BY_BUTTON = 5;

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = document.querySelector(`.header`);

const films = generateFilmCards(FILM_LIST_CARD_QUANTITY);

const headerProfile = new HeaderProfileComponent();
const siteMenu = new SiteMenuComponent(films);
const sort = new SortComponent();
const filmsSection = new FilmsSectionComponent();
render(siteHeaderElement, headerProfile, RenderPosition.BEFOREEND);
render(siteMainElement, siteMenu, RenderPosition.BEFOREEND);
render(siteMainElement, sort, RenderPosition.BEFOREEND);
render(siteMainElement, filmsSection, RenderPosition.BEFOREEND);

// const filmsList = filmsSection.getElement().querySelector(`.films-list`);
// const filmsListContainer = filmsList.querySelector(`.films-list__container`);

render(siteMainElement, new FooterComponent(films), RenderPosition.BEFOREEND);

const filmsController = new FilmsController(films);

filmsController.render(films);

// const showMoreButton = document.querySelector(`.films-list__show-more`);
// ShowMoreButtonComponent.setShowMoreButtonClickHandler(() => {
//   let prevFilmsCount = showingFilms;
//   showingFilms = showingFilms + SHOWING_FILMS_QUANTITY_BY_BUTTON;

//   films.slice(prevFilmsCount, showingFilms)
//     .forEach((film) => renderFilm(film, filmsListContainer));

//   if (showingFilms >= films.length) {
//     remove(showMoreButton);
//   }
// });

// showMoreButton.addEventListener(`click`, () => {
//   let prevFilmsCount = showingFilms;
//   showingFilms = showingFilms + SHOWING_FILMS_QUANTITY_BY_BUTTON;

//   films.slice(prevFilmsCount, showingFilms)
//     .forEach((film) => renderFilm(film, filmsListContainer));

//   if (showingFilms >= films.length) {
//     remove(showMoreButton);
//   }
// });
