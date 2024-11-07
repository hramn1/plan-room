import {isEqual} from '../utils';
import {Plan} from './plan';

export function checkPossibilityRotate(evt, cell, size, element) {
  // eslint-disable-next-line
  Plan.createBusyCells();
  const rotateElement = Plan.planCellBusy.filter((cells)=> cells.id == element.dataset.id)[0];
  rotateElement.cell.sort((a,b) => a[0] - b[0]);

  if(!element.classList.contains('objects__item-rotated')) {
    const arrP = [(parseInt(element.style.left, 10) / 66) + 1, (parseInt(element.style.top, 10) / 66) + size];
    if(size === 3) {
      const arrSecondP = [(parseInt(element.style.left, 10) / 66) + 1, (parseInt(element.style.top, 10) / 66) + size - 1];
      for (let i = 0; i < Plan.planCellBusy.length; i++) {
        if (Plan.busyCells.some((item) => isEqual(item, arrSecondP))) {
          element.classList.add('shake-on-hover');
          setTimeout(() => element.classList.remove('shake-on-hover'), 400);
          return;
        }
      }
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
    for (let i = 0; i < Plan.planCellBusy.length; i++) {
      if (Plan.busyCells.some((item) => isEqual(item, arrP))) {
        element.classList.add('shake-on-hover');
        setTimeout(() => element.classList.remove('shake-on-hover'), 400);
        return;
      }
    }
  }
  if (Number(cell.dataset.y) + Number(size) > 7){
    element.classList.add('shake-on-hover');
    setTimeout(() => element.classList.remove('shake-on-hover'), 400);
    return;
  }

  if (!element.classList.contains('objects__item-rotated')) {
    element.classList.add('objects__item-rotated');
    // eslint-disable-next-line
    Plan.planCellBusy = Plan.planCellBusy.filter((item)=> item.id != element.dataset.id);
    if(size === 2) {
      rotateElement.cell[1] = [rotateElement.cell[1][0] - 1, rotateElement.cell[1][1] + 1];
    } else {
      rotateElement.cell[1] = [rotateElement.cell[1][0] - 1, rotateElement.cell[1][1] + 1] ;
      rotateElement.cell[2] = [rotateElement.cell[2][0] - 2, rotateElement.cell[2][1] + 2] ;

    }
    Plan.planCellBusy.push(rotateElement);
  } else {
    // eslint-disable-next-line
    Plan.planCellBusy = Plan.planCellBusy.filter((item)=> item.id != element.dataset.id);
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
