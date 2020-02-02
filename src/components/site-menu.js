import {sortFilmsByOptions} from '../mock/sort.js';
import AbstractComponent from './abstract-component.js';
import {FilterType} from '../const.js';

// const FILTER_ID_PREFIX = `filter__`;

// const getFilterNameById = (id) => {
//   return id.substring(FILTER_ID_PREFIX.length);
// };

export default class SiteMenu extends AbstractComponent {
  constructor(filmCards) {
    super();

    this._filmCards = filmCards;
  }

  getTemplate() {
    return (
      `<nav class="main-navigation">
        <a href="#all" data-filter-type="${FilterType.ALL}" class="main-navigation__item main-navigation__item--active">All movies</a>
        <a href="#watchlist" data-filter-type="${FilterType.WATCHLIST}" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">${sortFilmsByOptions(this._filmCards, `isWatchlist`)}</span></a>
        <a href="#history" data-filter-type="${FilterType.HISTORY}" class="main-navigation__item">History <span class="main-navigation__item-count">${sortFilmsByOptions(this._filmCards, `isHistory`)}</span></a>
        <a href="#favorites" data-filter-type="${FilterType.FAVOURITES}" class="main-navigation__item">Favorites <span class="main-navigation__item-count">${sortFilmsByOptions(this._filmCards, `isFavourites`)}</span></a>
        <a href="#stats" class="main-navigation__item main-navigation__item--additional">Stats</a>
      </nav>
      `
    ).trim();
  }

  setFilterChangeHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      // evt.target.dataset.FilterType
      // const filterName = getFilterNameById(evt.target.id);
      handler(evt.target.dataset.filterType);
    });
  }
}
