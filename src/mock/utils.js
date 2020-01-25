import moment from 'moment';

const formatTime = (date) => {
  return moment(date).format(`hh:mm A`); // проверить, тот ли формат
};

const formatDate = (date) => {
  return moment(date).format(`DD MMMM YYYY`);
};

const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

const render = (container, component, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(component.getElement());
      break;
    case RenderPosition.BEFOREEND:
      container.append(component.getElement());
      break;
  }
};

const replace = (newComponent, oldComponent) => {
  const parentElement = oldComponent.getElement().parentElement;
  const newElement = newComponent.getElement();
  const oldElement = oldComponent.getElement();

  const isExistElements = !!(parentElement && newElement && oldElement);

  if (isExistElements && parentElement.contains(oldElement)) {
    parentElement.replaceChild(newElement, oldElement);
  }
};

const remove = (component) => {
  if (component.getElement) {
    component.getElement().remove();
  }
  component.removeElement();
};

const getRandomInteger = (min, max) => { // возвращает случайное целое число от min до (max+1)
  const rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};

const getRandomValues = (array) => { // возвращает случайное значение из массива
  const randomIndex = getRandomInteger(0, array.length - 1);
  return array[randomIndex];
};

/**
 * @description возвращает случайное булево значение
 * @return {boolean}
 */
const getRandomBool = () => {
  return Math.random() > 0.5;
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

export {getRandomInteger, getRandomValues, createRandomValues, RenderPosition, createElement, render, replace, remove, formatTime, formatDate, getRandomBool};
