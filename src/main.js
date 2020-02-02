import HeaderProfileComponent from './components/header-profile.js';
import SiteMenuComponent, {MenuItem} from './components/site-menu.js';
import SortComponent from './components/sort.js';
import FilmsSectionComponent from './components/films-section.js';
import PageController from './controllers/page-controller.js';
import FooterComponent from './components/footer.js';
import StatisticsComponent from './components/statistics.js';
import {generateFilmCards} from './mock/film-card-object.js';
import {render, RenderPosition} from './mock/utils.js';

const FILM_LIST_CARD_QUANTITY = 15;

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = document.querySelector(`.header`);

const films = generateFilmCards(FILM_LIST_CARD_QUANTITY);

const headerProfile = new HeaderProfileComponent();
const siteMenu = new SiteMenuComponent(films);
const sort = new SortComponent();
const filmsSection = new FilmsSectionComponent();
const statisticsComponent = new StatisticsComponent(films);
render(siteHeaderElement, headerProfile, RenderPosition.BEFOREEND);
render(siteMainElement, siteMenu, RenderPosition.BEFOREEND);
render(siteMainElement, sort, RenderPosition.BEFOREEND);
render(siteMainElement, filmsSection, RenderPosition.BEFOREEND);
render(siteMainElement, new FooterComponent(films), RenderPosition.BEFOREEND);
render(siteMainElement, statisticsComponent, RenderPosition.BEFOREEND);

const pageController = new PageController(filmsSection, sort);

statisticsComponent.hide();
pageController.render(films);
statisticsComponent.show();

siteMenu.setOnChange((menuItem) => {
  switch (menuItem) {
    case MenuItem.NEW_TASK:
      siteMenu.setActiveItem(MenuItem.TASKS);
      statisticsComponent.hide();
      pageController.show();
      pageController.createTask();
      break;
    case MenuItem.STATISTICS:
      pageController.hide();
      statisticsComponent.show();
      break;
    case MenuItem.TASKS:
      statisticsComponent.hide();
      pageController.show();
      break;
  }
});
