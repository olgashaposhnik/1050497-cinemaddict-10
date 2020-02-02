import HeaderProfileComponent from './components/header-profile.js';
import FilterController from './controllers/filter.js';
import SortComponent from './components/sort.js';
import FilmsSectionComponent from './components/films-section.js';
import PageController from './controllers/page-controller.js';
import FooterComponent from './components/footer.js';
import MoviesModel from './models/movies.js';
import {generateFilmCards} from './mock/film-card-object.js';
import {render, RenderPosition} from './utils/utils.js';

const FILM_LIST_CARD_QUANTITY = 15;

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = document.querySelector(`.header`);

const films = generateFilmCards(FILM_LIST_CARD_QUANTITY);
const moviesModel = new MoviesModel();
moviesModel.setMovies(films);

const headerProfile = new HeaderProfileComponent();

const filterController = new FilterController(siteMainElement, moviesModel);
filterController.render();

const sort = new SortComponent();
const filmsSection = new FilmsSectionComponent();
render(siteHeaderElement, headerProfile, RenderPosition.BEFOREEND);
render(siteMainElement, sort, RenderPosition.BEFOREEND);
render(siteMainElement, filmsSection, RenderPosition.BEFOREEND);
render(siteMainElement, new FooterComponent(films), RenderPosition.BEFOREEND);

const pageController = new PageController(filmsSection, sort, moviesModel);

pageController.render();
