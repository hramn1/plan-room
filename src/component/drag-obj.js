import {Plan} from '@component/plan.js';
import {addCellSuccess, addCellSuccessThree, clearCells, dragCheck, isEqual, setSizeObj} from '@/utils.js';
import {COORDINATE_CORD} from '@/constants';

export class DragObj {
  constructor(draggableObjElements, planCell, planGrid) {
    this.elementsDrag = draggableObjElements;
    this.planCell = planCell;
    this.planGrid = planGrid;
    this.xCord = 0;
    this.size = 0;
    this.arrEvtTarget = null;
    this.arrEvtTargetSecond = null;
    this.arrEvtTargetFirst = null;
    this.dragElementNow = null;
  }

  startDrag() {
    this.elementsDrag.forEach((item) => {
      item.addEventListener('dragstart', (evt) => {
        const rect = evt.target.getBoundingClientRect();
        this.xCord = evt.clientX - rect.left;
        this.size = setSizeObj(evt.target);
        this.dragElementNow = evt.target;
        evt.dataTransfer.setData('id', evt.target.dataset.id);
      });
    });
  }

  #utilsDragObj(evt) {
    this.arrEvtTarget = [Number(evt.target.dataset.x), Number(evt.target.dataset.y)];
    if (evt.target.nextElementSibling !== null) {
      this.arrEvtTargetSecond = [Number(evt.target?.nextElementSibling?.dataset.x), Number(evt.target?.nextElementSibling?.dataset.y)];
      this.arrEvtTargetFirst = [Number(evt.target?.previousElementSibling?.dataset.x), Number(evt.target?.previousElementSibling?.dataset.y)];
    }
  }

  #checkBusyCells(evt, size = 1) {
    if (size === 1) {
      Plan.busyCells.forEach((it) => {
        if (isEqual(this.arrEvtTarget, it)) {
          evt.target.classList.add('plan__cell_error');
        } else {
          evt.target.classList.add('plan__cell_success');
        }
      });
    } else if (size === 2) {
      Plan.busyCells.forEach((it) => {
        if (this.xCord <= COORDINATE_CORD.AfterTwo) {
          dragCheck.call(this, evt, it, false);
        }
        if (this.xCord > COORDINATE_CORD.AfterTwo) {
          dragCheck.call(this, evt, it, true);
        }
      });
    }
  }

  dragenter() {
    // document.addEventListener('dragover', (evt) => {
    //
    //   if (evt.target.classList.contains('plan__cell')) {
    //     this.dragElementNow = evt.target;
    //   }
    //   if (!evt.target.classList.contains('plan__cell') && this.dragElementNow.dataset.x === '1') {
    //     console.log(4)
    //     if (evt.clientY > 120 && evt.clientY < (120 + (6 * 66))) {
    //       this.planCell.forEach((item) => {
    //         if (item.dataset.y == Math.floor(evt.clientY - 120) / 66 && item.dataset.x === '1') {
    //           item.classList.add('plan__cell_error');
    //         }
    //       });
    //     }
    //     // this.dragElementNow = evt.target;
    //   }
    // });
    this.planGrid.addEventListener('dragover', (evt) => {
      this.planCell.forEach((it) => {
        it.classList.add('plan__cell_hack');
      });
      Plan.createBusyCells();
      this.#utilsDragObj(evt);
      if (evt.target.classList.contains('plan__cell')) {
        if (this.size === 1) {
          evt.target.classList.add('plan__cell_success');
          this.#checkBusyCells(evt);
        } else if (this.size === 2) {
          if (this.xCord <= COORDINATE_CORD.AfterTwo && evt.target.dataset.x === '10') {
            evt.target.classList.add('plan__cell_error');
          } else if (this.xCord > COORDINATE_CORD.AfterTwo && evt.target.dataset.x === '1') {
            evt.target.classList.add('plan__cell_error');
          } else {
            evt.target.nextElementSibling?.classList.remove('plan__cell_error');
          }
          addCellSuccess(this.planCell, evt.target, this.xCord);
          this.#checkBusyCells(evt, 2);
        } else if (this.size === 3) {
          addCellSuccessThree(this.planCell, evt.target, this.xCord);
        }
      }
    }, true);
  }

  dragleave() {
    this.planCell.forEach((it) => {
      this.planGrid.addEventListener('dragleave', (evt) => {
        this.#utilsDragObj(evt);
        if (this.size === 1) {
          if (it.classList.contains('plan__cell_error')) {
            it.classList.remove('plan__cell_error');
          }
          it.classList.remove('plan__cell_success');
        } else {
          if (this.size === 2) {
            Plan.busyCells.forEach((item) => {
              if (this.xCord <= COORDINATE_CORD.AfterTwo) {
                if (!isEqual(this.arrEvtTarget, item) || !isEqual(this.arrEvtTargetSecond, item)) {
                  evt.target.classList.remove('plan__cell_error');
                  evt.target.nextElementSibling?.classList.remove('plan__cell_error');
                }
              }
              if (this.xCord > COORDINATE_CORD.AfterTwo) {
                if (!isEqual(this.arrEvtTarget, item) || !isEqual(this.arrEvtTargetFirst, item)) {
                  evt.target.classList.remove('plan__cell_error');
                  evt.target.previousElementSibling?.classList.remove('plan__cell_error');
                }
              }
            });
            if (evt.target.dataset.x === '10' || evt.target.dataset.x === '1') {
              evt.target.classList.remove('plan__cell_error');
            }
          }
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
      const elementDrop = Array.from(this.elementsDrag).filter((item) => item.children[0].dataset.id === evt.dataTransfer.getData('id'));
      evt.stopPropagation();
      if (evt.target.classList.contains('plan__cell_success') && !evt.target.classList.contains('plan__cell_error')) {
        clearCells(this.size, this.xCord, evt.target);
        planContainer.createElements(elementDrop[0], evt.target, this.xCord, this.size);
        evt.target.classList.remove('plan__cell_success');
      } else {
        evt.target.classList.remove('plan__cell_success');
        evt.target.classList.remove('plan__cell_error');
        evt.target.nextElementSibling?.classList.remove('plan__cell_error');
        evt.target.previousElementSibling?.classList.remove('plan__cell_error');
      }
      this.planCell.forEach((it) => {
        it.classList.remove('plan__cell_hack', 'plan__cell_success', 'plan__cell_error');
      });
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
