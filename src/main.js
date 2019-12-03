import {getHeaderProfile} from './components/header-profile.js';
import {createSiteMenuTemplate} from './components/menu.js';
import {createSortTemplate} from './components/sort.js';
// import {createFilmCard} from './components/film-card.js';
import {createFilmsSection} from './components/films-section.js';
import {createFilmDetailsPopup} from './components/film-details-popup.js';
import {createShowMoreButton} from './components/show-more-button.js';
// export {generateFilmCard} from './mock/film-card-object.js';
export {generateFilmCards} from './mock/film-card-object.js';

const FILM_LIST_CARD_QUANTITY = 15;
const FILM_CARD_QUANTITY = 5;
// const SHOWING_FILMS_QUANTITY_BY_BUTTON = 5;
const TOP_RATED_MOVIES_QUANTITY = 2;
const MOST_COMMENTED_MOVIES_QUANTITY = 2;

const renderElement = (container, markup, position = `beforeend`) => {
  container.insertAdjacentHTML(position, markup);
};

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = document.querySelector(`.header`);

renderElement(siteHeaderElement, getHeaderProfile());
renderElement(siteMainElement, createSiteMenuTemplate());
renderElement(siteMainElement, createSortTemplate());
renderElement(siteMainElement, createFilmsSection());

const filmsSection = siteMainElement.querySelector(`.films`);
const filmsList = filmsSection.querySelector(`.films-list`);
const filmsListContainer = filmsList.querySelector(`.films-list__container`);
const filmsListExtra = filmsSection.querySelectorAll(`.films-list--extra`);
const filmsTopRatedContainer = filmsListExtra[0].querySelector(`.films-list__container`);
const filmsMostCommentedContainer = filmsListExtra[1].querySelector(`.films-list__container`);
const body = document.querySelector(`body`);

const films = generateFilmCards(FILM_LIST_CARD_QUANTITY);

let showingFilms = FILM_CARD_QUANTITY; // создаем карточки фильмов в основном разделе
films.slice(0, showingFilms)
  .forEach((film) => {
    renderElement(filmsListContainer, film);
  });

let topRatedFilms = TOP_RATED_MOVIES_QUANTITY; // создаем карточки фильмов в разделе топ рейтинг
films.slice(0, topRatedFilms)
  .forEach((film) => {
    renderElement(filmsTopRatedContainer, film);
  });

let mostCommentedFilms = MOST_COMMENTED_MOVIES_QUANTITY; // создаем карточки фильмов в разделе самых просматриваемых
films.slice(0, mostCommentedFilms)
  .forEach((film) => {
    renderElement(filmsMostCommentedContainer, film);
  });


// new Array(FILM_CARD_QUANTITY).fill(``).forEach(() => renderElement(filmsListContainer, createFilmCard()));
// new Array(TOP_RATED_MOVIES_QUANTITY).fill(``).forEach(() => renderElement(filmsTopRatedContainer, createFilmCard()));
// new Array(MOST_COMMENTED_MOVIES_QUANTITY).fill(``).forEach(() => renderElement(filmsMostCommentedContainer, createFilmCard()));
renderElement(filmsList, createShowMoreButton());
renderElement(body, createFilmDetailsPopup());

// const ShowMoreButton = document.querySelector(`.films-list__show-more`);

// ShowMoreButton.addEventListener(`click`, () => {
//   const prevFilmsCount = showingFilms;
//   showingFilms = showingFilms + SHOWING_FILMS_QUANTITY_BY_BUTTON;

//   films.slice(prevFilmsCount, showingFilms)
//     .forEach((film) => renderTask(taskListElement, film));

//   if (showingTasksCount >= tasks.length) {
//     loadMoreButtonComponent.getElement().remove();
//     loadMoreButtonComponent.removeElement();
//   }
// });
