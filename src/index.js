import {DragObj} from './component/drag-obj.js';

const draggableObjElements = document.querySelector('.constructor__aside').querySelectorAll('.objects__item');
const planGrid = document.querySelector('.plan');
const planCell = planGrid.querySelectorAll('.plan__cell');

const dragEl = new DragObj(draggableObjElements, planCell, planGrid);

dragEl.init()
