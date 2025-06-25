/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/component/drag-obj.js":
/*!***********************************!*\
  !*** ./src/component/drag-obj.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DragObj: () => (/* binding */ DragObj)
/* harmony export */ });
/* harmony import */ var _component_plan_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @component/plan.js */ "./src/component/plan.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/utils.js */ "./src/utils.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/constants */ "./src/constants.js");




class DragObj {
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
        this.size = (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.setSizeObj)(evt.target);
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
    if(size === 1) {
      _component_plan_js__WEBPACK_IMPORTED_MODULE_0__.Plan.busyCells.forEach((it)=>{
        if((0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.isEqual)(this.arrEvtTarget , it)){
          evt.target.classList.add('plan__cell_error');
        } else {
          evt.target.classList.add('plan__cell_success');
        }
      });
    } else if(size === 2) {
      _component_plan_js__WEBPACK_IMPORTED_MODULE_0__.Plan.busyCells.forEach((it)=>{
        if(this.xCord <= _constants__WEBPACK_IMPORTED_MODULE_2__.COORDINATE_CORD.AfterTwo){
          _utils_js__WEBPACK_IMPORTED_MODULE_1__.dragCheck.call(this, evt, it, false);
        }
        if(this.xCord > _constants__WEBPACK_IMPORTED_MODULE_2__.COORDINATE_CORD.AfterTwo){
          _utils_js__WEBPACK_IMPORTED_MODULE_1__.dragCheck.call(this, evt, it, true);
        }
      });
    }
  }

  dragenter() {
    document.addEventListener('dragover', (evt)=>{
      let lastCell;
      if(evt.target.classList.contains('plan__cell')){
        this.dragElementNow = evt.target;
      }
      if(!evt.target.classList.contains('plan__cell') && this.dragElementNow.dataset.x === '1'){
        if(evt.clientY>120 &&  evt.clientY < (120 + (6 * 66))){
          this.planCell.forEach((item) => {
            if(item.dataset.y == Math.floor(evt.clientY - 120) / 66 && item.dataset.x === '1'){
              item.classList.add('plan__cell_error');
            }
          })
        }
        // this.dragElementNow = evt.target;
      }
    });
    this.planGrid.addEventListener('dragover', (evt) => {
      this.planCell.forEach((it) => {
        it.classList.add('plan__cell_hack');
      });
      _component_plan_js__WEBPACK_IMPORTED_MODULE_0__.Plan.createBusyCells();
      this.#utilsDragObj(evt);
      if (evt.target.classList.contains('plan__cell')) {
        if (this.size === 1) {
          evt.target.classList.add('plan__cell_success');
          this.#checkBusyCells(evt);
        } else if (this.size === 2) {
          if (this.xCord <= _constants__WEBPACK_IMPORTED_MODULE_2__.COORDINATE_CORD.AfterTwo && evt.target.dataset.x === '10'){
            evt.target.classList.add('plan__cell_error');
          } else if (this.xCord > _constants__WEBPACK_IMPORTED_MODULE_2__.COORDINATE_CORD.AfterTwo && evt.target.dataset.x === '1') {
            evt.target.classList.add('plan__cell_error');
          } else {
            evt.target.nextElementSibling?.classList.remove('plan__cell_error');
          }
          (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.addCellSuccess)(this.planCell, evt.target, this.xCord);
          this.#checkBusyCells(evt, 2);
        } else if (this.size === 3) {
          (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.addCellSuccessThree)(this.planCell, evt.target, this.xCord);
        }
      }
    }, true);
  }

  dragleave() {
    this.planCell.forEach((it) => {
      this.planGrid.addEventListener('dragleave', (evt) => {
        this.#utilsDragObj(evt);
        if (this.size === 1) {
          if(it.classList.contains('plan__cell_error')) {
            it.classList.remove('plan__cell_error');
          }
          it.classList.remove('plan__cell_success');
        } else {
          if (this.size === 2) {
            _component_plan_js__WEBPACK_IMPORTED_MODULE_0__.Plan.busyCells.forEach((item)=> {
              if(this.xCord <= _constants__WEBPACK_IMPORTED_MODULE_2__.COORDINATE_CORD.AfterTwo) {
                if(!(0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.isEqual)(this.arrEvtTarget, item) || !(0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.isEqual)(this.arrEvtTargetSecond, item)) {
                  evt.target.classList.remove('plan__cell_error');
                  evt.target.nextElementSibling?.classList.remove('plan__cell_error');
                }
              }
              if(this.xCord > _constants__WEBPACK_IMPORTED_MODULE_2__.COORDINATE_CORD.AfterTwo) {
                if(!(0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.isEqual)(this.arrEvtTarget, item) || !(0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.isEqual)(this.arrEvtTargetFirst, item)) {
                  evt.target.classList.remove('plan__cell_error');
                  evt.target.previousElementSibling?.classList.remove('plan__cell_error');
                }
              }
            });
            if(evt.target.dataset.x === '10' || evt.target.dataset.x === '1'){
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
        if (this.size === _constants__WEBPACK_IMPORTED_MODULE_2__.SIZE_ELEMENTS.SizeTwo && this.xCord > _constants__WEBPACK_IMPORTED_MODULE_2__.COORDINATE_CORD.AfterTwo) {
          evt.target.previousElementSibling.classList.remove('plan__cell_success');
        } else if (this.size === _constants__WEBPACK_IMPORTED_MODULE_2__.SIZE_ELEMENTS.SizeTwo && this.xCord <= _constants__WEBPACK_IMPORTED_MODULE_2__.COORDINATE_CORD.AfterTwo) {
          evt.target.nextElementSibling.classList.remove('plan__cell_success');
        } else if (this.size === _constants__WEBPACK_IMPORTED_MODULE_2__.SIZE_ELEMENTS.SizeThree && this.xCord <= _constants__WEBPACK_IMPORTED_MODULE_2__.COORDINATE_CORD.AfterTwo) {
          evt.target.nextElementSibling.classList.remove('plan__cell_success');
          evt.target.nextElementSibling.nextElementSibling.classList.remove('plan__cell_success');
        } else if (this.size === _constants__WEBPACK_IMPORTED_MODULE_2__.SIZE_ELEMENTS.SizeThree && this.xCord > _constants__WEBPACK_IMPORTED_MODULE_2__.COORDINATE_CORD.AfterTwo && this.xCord <= _constants__WEBPACK_IMPORTED_MODULE_2__.COORDINATE_CORD.AfterThree) {
          evt.target.nextElementSibling.classList.remove('plan__cell_success');
          evt.target.previousElementSibling.classList.remove('plan__cell_success');
        } else if (this.size === _constants__WEBPACK_IMPORTED_MODULE_2__.SIZE_ELEMENTS.SizeThree && this.xCord > _constants__WEBPACK_IMPORTED_MODULE_2__.COORDINATE_CORD.AfterThree) {
          evt.target.previousElementSibling.classList.remove('plan__cell_success');
          evt.target.previousElementSibling.previousElementSibling.classList.remove('plan__cell_success');
        }
        planContainer.createElements(elementDrop[0], evt.target, this.xCord, this.size);
        evt.target.classList.remove('plan__cell_success');
      } else {
        evt.target.classList.remove('plan__cell_success');
        evt.target.classList.remove('plan__cell_error');
        evt.target.nextElementSibling?.classList.remove('plan__cell_error');
        evt.target.previousElementSibling?.classList.remove('plan__cell_error');
      }
      this.planCell.forEach((it)=>{
        it.classList.remove('plan__cell_hack');
        it.classList.remove('plan__cell_success');
        it.classList.remove('plan__cell_error');
      });
    });
  }

  init() {
    const planContainer = new _component_plan_js__WEBPACK_IMPORTED_MODULE_0__.Plan(this.planGrid, this.planCell);
    planContainer.init();
    this.startDrag();
    this.dragleave();
    this.dragenter();
    this.drop(planContainer);
  }
}


/***/ }),

/***/ "./src/component/plan.js":
/*!*******************************!*\
  !*** ./src/component/plan.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Plan: () => (/* binding */ Plan)
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/utils */ "./src/utils.js");
/* harmony import */ var _rotate_obj__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./rotate-obj */ "./src/component/rotate-obj.js");



class Plan {
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
      (0,_utils__WEBPACK_IMPORTED_MODULE_0__.createElementOnPlan)(elementClone, dropElement, xCord, this.size, size);
      Plan.planCellBusy.push({'id':Number(elementClone.dataset.id), 'cell': [Number(dropElement.dataset.x), Number(dropElement.dataset.y)]});
      Plan.createBusyCells();
    } else {
      (0,_utils__WEBPACK_IMPORTED_MODULE_0__.createElementOnPlan)(elementClone, dropElement, xCord, this.size, size, this.planCell);
      elementClone.querySelector('.figure__button-rotate').addEventListener('click',(evt) => (0,_rotate_obj__WEBPACK_IMPORTED_MODULE_1__.checkPossibilityRotate)(evt, dropElement, size, elementClone));
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


/***/ }),

/***/ "./src/component/rotate-obj.js":
/*!*************************************!*\
  !*** ./src/component/rotate-obj.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   checkPossibilityRotate: () => (/* binding */ checkPossibilityRotate)
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/utils */ "./src/utils.js");
/* harmony import */ var _plan__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./plan */ "./src/component/plan.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/constants */ "./src/constants.js");




function checkBusyCellsRotate(arrayP, element) {
  for (let i = 0; i < _plan__WEBPACK_IMPORTED_MODULE_1__.Plan.planCellBusy.length; i++) {
    if (_plan__WEBPACK_IMPORTED_MODULE_1__.Plan.busyCells.some((item) => (0,_utils__WEBPACK_IMPORTED_MODULE_0__.isEqual)(item, arrayP))) {
      element.classList.add('shake-on-hover');
      setTimeout(() => element.classList.remove('shake-on-hover'), 400);
      return;
    }
  }
}

function checkPossibilityRotate(evt, cell, size, element) {
  _plan__WEBPACK_IMPORTED_MODULE_1__.Plan.createBusyCells();
  const rotateElement = _plan__WEBPACK_IMPORTED_MODULE_1__.Plan.planCellBusy.filter((cells)=> cells.id === Number(element.dataset.id)).shift();

  rotateElement.cell.sort((a,b) => a[0] - b[0]);

  if(!element.classList.contains('objects__item-rotated')) {
    const arrP = [(parseInt(element.style.left, 10) / 66) + 1, (parseInt(element.style.top, 10) / 66) + size];
    if(size === _constants__WEBPACK_IMPORTED_MODULE_2__.SIZE_ELEMENTS.SizeThree) {
      const arrSecondP = [(parseInt(element.style.left, 10) / 66) + 1, (parseInt(element.style.top, 10) / 66) + size - 1];
      checkBusyCellsRotate(arrSecondP, element);
    }
    for (let i = 0; i < _plan__WEBPACK_IMPORTED_MODULE_1__.Plan.planCellBusy.length; i++) {
      if (_plan__WEBPACK_IMPORTED_MODULE_1__.Plan.busyCells.some((item) => (0,_utils__WEBPACK_IMPORTED_MODULE_0__.isEqual)(item, arrP))) {
        element.classList.add('shake-on-hover');
        setTimeout(() => element.classList.remove('shake-on-hover'), 400);
        return;
      }
    }
  } else if(element.classList.contains('objects__item-rotated')) {
    const arrP = [(parseInt(element.style.left, 10) / 66) + size, (parseInt(element.style.top, 10) / 66) + 1 ];
    checkBusyCellsRotate(arrP, element);
  }
  if (Number(cell.dataset.y) + Number(size) > 7){
    element.classList.add('shake-on-hover');
    setTimeout(() => element.classList.remove('shake-on-hover'), 400);
    return;
  }

  if (!element.classList.contains('objects__item-rotated')) {
    element.classList.add('objects__item-rotated');
    _plan__WEBPACK_IMPORTED_MODULE_1__.Plan.planCellBusy = _plan__WEBPACK_IMPORTED_MODULE_1__.Plan.planCellBusy.filter((item)=> item.id !== element.dataset.id);
    if(size === 2) {
      rotateElement.cell[1] = [rotateElement.cell[1][0] - 1, rotateElement.cell[1][1] + 1];
    } else {
      rotateElement.cell[1] = [rotateElement.cell[1][0] - 1, rotateElement.cell[1][1] + 1];
      rotateElement.cell[2] = [rotateElement.cell[2][0] - 2, rotateElement.cell[2][1] + 2];

    }
    _plan__WEBPACK_IMPORTED_MODULE_1__.Plan.planCellBusy.push(rotateElement);
  } else {
    _plan__WEBPACK_IMPORTED_MODULE_1__.Plan.planCellBusy = _plan__WEBPACK_IMPORTED_MODULE_1__.Plan.planCellBusy.filter((item)=> item.id !== element.dataset.id);
    if(size === 2) {
      rotateElement.cell[1] = [rotateElement.cell[1][0] + 1, rotateElement.cell[1][1] - 1];
    } else {
      rotateElement.cell[1] = [rotateElement.cell[1][0] + 1, rotateElement.cell[1][1] - 1];
      rotateElement.cell[2] = [rotateElement.cell[2][0] + 2, rotateElement.cell[2][1] - 2];
    }
    _plan__WEBPACK_IMPORTED_MODULE_1__.Plan.planCellBusy.push(rotateElement);
    element.classList.remove('objects__item-rotated');
  }
}


/***/ }),

/***/ "./src/constants.js":
/*!**************************!*\
  !*** ./src/constants.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   COORDINATE_CORD: () => (/* binding */ COORDINATE_CORD),
/* harmony export */   NEXT_PREV_ELEMENTS: () => (/* binding */ NEXT_PREV_ELEMENTS),
/* harmony export */   SIZE_ELEMENTS: () => (/* binding */ SIZE_ELEMENTS)
/* harmony export */ });
const SIZE_ELEMENTS = {
  SizeOne: 1,
  SizeTwo: 2,
  SizeThree: 3
};
const COORDINATE_CORD = {
  AfterTwo: 66,
  AfterThree: 132,
};
const NEXT_PREV_ELEMENTS = {
  Prev: 'previousElementSibling',
  Next: 'nextElementSibling',
};


/***/ }),

/***/ "./src/data.js":
/*!*********************!*\
  !*** ./src/data.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   buttonOneSize: () => (/* binding */ buttonOneSize),
/* harmony export */   buttonSize: () => (/* binding */ buttonSize),
/* harmony export */   elementsInDrag: () => (/* binding */ elementsInDrag)
/* harmony export */ });
const elementsInDrag = {
  sizeOne: ['656182e8', '1a3a7c28', 'd8b58e3', '52399318', 'cf902348', 'f25b4eb8', 'c1e9b028', '7f08c23', 'fa64ef9', 'b0d82498'],
  sizeThree: ['0efbcbd']
};
const buttonSize = `<svg class="figure__button figure__button-rotate" fill="currentColor" height="1em" width="1em">
                                    <use xlink:href="#rotate-icon"></use>
                                  </svg>
                                 <svg class="figure__button figure__button-delete" fill="currentColor" height="1em" width="1em">
                                  <use xlink:href="#delete-icon"></use>
                                 </svg>`;
const buttonOneSize = `<svg class="figure__button figure__button-delete" fill="currentColor" height="1em" width="1em">
                                       <use xlink:href="#delete-icon"></use>
                                     </svg>`;


/***/ }),

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addCellSuccess: () => (/* binding */ addCellSuccess),
/* harmony export */   addCellSuccessThree: () => (/* binding */ addCellSuccessThree),
/* harmony export */   createElementOnPlan: () => (/* binding */ createElementOnPlan),
/* harmony export */   dragCheck: () => (/* binding */ dragCheck),
/* harmony export */   generateRandomIndex: () => (/* binding */ generateRandomIndex),
/* harmony export */   isEqual: () => (/* binding */ isEqual),
/* harmony export */   setSizeObj: () => (/* binding */ setSizeObj)
/* harmony export */ });
/* harmony import */ var _data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./data */ "./src/data.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/constants */ "./src/constants.js");



const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const generateRandomIndex = (a, b) => {
  const indexNumbers = [];
  return () => {
    let currentIndex = getRandomInteger(a, b);
    if (indexNumbers.length === Math.floor(Math.max(a, b))) {
      return '';
    }
    while (indexNumbers.includes(currentIndex)) {
      currentIndex = getRandomInteger(a, b);
    }
    indexNumbers.push(currentIndex);
    return currentIndex;
  };
};
const setSizeObj = (elem) => {
  let size;
  if(_data__WEBPACK_IMPORTED_MODULE_0__.elementsInDrag.sizeOne.includes(elem.dataset.id)) {
    size = 1;
  } else if(_data__WEBPACK_IMPORTED_MODULE_0__.elementsInDrag.sizeThree.includes(elem.dataset.id)) {
    size = 3;
  } else {
    size = 2;
  }
  return size;
};
const addCellSuccess = (planCells, elem, xCord) => {
  planCells.forEach((item) => {
    if (Number(item.dataset.x) === elem.dataset.x - (xCord <= 66 ? -1 : 1) && Number(item.dataset.y === elem.dataset.y)) {
      item.classList.add('plan__cell_success');
      elem.classList.add('plan__cell_success');
    }
  });
};
const addCellSuccessThree = (planCells, elem, xCord) => {
  let shiftX, shiftXSecond;
  if(xCord <= 66) {
    shiftX = 1;
    shiftXSecond = 2;
  } else if(xCord > 132) {
    shiftX = -2;
    shiftXSecond = -1;
  } else {
    shiftX = -1;
    shiftXSecond = 1;
  }
  planCells.forEach((item) => {
    if (Number(item.dataset.x) === Number(elem.dataset.x) + shiftX && Number(item.dataset.y === elem.dataset.y)) {
      item.classList.add('plan__cell_success');
      elem.classList.add('plan__cell_success');
    }
    if (Number(item.dataset.x) === Number(elem.dataset.x) + shiftXSecond && Number(item.dataset.y === elem.dataset.y)) {
      item.classList.add('plan__cell_success');
    }
  });
};
const createElementOnPlan = (elementClone, dropElement, xCord, size, sizeElement) =>{
  let shiftX, shiftXSecond;
  if(xCord <= 66) {
    shiftX = 1;
    shiftXSecond = 1;
  } else if(xCord > 132) {
    shiftX = 3;
    shiftXSecond = 1;
  } else {
    shiftX = 2;
    shiftXSecond = 1;
  }
  elementClone.children[0].children[0].innerHTML = (sizeElement === 1) ? _data__WEBPACK_IMPORTED_MODULE_0__.buttonOneSize : _data__WEBPACK_IMPORTED_MODULE_0__.buttonSize;
  elementClone.style.left = `${(dropElement.dataset.x - shiftX) * size }px`;
  elementClone.style.top = `${(dropElement.dataset.y - shiftXSecond) * size }px`;
  elementClone.dataset.id = generateRandomIndex(1,100)();

};
function isEqual(array1, array2) {
  return JSON.stringify(array1) === JSON.stringify(array2);
}
function dragCheck(evt, it, afterTwo) {
  const arrTarget = !afterTwo ? this.arrEvtTargetSecond : this.arrEvtTargetFirst;
  if(isEqual(this.arrEvtTarget, it) || isEqual(arrTarget, it)){
    evt.target.classList.add('plan__cell_error');
    if(this.arrEvtTarget[0] !== 10 && !afterTwo){
      evt.target[_constants__WEBPACK_IMPORTED_MODULE_1__.NEXT_PREV_ELEMENTS.Next]?.classList?.add('plan__cell_error');
    } else if(afterTwo){
      evt.target[_constants__WEBPACK_IMPORTED_MODULE_1__.NEXT_PREV_ELEMENTS.Prev]?.classList.add('plan__cell_error');
    }
  } else {
    evt.target.classList?.add('plan__cell_success');
  }
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _component_drag_obj__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @component/drag-obj */ "./src/component/drag-obj.js");


const draggableObjElements = document.querySelector('.constructor__aside').querySelectorAll('.objects__item');
const planGrid = document.querySelector('.plan');
const planCell = planGrid.querySelectorAll('.plan__cell');

const dragEl = new _component_drag_obj__WEBPACK_IMPORTED_MODULE_0__.DragObj(draggableObjElements, planCell, planGrid);

dragEl.init();

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map