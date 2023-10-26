export class Plan {

    constructor(planGrid, planCell) {
        this.planGrid = planGrid;
        this.planCell = planCell;
        this.planCellBusy = [];
        this.btnReset = document.querySelector('.scheduler__action-reset');
        this.size = 66;
        this.button = `<svg class="figure__button figure__button-rotate" fill="currentColor" height="1em" width="1em"> 
                        <use xlink:href="#rotate-icon"></use> 
                       </svg>
                       <svg class="figure__button figure__button-delete" fill="currentColor" height="1em" width="1em">
                        <use xlink:href="#delete-icon"></use>
                       </svg>`;
        this.buttonOneSize = `<svg class="figure__button figure__button-delete" fill="currentColor" height="1em" width="1em">
                        <use xlink:href="#delete-icon"></use>
                       </svg>`
    }
    createElements(element, dropElement, xCord, size){
        let elementClone = element.cloneNode(true);
        elementClone.removeChild(elementClone.querySelector('.object__name'));
        elementClone.children[0].removeAttribute('draggable');
        if(size === 1){
            elementClone.children[0].children[0].innerHTML = this.buttonOneSize;
            elementClone.style.left = (dropElement.dataset.x - 1) * this.size + 'px';
            elementClone.style.top = (dropElement.dataset.y - 1) * this.size + 'px';
        } else if(size === 2 && xCord > 66){
            elementClone.children[0].children[0].innerHTML = this.button;
            elementClone.style.left = (dropElement.dataset.x - 2) * this.size + 'px';
            elementClone.style.top = (dropElement.dataset.y - 1) * this.size + 'px';
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
    checkPossibilityRotate(){
        console.log(this.planCellBusy)
    }
    updatePlan() {
        const btnDeleteElement = document.querySelectorAll('.figure__button-delete');
        const btnRotateElement = document.querySelectorAll('.figure__button-rotate');
        btnDeleteElement.forEach((item)=>{
            item.addEventListener('click',(evt)=> {
                evt.currentTarget.parentNode.parentNode.parentNode.remove();
            })
        })
        btnRotateElement.forEach((item)=>{
            item.addEventListener('click',(evt)=> {
                let elementTarget =  evt.currentTarget.parentNode.parentNode.parentNode;
                if(!elementTarget.classList.contains('objects__item-rotated')){
                    elementTarget.classList.add('objects__item-rotated');
                    this.checkPossibilityRotate()
                } else {
                    elementTarget.classList.remove('objects__item-rotated');
                }
            })
        })
    }
    init(){
        this.updatePlan();
        this.btnReset.addEventListener('click', () => this.resetRoom());
    }
}
