import {FilterType} from '../const.js';

const getInWatchlistMovies = (movies) => {
  return movies.filter((movie) => movie.inWatchlist);
};

const getInHistoryMovies = (movies) => {
  return movies.filter((movie) => movie.inHistory);
};

const getInFavouritesMovies = (movies) => {
  return movies.filter((movie) => movie.inFavourites);
};

export const getMoviesByFilter = (movies, filterType) => {
  switch (filterType) {
    case FilterType.ALL:
      return movies; // ПРОВЕРИТЬ!!!!!!!!!!!!!
    case FilterType.WATCHLIST:
      return getInWatchlistMovies(movies);
    case FilterType.HISTORY:
      return getInHistoryMovies(movies);
    case FilterType.FAVORITES:
      return getInFavouritesMovies(movies);
  }

  return movies;
};
