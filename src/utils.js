import {buttonOneSize, buttonSize, elementsInDrag} from './data';
import {COORDINATE_CORD, NEXT_PREV_ELEMENTS, SIZE_ELEMENTS} from '@/constants';

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

export const generateRandomIndex = (a, b) => {
  const indexNumbers = [];
  return () => {
    let currentIndex = getRandomInteger(a, b);
    if (indexNumbers.length === Math.floor(Math.max(a, b))) {
      return '';
    }
    while (indexNumbers.includes(currentIndex)) {
      currentIndex = getRandomInteger(a, b);
    }
    indexNumbers.push(currentIndex);
    return currentIndex;
  };
};
export const setSizeObj = (elem) => {
  let size;
  if (elementsInDrag.sizeOne.includes(elem.dataset.id)) {
    size = 1;
  } else if (elementsInDrag.sizeThree.includes(elem.dataset.id)) {
    size = 3;
  } else {
    size = 2;
  }
  return size;
};
export const addCellSuccess = (planCells, elem, xCord) => {
  planCells.forEach((item) => {
    if(item.classList.contains('plan__cell_success')) {
      item.classList.remove('plan__cell_error');
    }
    if (Number(item.dataset.x) === elem.dataset.x - (xCord <= 66 ? -1 : 1) && Number(item.dataset.y === elem.dataset.y)) {
      item.classList.add('plan__cell_success');
      elem.classList.add('plan__cell_success');
    }
  });
};
export const addCellSuccessThree = (planCells, elem, xCord) => {
  let shiftX, shiftXSecond;
  if (xCord <= 66) {
    shiftX = 1;
    shiftXSecond = 2;
  } else if (xCord > 132) {
    shiftX = -2;
    shiftXSecond = -1;
  } else {
    shiftX = -1;
    shiftXSecond = 1;
  }
  planCells.forEach((item) => {
    if (Number(item.dataset.x) === Number(elem.dataset.x) + shiftX && Number(item.dataset.y === elem.dataset.y)) {
      item.classList.add('plan__cell_success');
      elem.classList.add('plan__cell_success');
    }
    if (Number(item.dataset.x) === Number(elem.dataset.x) + shiftXSecond && Number(item.dataset.y === elem.dataset.y)) {
      item.classList.add('plan__cell_success');
    }
  });
};
export const createElementOnPlan = (elementClone, dropElement, xCord, size, sizeElement) => {
  let shiftX, shiftXSecond;
  if (xCord <= 66) {
    shiftX = 1;
    shiftXSecond = 1;
  } else if (xCord > 132) {
    shiftX = 3;
    shiftXSecond = 1;
  } else {
    shiftX = 2;
    shiftXSecond = 1;
  }
  elementClone.children[0].children[0].innerHTML = (sizeElement === 1) ? buttonOneSize : buttonSize;
  elementClone.style.left = `${(dropElement.dataset.x - shiftX) * size}px`;
  elementClone.style.top = `${(dropElement.dataset.y - shiftXSecond) * size}px`;
  elementClone.dataset.id = generateRandomIndex(1, 100)();

};

export function isEqual(array1, array2) {
  return JSON.stringify(array1) === JSON.stringify(array2);
}

export function dragCheck(evt, it, afterTwo) {
  const arrTarget = !afterTwo ? this.arrEvtTargetSecond : this.arrEvtTargetFirst;
  if (isEqual(this.arrEvtTarget, it) || isEqual(arrTarget, it)) {
    evt.target.classList.add('plan__cell_error');
    if (this.arrEvtTarget[0] !== 10 && !afterTwo) {
      evt.target[NEXT_PREV_ELEMENTS.Next]?.classList?.add('plan__cell_error');
    } else if (afterTwo) {
      evt.target[NEXT_PREV_ELEMENTS.Prev]?.classList.add('plan__cell_error');
    }
  } else {
    evt.target.classList?.add('plan__cell_success');
  }
}

export function clearCells(size, cordsX, element) {
  if (size === SIZE_ELEMENTS.SizeTwo && cordsX > COORDINATE_CORD.AfterTwo) {
    element.previousElementSibling.classList.remove('plan__cell_success');
  } else if (size === SIZE_ELEMENTS.SizeTwo && cordsX <= COORDINATE_CORD.AfterTwo) {
    element.nextElementSibling.classList.remove('plan__cell_success');
  } else if (size === SIZE_ELEMENTS.SizeThree && cordsX <= COORDINATE_CORD.AfterTwo) {
    element.nextElementSibling.classList.remove('plan__cell_success');
    element.nextElementSibling.nextElementSibling.classList.remove('plan__cell_success');
  } else if (size === SIZE_ELEMENTS.SizeThree && cordsX > COORDINATE_CORD.AfterTwo && cordsX <= COORDINATE_CORD.AfterThree) {
    element.nextElementSibling.classList.remove('plan__cell_success');
    element.previousElementSibling.classList.remove('plan__cell_success');
  } else if (size === SIZE_ELEMENTS.SizeThree && cordsX > COORDINATE_CORD.AfterThree) {
    element.previousElementSibling.classList.remove('plan__cell_success');
    element.previousElementSibling.previousElementSibling.classList.remove('plan__cell_success');
  }
}
