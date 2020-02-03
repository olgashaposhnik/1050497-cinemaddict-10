import HeaderProfileComponent from './components/header-profile.js';
import SortComponent from './components/sort.js';
import FilmsSectionComponent from './components/films-section.js';
import PageController from './controllers/page-controller.js';
import FooterComponent from './components/footer.js';
import StatisticsComponent from './components/statistics.js';
import MoviesModel from './models/movies.js';
import FilterController from './controllers/filter.js';
import {generateFilmCards} from './mock/film-card-object.js';
import {render, RenderPosition} from './utils/utils.js';
import {FilterType} from './const.js';

const FILM_LIST_CARD_QUANTITY = 15;

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = document.querySelector(`.header`);

const films = generateFilmCards(FILM_LIST_CARD_QUANTITY);
const moviesModel = new MoviesModel();
moviesModel.setMovies(films);
moviesModel.setFilterChangeHandler((item) => {
  onMainNavFilterChange(item);
});

const headerProfile = new HeaderProfileComponent();

const filterController = new FilterController(siteMainElement, moviesModel);
filterController.render();

const sort = new SortComponent();
const filmsSection = new FilmsSectionComponent();
const statisticsComponent = new StatisticsComponent(films);
render(siteHeaderElement, headerProfile, RenderPosition.BEFOREEND);
render(siteMainElement, sort, RenderPosition.BEFOREEND);
render(siteMainElement, filmsSection, RenderPosition.BEFOREEND);
render(siteMainElement, statisticsComponent, RenderPosition.BEFOREEND);
render(siteMainElement, new FooterComponent(films), RenderPosition.BEFOREEND);

const pageController = new PageController(filmsSection, sort, moviesModel);

statisticsComponent.hide();
pageController.render(films);

const onMainNavFilterChange = (item) => {
  switch (item) {
    case FilterType.STATISTICS:
      pageController.hide();
      sort.hide();
      statisticsComponent.show();
      break;
    default:
      statisticsComponent.hide();
      pageController.show();
      sort.show();
      break;
  }
};
