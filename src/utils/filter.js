import {FilterType} from '../const.js';

const getInWatchlistMovies = (movies) => {
  return movies.filter((movie) => movie.isWatchlist);
};

const getInHistoryMovies = (movies) => {
  return movies.filter((movie) => movie.isHistory);
};

const getInFavouritesMovies = (movies) => {
  return movies.filter((movie) => movie.isFavourites);
};

export const getMoviesByFilter = (movies, filterType) => {
  switch (filterType) {
    case FilterType.ALL:
      return movies;
    case FilterType.WATCHLIST:
      return getInWatchlistMovies(movies);
    case FilterType.HISTORY:
      return getInHistoryMovies(movies);
    case FilterType.FAVOURITES:
      return getInFavouritesMovies(movies);
  }

  return movies;
};
