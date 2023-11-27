import {buttonOneSize, buttonSize} from "../data";

export class Plan {
    constructor(planGrid, planCell) {
        this.planGrid = planGrid;
        this.planCell = planCell;
        this.planCellBusy = [];
        this.btnReset = document.querySelector('.scheduler__action-reset');
        this.size = 66;
    }
    createElements(element, dropElement, xCord, size){
        let elementClone = element.cloneNode(true);
        elementClone.removeChild(elementClone.querySelector('.object__name'));
        elementClone.children[0].removeAttribute('draggable');
        if(size === 1){
            elementClone.children[0].children[0].innerHTML = buttonOneSize;
            elementClone.style.left = (dropElement.dataset.x - 1) * this.size + 'px';
            elementClone.style.top = (dropElement.dataset.y - 1) * this.size + 'px';
        } else if(size === 2 && xCord > 66){
            elementClone.children[0].children[0].innerHTML = buttonSize;
            elementClone.style.left = (dropElement.dataset.x - 2) * this.size + 'px';
            elementClone.style.top = (dropElement.dataset.y - 1) * this.size + 'px';
            elementClone.querySelector('.figure__button-rotate').addEventListener('click', this.checkPossibilityRotate)
        } else if(size === 2 && xCord <= 66) {
            elementClone.children[0].children[0].innerHTML = buttonSize;
            elementClone.style.left = (dropElement.dataset.x - 1) * this.size + 'px';
            elementClone.style.top = (dropElement.dataset.y - 1) * this.size + 'px';
            elementClone.querySelector('.figure__button-rotate').addEventListener('click', this.checkPossibilityRotate)
        } else if(size === 3 && xCord <= 66) {
            elementClone.children[0].children[0].innerHTML = buttonSize;
            elementClone.style.left = (dropElement.dataset.x - 1) * this.size + 'px';
            elementClone.style.top = (dropElement.dataset.y - 1) * this.size + 'px';
            elementClone.querySelector('.figure__button-rotate').addEventListener('click', this.checkPossibilityRotate)
        } else if(size === 3 && xCord > 66 && xCord <= 132) {
            elementClone.children[0].children[0].innerHTML = buttonSize;
            elementClone.style.left = (dropElement.dataset.x - 2) * this.size + 'px';
            elementClone.style.top = (dropElement.dataset.y - 1) * this.size + 'px';
            elementClone.querySelector('.figure__button-rotate').addEventListener('click', this.checkPossibilityRotate)
        } else if(size === 3 && xCord > 132) {
            elementClone.children[0].children[0].innerHTML = buttonSize;
            elementClone.style.left = (dropElement.dataset.x - 3) * this.size + 'px';
            elementClone.style.top = (dropElement.dataset.y - 1) * this.size + 'px';
            elementClone.querySelector('.figure__button-rotate').addEventListener('click', this.checkPossibilityRotate)
        }

        this.planGrid.append(elementClone);
        this.updatePlan();
    }
    resetRoom() {
        const objElementsPlan = this.planGrid.querySelectorAll('.objects__item');
        this.planCell.forEach((item) => {
            if(item.classList.contains('plan__cell_success')) {
                item.classList.remove('plan__cell_success');
            }
            if(item.classList.contains('plan__cell_error')) {
                item.classList.remove('plan__cell_error');
            }
        })
        objElementsPlan.forEach((item)=> {
            item.remove();
        })
    }
    checkPossibilityRotate(evt){
        let elementTarget =  evt.currentTarget.parentNode.parentNode.parentNode;
                if(!elementTarget.classList.contains('objects__item-rotated')){
                    elementTarget.classList.add('objects__item-rotated');
                } else {
                    elementTarget.classList.remove('objects__item-rotated');
                }
    }

    updatePlan() {
        const btnDeleteElement = document.querySelectorAll('.figure__button-delete');

        btnDeleteElement.forEach((item)=>{
            item.addEventListener('click',(evt)=> {
                evt.currentTarget.parentNode.parentNode.parentNode.remove();
            })
        })

    }
    init(){
        const btnRotateElement = document.querySelectorAll('.figure__button-rotate');
        btnRotateElement.forEach((item)=>{
            item.addEventListener('click',(evt)=> {
                let elementTarget =  evt.currentTarget.parentNode.parentNode.parentNode;
                if(!elementTarget.classList.contains('objects__item-rotated')){
                    elementTarget.classList.add('objects__item-rotated');
                } else {
                    elementTarget.classList.remove('objects__item-rotated');
                }
            })
        })
        this.updatePlan();
        this.planCell.forEach((cell)=>{
            if(cell.classList.contains('plan__cell_error')){
                this.planCellBusy.push([cell.dataset.x, cell.dataset.y])
            }
        })
        this.btnReset.addEventListener('click', () => this.resetRoom());
    }
}
