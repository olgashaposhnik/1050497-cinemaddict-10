import HeaderProfileComponent from './components/header-profile.js';
import SortComponent from './components/sort.js';
import FilmsSectionComponent from './components/films-section.js';
import PageController from './controllers/page-controller.js';
import FooterComponent from './components/footer.js';
import StatisticsComponent from './components/statistics.js';
import SiteMenuComponent from './components/site-menu.js'; // ВОЗМОЖНО, НУЖНО БУДЕТ УДАЛИТЬ!
import MoviesModel from './models/movies.js';
import FilterController from './controllers/filter.js';
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
const statisticsComponent = new StatisticsComponent(films);
const siteMenu = new SiteMenuComponent(films); // ПРОВЕРИТЬ!!!!!!!!!!!!!!!!!
render(siteHeaderElement, headerProfile, RenderPosition.BEFOREEND);
render(siteMainElement, sort, RenderPosition.BEFOREEND);
render(siteMainElement, filmsSection, RenderPosition.BEFOREEND);
render(siteMainElement, new FooterComponent(films), RenderPosition.BEFOREEND);
render(siteMainElement, statisticsComponent, RenderPosition.BEFOREEND);

const pageController = new PageController(filmsSection, sort, moviesModel);

statisticsComponent.hide();
pageController.render(films);

siteMenu.setOnChange((menuItem) => {
  switch (menuItem) {
    case menuItem.ALL_MOVIES:
      siteMenu.setActiveItem(menuItem.ALL_MOVIES);
      statisticsComponent.hide();
      pageController.show();
      break;
    case menuItem.WATCHLIST:
      statisticsComponent.hide();
      pageController.show();
      break;
    case menuItem.HISTORY:
      statisticsComponent.hide();
      pageController.show();
      break;
    case menuItem.FAVOURITES:
      statisticsComponent.hide();
      pageController.show();
      break;
    case menuItem.STATISTICS:
      pageController.hide();
      statisticsComponent.show();
      break;
  }
});
