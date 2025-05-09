import {isEqual} from '@/utils';
import {Plan} from './plan';
import {SIZE_ELEMENTS} from '@/constants';

function checkBusyCellsRotate(arrayP, element) {
  for (let i = 0; i < Plan.planCellBusy.length; i++) {
    if (Plan.busyCells.some((item) => isEqual(item, arrayP))) {
      element.classList.add('shake-on-hover');
      setTimeout(() => element.classList.remove('shake-on-hover'), 400);
      return;
    }
  }
}

export function checkPossibilityRotate(evt, cell, size, element) {
  Plan.createBusyCells();
  const rotateElement = Plan.planCellBusy.filter((cells)=> cells.id === Number(element.dataset.id)).shift();

  rotateElement.cell.sort((a,b) => a[0] - b[0]);

  if(!element.classList.contains('objects__item-rotated')) {
    const arrP = [(parseInt(element.style.left, 10) / 66) + 1, (parseInt(element.style.top, 10) / 66) + size];
    if(size === SIZE_ELEMENTS.SizeThree) {
      const arrSecondP = [(parseInt(element.style.left, 10) / 66) + 1, (parseInt(element.style.top, 10) / 66) + size - 1];
      checkBusyCellsRotate(arrSecondP, element);
    }
    for (let i = 0; i < Plan.planCellBusy.length; i++) {
      if (Plan.busyCells.some((item) => isEqual(item, arrP))) {
        element.classList.add('shake-on-hover');
        setTimeout(() => element.classList.remove('shake-on-hover'), 400);
        return;
      }
    }
  } else if(element.classList.contains('objects__item-rotated')) {
    const arrP = [(parseInt(element.style.left, 10) / 66) + size, (parseInt(element.style.top, 10) / 66) + 1 ];
    checkBusyCellsRotate(arrP, element);
  }
  if (Number(cell.dataset.y) + Number(size) > 7){
    element.classList.add('shake-on-hover');
    setTimeout(() => element.classList.remove('shake-on-hover'), 400);
    return;
  }

  if (!element.classList.contains('objects__item-rotated')) {
    element.classList.add('objects__item-rotated');
    Plan.planCellBusy = Plan.planCellBusy.filter((item)=> item.id !== element.dataset.id);
    if(size === 2) {
      rotateElement.cell[1] = [rotateElement.cell[1][0] - 1, rotateElement.cell[1][1] + 1];
    } else {
      rotateElement.cell[1] = [rotateElement.cell[1][0] - 1, rotateElement.cell[1][1] + 1];
      rotateElement.cell[2] = [rotateElement.cell[2][0] - 2, rotateElement.cell[2][1] + 2];

    }
    Plan.planCellBusy.push(rotateElement);
  } else {
    Plan.planCellBusy = Plan.planCellBusy.filter((item)=> item.id !== element.dataset.id);
    if(size === 2) {
      rotateElement.cell[1] = [rotateElement.cell[1][0] + 1, rotateElement.cell[1][1] - 1];
    } else {
      rotateElement.cell[1] = [rotateElement.cell[1][0] + 1, rotateElement.cell[1][1] - 1];
      rotateElement.cell[2] = [rotateElement.cell[2][0] + 2, rotateElement.cell[2][1] - 2];
    }
    Plan.planCellBusy.push(rotateElement);
    element.classList.remove('objects__item-rotated');
  }
}
