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

export {generateSorters};
