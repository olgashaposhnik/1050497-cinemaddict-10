const sortersNames = [
  `default`, `date`, `rating`
];

const generateSorters = () => {
  return sortersNames.map((it) => {
    return {
      name: it,
      count: Math.floor(Math.random() * 10), // создает до 10 штук сортировок
    };
  });
};

const sortFilmsByOptions = (array) => {
  array.sort((options) => array.attributes.includes(options));
  return array.length;
};

const sortFilmsByDate = (array) => {
  array.sort((a, b) => a.year - b.year);
};

const sortFilmsByRating = (array) => {
  array.sort((a, b) => b.rating - a.rating);
};

export {generateSorters, sortFilmsByDate, sortFilmsByRating, sortFilmsByOptions};

