import {createElementOnPlan, isEqual} from '../utils';

export class Plan {
  static busyCells = [];
  static planCellBusy = [];
  constructor(planGrid, planCell) {
    this.planGrid = planGrid;
    this.planCell = planCell;
    this.btnReset = document.querySelector('.scheduler__action-reset');
    this.size = 66;
  }
  createElements(element, dropElement, xCord, size) {
    const elementClone = element.cloneNode(true);
    elementClone.removeChild(elementClone.querySelector('.object__name'));
    elementClone.children[0].removeAttribute('draggable');
    if (size === 1) {
      createElementOnPlan(elementClone, dropElement, xCord, this.size, size);
      Plan.planCellBusy.push({'id':Number(elementClone.dataset.id), 'cell': [Number(dropElement.dataset.x), Number(dropElement.dataset.y)]});
      Plan.createBusyCells();
    } else {
      createElementOnPlan(elementClone, dropElement, xCord, this.size, size, this.planCell);
      elementClone.querySelector('.figure__button-rotate').addEventListener('click',(evt) => this.checkPossibilityRotate(evt, dropElement, size, elementClone));
      if(size === 2){
        Plan.planCellBusy.push({
          'id':Number(elementClone.dataset.id),
          'cell': [
            [Number(dropElement.dataset.x), Number(dropElement.dataset.y)],
            [Number(dropElement.dataset.x) + (xCord <= 66 ? 1 : -1), Number(dropElement.dataset.y)]
          ]});
        Plan.createBusyCells();
      }
      if(size === 3){
        Plan.planCellBusy.push({
          'id':Number(elementClone.dataset.id),
          'cell': [
            [Number(dropElement.dataset.x), Number(dropElement.dataset.y)],
            [Number(dropElement.dataset.x) + (xCord <= 132 ? 1 : -1), Number(dropElement.dataset.y)],
            // eslint-disable-next-line no-nested-ternary
            [Number(dropElement.dataset.x) + (xCord <= 66 ? 2 : xCord <= 132 ? -1 : -2), Number(dropElement.dataset.y)]
          ]});
        Plan.createBusyCells();
      }
    }
    this.planGrid.append(elementClone);
    this.updatePlan();
  }

  resetRoom() {
    const objElementsPlan = this.planGrid.querySelectorAll('.objects__item');
    this.planCell.forEach((item) => {
      if (item.classList.contains('plan__cell_success')) {
        item.classList.remove('plan__cell_success');
      }
      if (item.classList.contains('plan__cell_error')) {
        item.classList.remove('plan__cell_error');
      }
    });
    objElementsPlan.forEach((item) => {
      item.remove();
      Plan.planCellBusy = [];
      Plan.busyCells = [];
    });
  }

    static createBusyCells() {
      Plan.busyCells = [];
      Plan.planCellBusy.forEach((item) => {
      if(Array.isArray(item.cell[0])) {
        for(let i = 0; i < item.cell.length; i++) {
          Plan.busyCells.push(item.cell[i]);
        }
      } else {
      Plan.busyCells.push(item.cell);
      }
  });
}
  checkPossibilityRotate(evt, cell, size, element) {
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

  updatePlan() {
    const btnDeleteElement = document.querySelectorAll('.figure__button-delete');
    btnDeleteElement.forEach((item) => {
      item.addEventListener('click', (evt) => {
        const deleteElement = evt.currentTarget.parentNode.parentNode.parentNode;
        // eslint-disable-next-line
        Plan.planCellBusy = Plan.planCellBusy.filter((elements)=> elements.id != deleteElement.dataset.id);
        deleteElement.remove();
      });
    });

  }

  init() {
    this.resetRoom();
    const btnRotateElement = document.querySelectorAll('.figure__button-rotate');
    btnRotateElement.forEach((item) => {
      item.addEventListener('click', (evt) => {
        const elementTarget = evt.currentTarget.parentNode.parentNode.parentNode;
        if (!elementTarget.classList.contains('objects__item-rotated')) {
          elementTarget.classList.add('objects__item-rotated');
        } else {
          elementTarget.classList.remove('objects__item-rotated');
        }
      });
    });
    this.updatePlan();
    this.btnReset.addEventListener('click', () => this.resetRoom());
  }
}
