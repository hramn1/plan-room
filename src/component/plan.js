import {createElementOnPlan, isEqual} from '../utils';

export class Plan {
  constructor(planGrid, planCell) {
    this.planGrid = planGrid;
    this.planCell = planCell;
    this.planCellBusy = [];
    this.btnReset = document.querySelector('.scheduler__action-reset');
    this.size = 66;
  }

  createElements(element, dropElement, xCord, size) {
    const elementClone = element.cloneNode(true);
    elementClone.removeChild(elementClone.querySelector('.object__name'));
    elementClone.children[0].removeAttribute('draggable');

    if (size === 1) {
      createElementOnPlan(elementClone, dropElement, xCord, this.size, size);
      this.planCellBusy.push({'id':Number(elementClone.dataset.id), 'cell': [Number(dropElement.dataset.x), Number(dropElement.dataset.y)]});
    } else {
      createElementOnPlan(elementClone, dropElement, xCord, this.size, size, this.planCell);
      elementClone.querySelector('.figure__button-rotate').addEventListener('click',(evt) => this.checkPossibilityRotate(evt, dropElement, size, elementClone));
      if(size === 2 && xCord <= 66){
        this.planCellBusy.push({
          'id':Number(elementClone.dataset.id),
          'cell': [
            [Number(dropElement.dataset.x), Number(dropElement.dataset.y)],
            [Number(dropElement.dataset.x) + 1, Number(dropElement.dataset.y)]
          ]});
      }
      if(size === 2 && xCord > 66){
        this.planCellBusy.push({
          'id':Number(elementClone.dataset.id),
          'cell': [
            [Number(dropElement.dataset.x), Number(dropElement.dataset.y)],
            [Number(dropElement.dataset.x) - 1, Number(dropElement.dataset.y)]
          ]});
      }
      if(size === 3 && xCord <= 66){
        this.planCellBusy.push({
          'id':Number(elementClone.dataset.id),
          'cell': [
            [Number(dropElement.dataset.x), Number(dropElement.dataset.y)],
            [Number(dropElement.dataset.x) + 1, Number(dropElement.dataset.y)],
            [Number(dropElement.dataset.x) + 2, Number(dropElement.dataset.y)]
          ]});
      }
      if(size === 3 && xCord > 66 && xCord <= 132){
        this.planCellBusy.push({
          'id':Number(elementClone.dataset.id),
          'cell': [
            [Number(dropElement.dataset.x), Number(dropElement.dataset.y)],
            [Number(dropElement.dataset.x) + 1, Number(dropElement.dataset.y)],
            [Number(dropElement.dataset.x) - 1, Number(dropElement.dataset.y)]
          ]});
      }
      if(size === 3 && xCord > 132){
        this.planCellBusy.push({
          'id':Number(elementClone.dataset.id),
          'cell': [
            [Number(dropElement.dataset.x), Number(dropElement.dataset.y)],
            [Number(dropElement.dataset.x) - 1, Number(dropElement.dataset.y)],
            [Number(dropElement.dataset.x) - 2, Number(dropElement.dataset.y)]
          ]});
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
      this.planCellBusy = [];
    });
  }

  checkPossibilityRotate(evt, cell, size, element) {
    console.log(this.planCellBusy)
    let rotateElement = this.planCellBusy.filter((cell)=> cell.id == element.dataset.id);
    let busyCells = this.planCellBusy.map((item)=>item.cell)
    for (let i = 0; i < busyCells.length; i++){
      if(Array.isArray(busyCells[i][0])){

      }
    }
    let arrP = [(parseInt(element.style.left) / 66) + 1, (parseInt(element.style.top) / 66) + size];
      for (let i = 0; i < this.planCellBusy.length; i++){
        if(this.planCellBusy[i].cell.some((item)=> isEqual(item, arrP))) {
          element.classList.add('shake-on-hover');
          setTimeout(() => element.classList.remove('shake-on-hover'), 400)
          return;
        }
    }
    if (Number(cell.dataset.y) + Number(size) > 7){
      element.classList.add('shake-on-hover');
      setTimeout(() => element.classList.remove('shake-on-hover'), 400)
      return;
    }
    const elementTarget = evt.currentTarget.parentNode.parentNode.parentNode;


    if (!elementTarget.classList.contains('objects__item-rotated')) {
      elementTarget.classList.add('objects__item-rotated');
    } else {
      elementTarget.classList.remove('objects__item-rotated');
    }
  }

  updatePlan() {
    const btnDeleteElement = document.querySelectorAll('.figure__button-delete');

    btnDeleteElement.forEach((item) => {
      item.addEventListener('click', (evt) => {
        let deleteElement = evt.currentTarget.parentNode.parentNode.parentNode;
        this.planCellBusy = this.planCellBusy.filter((elements)=> elements.id != deleteElement.dataset.id)
        deleteElement.remove();
      });
    });

  }

  init() {
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
    this.planCell.forEach((cell) => {
      if (cell.classList.contains('plan__cell_error')) {
        this.planCellBusy.push({'id': 0, 'cell': [Number(cell.dataset.x), Number(cell.dataset.y)]});
      }
    });
    this.btnReset.addEventListener('click', () => this.resetRoom());
  }
}
