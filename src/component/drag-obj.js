import {Plan} from './plan.js';
import {addCellSuccess, addCellSuccessThree, isEqual, setSizeObj} from '../utils.js';

export class DragObj {
  constructor(draggableObjElements, planCell, planGrid) {
    this.elementsDrag = draggableObjElements;
    this.planCell = planCell;
    this.planGrid = planGrid;
    this.xCord = 0;
    this.size = 2;
  }

  startDrag() {
    this.elementsDrag.forEach((item) => {
      item.addEventListener('dragstart', (evt) => {
        const rect = evt.target.getBoundingClientRect();
        this.xCord = evt.clientX - rect.left;
        this.size = setSizeObj(evt.target);
        evt.dataTransfer.setData('id', evt.target.dataset.id);
      });
    });
  }

  dragenter() {
    this.planGrid.addEventListener('dragover', (evt) => {
      this.planCell.forEach((it) => {
        it.classList.add('plan__cell_hack');
      });
      Plan.createBusyCells();
      const arrEvtTarget = [Number(evt.target.dataset.x), Number(evt.target.dataset.y)];

      if (evt.target.classList.contains('plan__cell')) {
        if (this.size === 1) {
          evt.target.classList.add('plan__cell_success');
          Plan.busyCells.forEach((it)=>{
            if(isEqual(arrEvtTarget, it)){
              evt.target.classList.add('plan__cell_error');
            } else {
              evt.target.classList.add('plan__cell_success');
            }
          });
        } else if (this.size === 2) {
          addCellSuccess(this.planCell, evt.target, this.xCord);
        } else if (this.size === 3) {
          addCellSuccessThree(this.planCell, evt.target, this.xCord);
        }
      }
    }, true);
  }

  dragleave() {
    this.planCell.forEach((it) => {
      this.planGrid.addEventListener('dragleave', () => {
        if (this.size === 1) {
          if(it.classList.contains('plan__cell_error')){
            it.classList.remove('plan__cell_error');
          }
          it.classList.remove('plan__cell_success');
          // it.classList.remove('plan__cell_error');
        } else {
          this.planCell.forEach((item) => {
            if (Number(item.dataset.y === it.dataset.y)) {
              item.classList.remove('plan__cell_success');
            }
          });
        }
      });
    });
  }

  drop(planContainer) {
    this.planGrid.addEventListener('dragover', (evt) => {
      evt.preventDefault();
    });
    this.planGrid.addEventListener('drop', (evt) => {
      this.planCell.forEach((it)=>{
        it.classList.remove('plan__cell_hack');
      });
      const elementDrop = Array.from(this.elementsDrag).filter((item) => item.children[0].dataset.id === evt.dataTransfer.getData('id'));
      evt.stopPropagation();
      if (evt.target.classList.contains('plan__cell_success') && !evt.target.classList.contains('plan__cell_error')) {
        if (this.size === 2 && this.xCord > 66) {
          evt.target.previousElementSibling.classList.remove('plan__cell_success');
        } else if (this.size === 2 && this.xCord <= 66) {
          evt.target.nextElementSibling.classList.remove('plan__cell_success');
        } else if (this.size === 3 && this.xCord <= 66) {
          evt.target.nextElementSibling.classList.remove('plan__cell_success');
          evt.target.nextElementSibling.nextElementSibling.classList.remove('plan__cell_success');
        } else if (this.size === 3 && this.xCord > 66 && this.xCord <= 132) {
          evt.target.nextElementSibling.classList.remove('plan__cell_success');
          evt.target.previousElementSibling.classList.remove('plan__cell_success');
        } else if (this.size === 3 && this.xCord > 132) {
          evt.target.previousElementSibling.classList.remove('plan__cell_success');
          evt.target.previousElementSibling.previousElementSibling.classList.remove('plan__cell_success');
        }
        planContainer.createElements(elementDrop[0], evt.target, this.xCord, this.size);
        evt.target.classList.remove('plan__cell_success');
      } else {
        evt.target.classList.remove('plan__cell_success');
        evt.target.classList.remove('plan__cell_error');
      }
    });
  }

  init() {
    const planContainer = new Plan(this.planGrid, this.planCell);
    planContainer.init();
    this.startDrag();
    this.dragleave();
    this.dragenter();
    this.drop(planContainer);
  }
}
