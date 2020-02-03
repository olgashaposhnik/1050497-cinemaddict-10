import SiteMenuComponent from '../components/site-menu.js';
import {render, replace, RenderPosition} from '../utils/utils.js';
import {FilterType} from '../const.js';

export default class FilterController {
  constructor(container, moviesModel) {
    this._container = container;
    this._moviesModel = moviesModel;

    this._activeFilterType = FilterType.ALL;
    this._filterComponent = null;

    this._onFilterChange = this._onFilterChange.bind(this);
  }

  render() {
    const container = this._container;
    const allMovies = this._moviesModel.getMoviesAll();
    const oldComponent = this._filterComponent;

    this._filterComponent = new SiteMenuComponent(allMovies);
    this._filterComponent.setFilterChangeHandler(this._onFilterChange);

    if (oldComponent) {
      replace(this._filterComponent, oldComponent);
    } else {
      render(container, this._filterComponent, RenderPosition.BEFOREEND);
    }
  }

  onMainNavFilterChange(menuItem) {
    switch (menuItem) {
      case menuItem.ALL_MOVIES:
        this._filterComponent.setActiveItem(menuItem.ALL_MOVIES);
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
  }

  _onFilterChange(filterType) {
    this._moviesModel.setFilter(filterType);
    this._activeFilterType = filterType;
  }
}
