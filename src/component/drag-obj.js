import {Plan} from '@component/plan.js';
import {
  clearCellsByPlacement,
  getCellsForPlacementByGrab,
  getGrabbedCellIndex,
  hasBusyCollision,
  isCellsInsidePlan,
  setSizeObj,
  highlightPlacement,
} from '@/utils.js';
import {DRAG_STATE} from '@/constants';

export class DragObj {
  constructor(draggableObjElements, planCell, planGrid) {
    this.elementsDrag = draggableObjElements;
    this.planCell = planCell;
    this.planGrid = planGrid;
    this.xCord = 0;
    this.size = 0;
    this.dragElementNow = null;
    this.dragState = DRAG_STATE.Idle;
    this.grabbedIndex = 0;
    this.currentPlacementCells = [];
  }

  setDragState(state) {
    this.dragState = state;
  }

  resetDragState() {
    this.xCord = 0;
    this.size = 0;
    this.dragElementNow = null;
    this.grabbedIndex = 0;
    this.currentPlacementCells = [];
    this.setDragState(DRAG_STATE.Idle);
  }

  clearPlanCellClasses() {
    this.planCell.forEach((it) => {
      it.classList.remove('plan__cell_hack', 'plan__cell_success', 'plan__cell_error');
    });
  }

  #validatePlacement(targetCell) {
    const cells = getCellsForPlacementByGrab(targetCell, this.grabbedIndex, this.size);
    this.currentPlacementCells = cells;

    const inside = isCellsInsidePlan(cells);

    if (!inside) {
      const visibleCells = cells.filter(([x, y]) => x >= 1 && x <= 10 && y >= 1 && y <= 7);
      highlightPlacement(this.planCell, visibleCells, 'error');
      this.setDragState(DRAG_STATE.InvalidTarget);
      return false;
    }

    const hasCollision = hasBusyCollision(cells);
    highlightPlacement(this.planCell, cells, hasCollision ? 'error' : 'success');
    this.setDragState(hasCollision ? DRAG_STATE.InvalidTarget : DRAG_STATE.ValidTarget);

    return !hasCollision;
  }

  startDrag() {
    this.elementsDrag.forEach((item) => {
      item.addEventListener('dragstart', (evt) => {
        const draggableTarget = evt.target.closest('[draggable="true"]') ?? evt.target;
        const rect = draggableTarget.getBoundingClientRect();

        this.xCord = evt.clientX - rect.left;
        this.size = setSizeObj(draggableTarget);
        this.dragElementNow = draggableTarget;
        this.grabbedIndex = getGrabbedCellIndex(this.xCord, this.size);
        this.setDragState(DRAG_STATE.Started);

        evt.dataTransfer.setData('id', draggableTarget.dataset.id);
      });

      item.addEventListener('dragend', () => {
        this.clearPlanCellClasses();
        this.setDragState(DRAG_STATE.Cancelled);
        this.resetDragState();
      });
    });
  }

  dragenter() {
    document.addEventListener('dragover', (evt) => {
      if (evt.target.classList.contains('plan__cell')) {
        this.dragElementNow = evt.target;
        this.setDragState(DRAG_STATE.OverCell);
      }
    });

    this.planGrid.addEventListener(
      'dragover',
      (evt) => {
        evt.preventDefault();

        this.setDragState(DRAG_STATE.OverGrid);

        this.clearPlanCellClasses();
        this.planCell.forEach((it) => {
          it.classList.add('plan__cell_hack');
        });

        if (!evt.target.classList.contains('plan__cell')) {
          return;
        }

        Plan.createBusyCells();
        this.#validatePlacement(evt.target);
      },
      true,
    );
  }

  dragleave() {
    this.planGrid.addEventListener('dragleave', (evt) => {
      if (!evt.target.classList.contains('plan__cell')) {
        return;
      }

      this.clearPlanCellClasses();

      this.planCell.forEach((it) => {
        it.classList.add('plan__cell_hack');
      });
    });
  }

  drop(planContainer) {
    this.planGrid.addEventListener('dragover', (evt) => {
      evt.preventDefault();
    });

    this.planGrid.addEventListener('drop', (evt) => {
      evt.preventDefault();
      evt.stopPropagation();

      const dropTarget = evt.target.closest('.plan__cell');

      const elementDrop = Array.from(this.elementsDrag).filter(
        (item) => item.children[0].dataset.id === evt.dataTransfer.getData('id'),
      );

      if (!dropTarget || !elementDrop[0]) {
        this.setDragState(DRAG_STATE.InvalidTarget);
        this.clearPlanCellClasses();
        this.resetDragState();
        return;
      }

      const isValid = this.#validatePlacement(dropTarget);

      if (isValid) {
        clearCellsByPlacement(this.planCell, this.currentPlacementCells);
        planContainer.createElements(
          elementDrop[0],
          dropTarget,
          this.xCord,
          this.size,
          this.grabbedIndex,
        );
        this.setDragState(DRAG_STATE.Dropped);
      } else {
        this.setDragState(DRAG_STATE.InvalidTarget);
      }

      this.clearPlanCellClasses();
      this.resetDragState();
    });
  }

  init() {
    const planContainer = new Plan(this.planGrid, this.planCell, this.elementsDrag);
    planContainer.init();
    this.startDrag();
    this.dragleave();
    this.dragenter();
    this.drop(planContainer);
  }
}
