import HeaderProfileComponent from './components/header-profile.js';
import SiteMenuComponent from './components/menu.js';
// import SortComponent from './components/sort.js';
import FilmsSectionComponent from './components/films-section.js';
import FilmsController from './controllers/films.js';
import FooterComponent from './components/footer.js';
import {generateFilmCards} from './mock/film-card-object.js';
import {render, RenderPosition} from './mock/utils.js';

const FILM_LIST_CARD_QUANTITY = 15;

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = document.querySelector(`.header`);

const films = generateFilmCards(FILM_LIST_CARD_QUANTITY);

const headerProfile = new HeaderProfileComponent();
const siteMenu = new SiteMenuComponent(films);
// const sort = new SortComponent();
const filmsSection = new FilmsSectionComponent();
render(siteHeaderElement, headerProfile, RenderPosition.BEFOREEND);
render(siteMainElement, siteMenu, RenderPosition.BEFOREEND);
// render(siteMainElement, sort, RenderPosition.BEFOREEND);
render(siteMainElement, filmsSection, RenderPosition.BEFOREEND);
render(siteMainElement, new FooterComponent(films), RenderPosition.BEFOREEND);

const filmsController = new FilmsController(filmsSection);

filmsController.render(films);
