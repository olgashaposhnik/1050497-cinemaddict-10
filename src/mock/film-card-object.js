import {getRandomValues} from 'utils.js';
import {getRandomInteger} from 'utils.js';
import {createRandomValues} from 'utils.js';

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
  MAX: 10
};

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
  MAX: 100
};

const generateFilmCard = () => {
  return {
    title: getRandomValues(filmsNames),
    rating: getRandomInteger(filmsRatings.MIN, filmsRatings.MAX),
    year: getRandomInteger(years.MIN, years.MAX),
    duration: getRandomInteger(duration.HOURS_MIN, duration.HOURS_MAX) + `h ` + getRandomInteger(duration.MINUTES_MIN, duration.MINUTES_MAX) + `m`,
    genre: getRandomValues(filmsGenres),
    image: `././public/images/posters/` + getRandomValues(filmsImages),
    description: createRandomValues(filmsDescriptions),
    comments: getRandomInteger(commentsCount.MIN, commentsCount.MAX) + ` comments`
  };
};

const generateFilmCards = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateFilmCard);
};

export {generateFilmCard, generateFilmCards};
