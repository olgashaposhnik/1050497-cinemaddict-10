import {getRandomInteger} from './utils.js';

const filmCount = {
  MIN: 0,
  MAX: 50
};

const userRatings = {
  NO_RATING: ``,
  NOVICE: `Novice`,
  FAN: `Fan`,
  MOVIE_BUFF: `Movie Buff`
};

const generateProfileRating = () => {
  const profileRating = getRandomInteger(filmCount.MIN, filmCount.MAX);
  if (profileRating === 0) {
    return userRatings.NO_RATING;
  } else if (profileRating > 0 && profileRating < 10) {
    return userRatings.NOVICE;
  } else if (profileRating > 10 && profileRating < 20) {
    return userRatings.FAN;
  } else {
    return userRatings.MOVIE_BUFF;
  }
};

export {generateProfileRating};
