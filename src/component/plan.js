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
                       </svg>`
    }
    createElements(element, dropElement){
        let elementClone = element.cloneNode(true);
        elementClone.removeChild(elementClone.querySelector('.object__name'));
        elementClone.children[0].children[0].innerHTML = this.button;
        elementClone.style.left = (dropElement.dataset.x - 1) * this.size + 'px';
        elementClone.style.top = (dropElement.dataset.y - 1) * this.size + 'px';
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
    updatePlan() {
        const btnDeleteElement = document.querySelectorAll('.figure__button-delete');
        btnDeleteElement.forEach((item)=>{
            item.addEventListener('click',(evt)=> {
                evt.currentTarget.parentNode.parentNode.parentNode.remove();
            })
        })
    }
    init(){
        this.updatePlan();
        this.btnReset.addEventListener('click', () => this.resetRoom());
    }
}
