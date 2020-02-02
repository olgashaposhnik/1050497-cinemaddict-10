import SiteMenuComponent from '../components/site-menu.js'; // было filter
import {render, replace, RenderPosition} from '../utils/utils.js';
import {FilterType} from '../const.js';
import {getMoviesByFilter} from '../utils/filter.js';

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
    // const filters = Object.values(FilterType).map((filterType) => {
    //   return {
    //     name: filterType,
    //     count: getMoviesByFilter(allMovies, filterType).length,
    //     checked: filterType === this._activeFilterType,
    //   };
    // });
    const oldComponent = this._filterComponent;

    this._filterComponent = new SiteMenuComponent(allMovies); // ПЕРЕПИСАТЬ КОМПОНЕНТ!!!
    this._filterComponent.setFilterChangeHandler(this._onFilterChange);

    if (oldComponent) {
      replace(this._filterComponent, oldComponent);
    } else {
      render(container, this._filterComponent, RenderPosition.BEFOREEND);
    }
  }

  _onFilterChange(filterType) {
    this._moviesModel.setFilter(filterType);
    this._activeFilterType = filterType;
  }
}
