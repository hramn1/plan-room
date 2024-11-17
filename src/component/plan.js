import {createElementOnPlan} from '@/utils';
import {checkPossibilityRotate} from './rotate-obj';

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
      elementClone.querySelector('.figure__button-rotate').addEventListener('click',(evt) => checkPossibilityRotate(evt, dropElement, size, elementClone));
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
