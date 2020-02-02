import {getMoviesByFilter} from '../utils/filter.js';
import {FilterType} from '../const.js';

export default class Movies {
  constructor() {
    this._movies = [];

    this._activeFilterType = FilterType.ALL;

    this._filterChangeHandlers = [];
  }

  getMovies() {
    console.log(getMoviesByFilter(this._movies, this._activeFilterType));
    return getMoviesByFilter(this._movies, this._activeFilterType);

  }

  getMoviesAll() {
    return this._movies;
  }

  setMovies(movies) {
    this._movies = Array.from(movies);
  }

  setFilter(filterType) {
    this._activeFilterType = filterType;
    this._callHandlers(this._filterChangeHandlers);
  }

  removeComment(id) {
    const index = this._movies.findIndex((it) => it.id === id);

    if (index === -1) {
      return false;
    }

    this._movies = [].concat(this._movies.slice(0, index), this._movies.slice(index + 1));

    this._callHandlers(this._dataChangeHandlers);

    return true;
  }

  updateMovie(id, movie) {
    const index = this._movies.findIndex((it) => it.id === id);

    if (index === -1) {
      return false;
    }

    this._movies = [].concat(this._movies.slice(0, index), movie, this._movies.slice(index + 1));

    this._callHandlers(this._dataChangeHandlers);

    return true;
  }

  addComment(comment) {
    this._comments = [].concat(comment, this._comments);
    this._callHandlers(this._dataChangeHandlers);
  }

  setFilterChangeHandler(handler) {
    this._filterChangeHandlers.push(handler);
  }

  _callHandlers(handlers) {
    handlers.forEach((handler) => handler());
  }
}
