import {getRandomValues, getRandomInteger, createRandomValues} from './utils.js';

const filmsNames = [
  `Побег из Шоушенка`,
  `Зеленая миля`,
  `Форрест Гамп`,
  `Список Шиндлера`,
  `1+1`,
  `Начало`,
  `Леон`,
  `Король Лев`,
  `Бойцовский клуб`,
  `Иван Васильевич меняет профессию`,
  `Жизнь прекрасна`,
  `Достучаться до небес`,
  `Крестный отец`,
  `Криминальное чтиво`,
  `Операция «Ы» и другие приключения Шурика`];

const filmsImages = [
  `made-for-each-other.png`,
  `popeye-meets-sinbad.png`,
  `sagebrush-trail.jpg`,
  `santa-claus-conquers-the-martians.jpg`,
  `the-dance-of-life.jpg`,
  `the-great-flamarion.jpg`,
  `the-man-with-the-golden-arm.jpg`
];

const filmsDescriptions = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  `Cras aliquet varius magna, non porta ligula feugiat eget.`,
  `Fusce tristique felis at fermentum pharetra.`,
  `Aliquam id orci ut lectus varius viverra.`,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
  `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
  `Sed sed nisi sed augue convallis suscipit in sed felis.`,
  `Aliquam erat volutpat.`,
  `Nunc fermentum tortor ac porta dapibus.`,
  `In rutrum ac purus sit amet tempus.`
];

const filmsGenres = [
  `Musical`,
  `Western`,
  `Drama`,
  `Comedy`,
  `Cartoon`,
  `Mystery`
];

const filmsRatings = {
  MIN: 0,
  MAX: 9
};

const months = [
  `January`,
  `February`,
  `March`,
  `April`,
  `May`,
  `June`,
  `July`,
  `August`,
  `September`,
  `October`,
  `November`,
  `December`
];

const years = {
  MIN: 1929,
  MAX: 2019
};

const duration = {
  HOURS_MIN: 1,
  HOURS_MAX: 2,
  MINUTES_MIN: 0,
  MINUTES_MAX: 59
};

const commentsCount = {
  MIN: 0,
  MAX: 30
};

const filmsAttributes = [
  `In Watchlist`,
  `In History`,
  `In Favourites`
];

const commentsText = [
  `Interesting setting and a good cast`,
  `Booooooooooring`,
  `Very very old. Meh`,
  `Almost two hours? Seriously?`,
  `Great!!!`,
  `Masterpiece`
];

const commentsEmoji = [
  `angry`,
  `puke`,
  `sleeping`,
  `smile`,
  `trophy`
];

const commentAuthor = [
  `James Smith`,
  `Michael Smith`,
  `Robert Smith`,
  `Maria Garcia`,
  `David Smith`,
  `Maria Rodriguez`,
  `Mary Smith`,
  `Maria Hernandez`
];

const date = {
  MIN_YEAR: 2000,
  MAX_YEAR: 2019,
  MIN_MONTH: 1,
  MAX_MONTH: 12,
  MIN_DAY: 1,
  MAX_DAY: 31,
  MIN_HOUR: 0,
  MAX_HOUR: 23,
  MIN_MINUTE: 0,
  MAX_MINUTE: 59
};


const generateComment = () => {
  return {
    text: getRandomValues(commentsText),
    emoji: `./images/emoji/` + getRandomValues(commentsEmoji) + `.png`,
    author: getRandomValues(commentAuthor),
    date: getRandomInteger(date.MIN_YEAR, date.MAX_YEAR) + `/` + getRandomInteger(date.MIN_MONTH, date.MAX_MONTH) + `/` + getRandomInteger(date.MIN_DAY, date.MAX_DAY) + ` ` + getRandomInteger(date.MIN_HOUR, date.MAX_HOUR) + `:` + getRandomInteger(date.MIN_MINUTE, date.MAX_MINUTE)
  };
};

const generateComments = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateComment);
};

const generateFilmCard = () => {
  return {
    title: getRandomValues(filmsNames),
    rating: getRandomInteger(filmsRatings.MIN, filmsRatings.MAX) + getRandomInteger(filmsRatings.MIN, filmsRatings.MAX) / 10,
    year: getRandomInteger(years.MIN, years.MAX),
    duration: getRandomInteger(duration.HOURS_MIN, duration.HOURS_MAX) + `h ` + getRandomInteger(duration.MINUTES_MIN, duration.MINUTES_MAX) + `m`,
    genres: createRandomValues(filmsGenres, 1, 3),
    image: `./images/posters/` + getRandomValues(filmsImages),
    description: createRandomValues(filmsDescriptions, 1, 3),
    attributes: createRandomValues(filmsAttributes, 0, 3),
    comments: generateComments(getRandomInteger(commentsCount.MIN, commentsCount.MAX)),
    director: getRandomValues(commentAuthor),
    writers: createRandomValues(commentAuthor, 1, 3),
    actors: createRandomValues(commentAuthor, 1, 3),
    releaseDate: getRandomInteger(date.MIN_DAY, date.MAX_DAY) + ` ` + getRandomValues(months) + ` `
  };
};

const generateFilmCards = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateFilmCard);
};

export {generateFilmCard, generateFilmCards, generateComment, generateComments};
