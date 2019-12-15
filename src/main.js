import {getHeaderProfile} from './components/header-profile.js';
import {createSiteMenuTemplate} from './components/menu.js';
import {createSortTemplate} from './components/sort.js';
import {createFilmCard} from './components/film-card.js';
import {createFilmsSection} from './components/films-section.js';
import {createFilmDetailsPopup} from './components/film-details-popup.js';
import {createShowMoreButton} from './components/show-more-button.js';
import {generateFilmCards} from './mock/film-card-object.js';

const FILM_LIST_CARD_QUANTITY = 15;
const FILM_CARD_QUANTITY = 5;
const SHOWING_FILMS_QUANTITY_BY_BUTTON = 5;
const TOP_RATED_MOVIES_QUANTITY = 2;
const MOST_COMMENTED_MOVIES_QUANTITY = 2;
const POPUP_QUANTITY = 1;
const ESC_KEYCODE = 27;

const renderElement = (container, markup, position = `beforeend`) => {
  container.insertAdjacentHTML(position, markup);
};

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = document.querySelector(`.header`);

const films = generateFilmCards(FILM_LIST_CARD_QUANTITY);

renderElement(siteHeaderElement, getHeaderProfile());
renderElement(siteMainElement, createSiteMenuTemplate(films));
renderElement(siteMainElement, createSortTemplate());
renderElement(siteMainElement, createFilmsSection());

const filmsSection = siteMainElement.querySelector(`.films`);
const filmsList = filmsSection.querySelector(`.films-list`);
const filmsListContainer = filmsList.querySelector(`.films-list__container`);
const filmsListExtra = filmsSection.querySelectorAll(`.films-list--extra`);
const filmsTopRatedContainer = filmsListExtra[0].querySelector(`.films-list__container`);
const filmsMostCommentedContainer = filmsListExtra[1].querySelector(`.films-list__container`);
const body = document.querySelector(`body`);

console.log(films)

let showingFilms = FILM_CARD_QUANTITY; // создаем карточки фильмов в основном разделе
films.slice(0, showingFilms)
  .forEach((film) => {
    renderElement(filmsListContainer, createFilmCard(film));
  });

let topRatedFilms = TOP_RATED_MOVIES_QUANTITY; // создаем карточки фильмов в разделе топ рейтинг
films.slice(0, topRatedFilms)
  .forEach((film) => {
    renderElement(filmsTopRatedContainer, createFilmCard(film));
  });

let mostCommentedFilms = MOST_COMMENTED_MOVIES_QUANTITY; // создаем карточки фильмов в разделе самых просматриваемых
films.slice(0, mostCommentedFilms)
  .forEach((film) => {
    renderElement(filmsMostCommentedContainer, createFilmCard(film));
  });

let popup = POPUP_QUANTITY; // создаем попап
films.slice(0, popup)
  .forEach((film) => {
    renderElement(body, createFilmDetailsPopup(film));
  });

renderElement(filmsList, createShowMoreButton());

const closePopupButton = document.querySelector(`.film-details__close-btn`);

const closePopup = function () {
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

const onEscDown = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
};

document.addEventListener(`keydown`, onEscDown);
closePopupButton.addEventListener(`keydown`, onEscDown);

const showMoreButton = filmsListContainer.querySelector(`.films-list__show-more`);
showMoreButton.addEventListener(`click`, () => {
  const prevFilmsCount = showingFilms;
  showingFilms = showingFilms + SHOWING_FILMS_QUANTITY_BY_BUTTON;

  films.slice(prevFilmsCount, showingFilms)
    .forEach((film) => renderElement(filmsListContainer, createFilmCard(film)));

  if (showingFilms >= films.length) {
    showMoreButton.remove();
  }
});

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
