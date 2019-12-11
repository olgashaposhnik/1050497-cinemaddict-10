const getRandomInteger = (min, max) => { // возвращает случайное целое число от min до (max+1)
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};

const getRandomValues = (array) => { // возвращает случайное значение из массива
  const randomIndex = getRandomInteger(0, array.length - 1);
  return array[randomIndex];
};

const createRandomValues = function (values, valuesMin, valuesMax) {
  const valueNumbers = []; // создаем массив с номерами опций
  const valuesQuantity = getRandomInteger(valuesMin, valuesMax); // сгенерировали количество опций
  for (let i = 0; i < valuesQuantity; i++) { // запускаем цикл с количеством итераций равным количеству запланированных опций
    while (valueNumbers.length < valuesQuantity) { // бесконечный цикл, который прерывается только, когда мы наполним свой массив достаточным количеством опций
      const valueNumber = getRandomInteger(0, values.length - 1); // Создаем случайный индекс для массива опций
      // По этому индексу ищем элемент массива values .Если в нашем массиве valueNumbers
      // нет такого элемента, тогда добавляем его. Иначе запускаем новую итерацию бесконечного цикла
      if (valueNumbers.indexOf(values[valueNumber]) === -1) {
        valueNumbers.push(values[valueNumber]);
      }
    }
  }
  // Возвращаем созданный массив
  return valueNumbers;
};

export {getRandomInteger, getRandomValues, createRandomValues};
