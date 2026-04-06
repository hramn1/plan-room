import {
  createElementOnPlan,
  getCellsForPlacementByGrab,
  getPaletteItemId,
  serializePlanItems,
} from '@/utils';
import {checkPossibilityRotate} from './rotate-obj';
import {HistoryManager} from '@/redo';
import {buttonOneSize, buttonSize} from '@/data';
import {SIZE_ELEMENTS} from '@/constants';

export class Plan {
  static busyCells = [];
  static planCellBusy = [];

  constructor(planGrid, planCell, paletteElements = []) {
    this.planGrid = planGrid;
    this.planCell = planCell;
    this.paletteElements = paletteElements;
    this.btnReset = document.querySelector('.scheduler__action-reset');
    this.btnUndo = document.querySelector('.scheduler__action-undo');
    this.size = 66;
    this.history = new HistoryManager();
  }

  saveHistory() {
    this.history.push({
      items: serializePlanItems(this.planGrid),
      busy: structuredClone(Plan.planCellBusy),
    });
  }

  getCurrentState() {
    return {
      items: serializePlanItems(this.planGrid),
      busy: structuredClone(Plan.planCellBusy),
    };
  }

  applyState(state) {
    if (!state) {
      return;
    }

    this.clearPlanObjects();
    Plan.planCellBusy = structuredClone(state.busy ?? []);
    Plan.createBusyCells();

    state.items.forEach((item) => {
      const paletteElement = Array.from(this.paletteElements).find((el) => getPaletteItemId(el) === item.sourceId);
      if (!paletteElement) {
        return;
      }

      const elementClone = paletteElement.cloneNode(true);
      const objectName = elementClone.querySelector('.object__name');
      objectName?.remove();
      elementClone.children[0].removeAttribute('draggable');
      elementClone.children[0].children[0].innerHTML = item.size === SIZE_ELEMENTS.SizeOne ? buttonOneSize : buttonSize;

      elementClone.dataset.id = item.id;
      elementClone.dataset.sourceId = item.sourceId;
      elementClone.style.left = item.left;
      elementClone.style.top = item.top;

      if (item.rotated) {
        elementClone.classList.add('objects__item-rotated');
      }

      this.planGrid.append(elementClone);
    });
  }

  clearPlanObjects() {
    this.planGrid.querySelectorAll('.objects__item').forEach((item) => item.remove());
  }

  undo() {
    const previousState = this.history.undo(this.getCurrentState());
    this.applyState(previousState);
  }

  createElements(element, dropElement, xCord, size, grabbedIndex = 0) {
    this.saveHistory();

    const elementClone = element.cloneNode(true);
    elementClone.removeChild(elementClone.querySelector('.object__name'));
    elementClone.children[0].removeAttribute('draggable');
    elementClone.dataset.sourceId = getPaletteItemId(element);

    createElementOnPlan(elementClone, dropElement, xCord, this.size, size, grabbedIndex);

    const cells = getCellsForPlacementByGrab(dropElement, grabbedIndex, size);

    Plan.planCellBusy.push({
      id: Number(elementClone.dataset.id),
      cell: size === SIZE_ELEMENTS.SizeOne ? cells[0] : cells,
    });

    Plan.createBusyCells();
    this.planGrid.append(elementClone);
  }

  deleteElement(deleteElement) {
    this.saveHistory();
    Plan.planCellBusy = Plan.planCellBusy.filter((elements) => elements.id !== Number(deleteElement.dataset.id));
    Plan.createBusyCells();
    deleteElement.remove();
  }

  resetRoom(withHistory = true) {
    if (withHistory) {
      this.saveHistory();
    }

    this.planCell.forEach((item) => {
      item.classList.remove('plan__cell_success', 'plan__cell_error', 'plan__cell_hack');
    });

    this.clearPlanObjects();
    Plan.planCellBusy = [];
    Plan.busyCells = [];
  }

  static createBusyCells() {
    Plan.busyCells = [];

    Plan.planCellBusy.forEach((item) => {
      if (Array.isArray(item.cell[0])) {
        for (let i = 0; i < item.cell.length; i++) {
          Plan.busyCells.push(item.cell[i]);
        }
      } else {
        Plan.busyCells.push(item.cell);
      }
    });
  }

  bindEvents() {
    this.planGrid.addEventListener('click', (evt) => {
      const deleteButton = evt.target.closest('.figure__button-delete');

      if (deleteButton) {
        const deleteElement = deleteButton.closest('.objects__item');
        if (deleteElement) {
          this.deleteElement(deleteElement);
        }
        return;
      }

      const rotateButton = evt.target.closest('.figure__button-rotate');

      if (rotateButton) {
        const elementTarget = rotateButton.closest('.objects__item');
        const busyItem = Plan.planCellBusy.find((item) => item.id === Number(elementTarget?.dataset.id));

        if (elementTarget && busyItem) {
          this.saveHistory();
          checkPossibilityRotate(
            evt,
            {dataset: {y: busyItem.cell[0][1] ?? busyItem.cell[1]}},
            busyItem.cell.length,
            elementTarget,
          );
          Plan.createBusyCells();
        }
      }
    });

    this.btnReset?.addEventListener('click', () => this.resetRoom());
    this.btnUndo?.addEventListener('click', () => this.undo());

    document.addEventListener('keydown', (evt) => {
      if ((evt.ctrlKey || evt.metaKey) && evt.key.toLowerCase() === 'z') {
        evt.preventDefault();
        this.undo();
      }
    });
  }

  init() {
    this.resetRoom(false);
    this.bindEvents();
  }
}
