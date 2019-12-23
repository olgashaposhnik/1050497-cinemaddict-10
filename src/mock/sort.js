const sortersNames = [
  `default`, `date`, `rating`
];

const generateSorters = () => {
  return sortersNames.map((it) => {
    return {
      name: it
    };
  });
};

const sortFilmsByOptions = (array, key) => {
  const filteredArray = array.filter((item) => item[key] === `true`);
  return filteredArray.length;
};

const sortFilmsByDate = (array) => {
  array.sort((a, b) => a.year - b.year);
};

const sortFilmsByRating = (array) => {
  array.sort((a, b) => b.rating - a.rating);
};

export {generateSorters, sortFilmsByDate, sortFilmsByRating, sortFilmsByOptions};

