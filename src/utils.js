import {buttonOneSize, buttonSize, elementsInDrag} from './data';
import {COORDINATE_CORD, NEXT_PREV_ELEMENTS, SIZE_ELEMENTS} from '@/constants';
import {Plan} from '@component/plan';

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
  if (elementsInDrag.sizeOne.includes(elem.dataset.id)) {
    return SIZE_ELEMENTS.SizeOne;
  }

  if (elementsInDrag.sizeThree.includes(elem.dataset.id)) {
    return SIZE_ELEMENTS.SizeThree;
  }

  return SIZE_ELEMENTS.SizeTwo;
};

/**
 * Старая логика подсветки. Можно удалить позже, если нигде больше не используется.
 */
export const addCellSuccess = (planCells, elem, xCord) => {
  planCells.forEach((item) => {
    if (item.classList.contains('plan__cell_success')) {
      item.classList.remove('plan__cell_error');
    }

    if (
      Number(item.dataset.x) === Number(elem.dataset.x) - (xCord <= 66 ? -1 : 1) &&
      Number(item.dataset.y) === Number(elem.dataset.y)
    ) {
      item.classList.add('plan__cell_success');
      elem.classList.add('plan__cell_success');
    }
  });
};

/**
 * Старая логика подсветки для size=3. Можно удалить позже, если нигде больше не используется.
 */
export const addCellSuccessThree = (planCells, elem, xCord) => {
  let shiftX;
  let shiftXSecond;

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
    if (
      Number(item.dataset.x) === Number(elem.dataset.x) + shiftX &&
      Number(item.dataset.y) === Number(elem.dataset.y)
    ) {
      item.classList.add('plan__cell_success');
      elem.classList.add('plan__cell_success');
    }

    if (
      Number(item.dataset.x) === Number(elem.dataset.x) + shiftXSecond &&
      Number(item.dataset.y) === Number(elem.dataset.y)
    ) {
      item.classList.add('plan__cell_success');
    }
  });
};

/**
 * НОВАЯ логика: ставим объект по первой ячейке объекта,
 * вычисленной через grabbedIndex.
 */
export const createElementOnPlan = (
  elementClone,
  dropElement,
  xCord,
  size,
  sizeElement,
  grabbedIndex = 0,
  options = {},
) => {
  const targetX = Number(dropElement.dataset.x);
  const targetY = Number(dropElement.dataset.y);
  const startX = targetX - grabbedIndex;

  elementClone.children[0].children[0].innerHTML =
    sizeElement === SIZE_ELEMENTS.SizeOne ? buttonOneSize : buttonSize;

  elementClone.style.left = `${(startX - 1) * size}px`;
  elementClone.style.top = `${(targetY - 1) * size}px`;
  elementClone.dataset.id = options.id ?? generateRandomIndex(1, 100)();
};

export function isEqual(array1, array2) {
  return JSON.stringify(array1) === JSON.stringify(array2);
}

/**
 * Старая логика проверки drag. Оставлена только чтобы не ломать старые места.
 */
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

/**
 * Старая очистка. Можно удалить позже.
 */
export function clearCells(size, cordsX, element) {
  if (size === SIZE_ELEMENTS.SizeTwo && cordsX > COORDINATE_CORD.AfterTwo) {
    element.previousElementSibling?.classList.remove('plan__cell_success');
  } else if (size === SIZE_ELEMENTS.SizeTwo && cordsX <= COORDINATE_CORD.AfterTwo) {
    element.nextElementSibling?.classList.remove('plan__cell_success');
  } else if (size === SIZE_ELEMENTS.SizeThree && cordsX <= COORDINATE_CORD.AfterTwo) {
    element.nextElementSibling?.classList.remove('plan__cell_success');
    element.nextElementSibling?.nextElementSibling?.classList.remove('plan__cell_success');
  } else if (
    size === SIZE_ELEMENTS.SizeThree &&
    cordsX > COORDINATE_CORD.AfterTwo &&
    cordsX <= COORDINATE_CORD.AfterThree
  ) {
    element.nextElementSibling?.classList.remove('plan__cell_success');
    element.previousElementSibling?.classList.remove('plan__cell_success');
  } else if (size === SIZE_ELEMENTS.SizeThree && cordsX > COORDINATE_CORD.AfterThree) {
    element.previousElementSibling?.classList.remove('plan__cell_success');
    element.previousElementSibling?.previousElementSibling?.classList.remove('plan__cell_success');
  }
}

/**
 * Старая функция. Можно удалить позже, если всё переведёшь на getCellsForPlacementByGrab.
 */
export const getCellsForPlacement = (dropElement, xCord, size) => {
  const x = Number(dropElement.dataset.x);
  const y = Number(dropElement.dataset.y);

  if (size === SIZE_ELEMENTS.SizeOne) {
    return [[x, y]];
  }

  if (size === SIZE_ELEMENTS.SizeTwo) {
    return [
      [x, y],
      [x + (xCord <= COORDINATE_CORD.AfterTwo ? 1 : -1), y],
    ];
  }

  return [
    [x, y],
    [x + (xCord <= COORDINATE_CORD.AfterThree ? 1 : -1), y],
    [x + (xCord <= COORDINATE_CORD.AfterTwo ? 2 : xCord <= COORDINATE_CORD.AfterThree ? -1 : -2), y],
  ];
};

export const getPaletteItemId = (element) => {
  return element?.querySelector('[data-id]')?.dataset?.id ?? null;
};

export const serializePlanItems = (planGrid) => {
  const elements = Array.from(planGrid.querySelectorAll('.objects__item'));

  return elements.map((item) => ({
    id: Number(item.dataset.id),
    sourceId: item.dataset.sourceId,
    left: item.style.left,
    top: item.style.top,
    rotated: item.classList.contains('objects__item-rotated'),
    size: setSizeObj({dataset: {id: item.dataset.sourceId}}),
  }));
};

/**
 * Определяем, какую ячейку объекта схватили.
 */
export function getGrabbedCellIndex(xCord, size) {
  if (size === SIZE_ELEMENTS.SizeOne) {
    return 0;
  }

  if (size === SIZE_ELEMENTS.SizeTwo) {
    return xCord <= COORDINATE_CORD.AfterTwo ? 0 : 1;
  }

  if (size === SIZE_ELEMENTS.SizeThree) {
    if (xCord <= COORDINATE_CORD.AfterThreeFirst) {
      return 0;
    }

    if (xCord <= COORDINATE_CORD.AfterThreeSecond) {
      return 1;
    }

    return 2;
  }

  return 0;
}

/**
 * Вычисляем клетки, которые должен занять объект,
 * если курсор сейчас над targetCell и схвачен grabbedIndex.
 */
export function getCellsForPlacementByGrab(targetCell, grabbedIndex, size) {
  const x = Number(targetCell.dataset.x);
  const y = Number(targetCell.dataset.y);
  const startX = x - grabbedIndex;
  const cells = [];

  for (let i = 0; i < size; i++) {
    cells.push([startX + i, y]);
  }

  return cells;
}

/**
 * Проверяем, влезают ли клетки в поле.
 */
export function isCellsInsidePlan(cells, maxX = 10, maxY = 7) {
  return cells.every(([x, y]) => x >= 1 && x <= maxX && y >= 1 && y <= maxY);
}

/**
 * Проверяем пересечение с занятыми клетками.
 */
export function hasBusyCollision(cells, ignoreId = null) {
  return cells.some(([x, y]) =>
    Plan.planCellBusy.some((item) => {
      if (ignoreId !== null && Number(item.id) === Number(ignoreId)) {
        return false;
      }

      const occupiedCells = Array.isArray(item.cell[0]) ? item.cell : [item.cell];

      return occupiedCells.some(([busyX, busyY]) => busyX === x && busyY === y);
    }),
  );
}

/**
 * Подсветка будущего размещения.
 */
export function highlightPlacement(planCell, cells, status) {
  planCell.forEach((cell) => {
    const x = Number(cell.dataset.x);
    const y = Number(cell.dataset.y);
    const match = cells.some(([cellX, cellY]) => cellX === x && cellY === y);

    cell.classList.remove('plan__cell_success', 'plan__cell_error');

    if (match) {
      cell.classList.add(status === 'error' ? 'plan__cell_error' : 'plan__cell_success');
    }
  });
}

/**
 * Очистка подсветки по уже рассчитанным клеткам размещения.
 */
export function clearCellsByPlacement(planCell, cells) {
  planCell.forEach((cell) => {
    const x = Number(cell.dataset.x);
    const y = Number(cell.dataset.y);
    const match = cells.some(([cellX, cellY]) => cellX === x && cellY === y);

    if (match) {
      cell.classList.remove('plan__cell_success', 'plan__cell_error');
    }
  });
}
