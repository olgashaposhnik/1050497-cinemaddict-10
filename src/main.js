import {getHeaderProfile} from './components/header-profile.js';
import {createSiteMenuTemplate} from './components/menu.js';
import {createSortTemplate} from './components/sort.js';
import {createFilmCard} from './components/film-card.js';
import {createFilmsSection} from './components/films-section.js';
import {createFilmDetailsPopup} from './components/film-details-popup.js';
import {createShowMoreButton} from './components/show-more-button.js';

const FILM_CARD_QUANTITY = 5;
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

const films = siteMainElement.querySelector(`.films`);
const filmsList = films.querySelector(`.films-list`);
const filmsListContainer = filmsList.querySelector(`.films-list__container`);
const filmsListExtra = films.querySelectorAll(`.films-list--extra`);
const filmsTopRatedContainer = filmsListExtra[0].querySelector(`.films-list__container`);
const filmsMostCommentedContainer = filmsListExtra[1].querySelector(`.films-list__container`);
const body = document.querySelector(`body`);

new Array(FILM_CARD_QUANTITY).fill(``).forEach(() => renderElement(filmsListContainer, createFilmCard()));
new Array(TOP_RATED_MOVIES_QUANTITY).fill(``).forEach(() => renderElement(filmsTopRatedContainer, createFilmCard()));
new Array(MOST_COMMENTED_MOVIES_QUANTITY).fill(``).forEach(() => renderElement(filmsMostCommentedContainer, createFilmCard()));
renderElement(filmsList, createShowMoreButton());
renderElement(body, createFilmDetailsPopup());
