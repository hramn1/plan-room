import {DragObj} from './component/drag-obj.js';

const objElements = document.querySelectorAll('.objects__item');
const planCell = document.querySelectorAll('.plan__cell');
const planGrid = document.querySelector('.plan')

const dragEl = new DragObj(objElements, planCell, planGrid);

dragEl.init()
