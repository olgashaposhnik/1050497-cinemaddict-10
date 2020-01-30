import {sortFilmsByOptions} from '../mock/sort.js';
import AbstractComponent from './abstract-component.js';

export const MenuItem = {
  ALL_MOVIES: `all`,
  WATCHLIST: `watchlist`,
  HISTORY: `history`,
  FAVOURITES: `favorites`,
  STATISTICS: `stats`,
};

export default class SiteMenu extends AbstractComponent {
  constructor(filmCards) {
    super();

    this._filmCards = filmCards;
  }

  getTemplate() {
    return (
      `<nav class="main-navigation">
        <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
        <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">${sortFilmsByOptions(this._filmCards, `inWatchlist`)}</span></a>
        <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">${sortFilmsByOptions(this._filmCards, `inHistory`)}</span></a>
        <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">${sortFilmsByOptions(this._filmCards, `inFavourites`)}</span></a>
        <a href="#stats" class="main-navigation__item main-navigation__item--additional">Stats</a>
      </nav>
      `
    ).trim();
  }

  setActiveItem(menuItem) {
    const item = this.getElement().querySelector(`href="#${menuItem}"`);

    if (item) {
      item.checked = true;
    }
  }

  setOnChange(handler) {
    this.getElement().addEventListener(`change`, (evt) => {
      if (evt.target.tagName !== `A`) {
        return;
      }

      const menuItem = evt.target.id;

      handler(menuItem);
    });
  }
}
