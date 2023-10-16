export class Plan {

    constructor(planGrid, planCell) {
        this.planGrid = planGrid;
        this.planCell = planCell;
        this.planCellBusy = [];
        this.btnReset = document.querySelector('.scheduler__action-reset');
        this.objElements = this.planGrid.querySelectorAll('.objects__item');
        this.size = 66;
        this.button = `<svg class="figure__button figure__button-rotate" fill="currentColor" height="1em" width="1em"> 
        <use xlink:href="#rotate-icon"></use> </svg>
         <svg class="figure__button figure__button-delete" fill="currentColor" height="1em" width="1em">
         <use xlink:href="#delete-icon"></use>
            </svg>`
    }
    createElements(element){
        console.log(element)
        let p_prime = element.cloneNode(true);
        p_prime.removeChild(p_prime.querySelector('.object__name'));
        p_prime.children[0].children[0].innerHTML = this.button;
        this.planGrid.append(p_prime);
        this.updatePlan();
    }
    deleteElements(element){
        this.objElements.forEach((item)=>{
            if(item.dataset.id ===  element.dataset.id){
                item.remove();
            }
        })
    }
    resetRoom() {
        this.planCell.forEach((item) => {
            if(item.classList.contains('plan__cell_success')) {
                item.classList.remove('plan__cell_success');
            }
            if(item.classList.contains('plan__cell_error')) {
                item.classList.remove('plan__cell_error');
            }
        })
        this.objElements.forEach((item)=>{
            item.remove();
        })
    }
    updatePlan() {
        const btnDeleteElement = document.querySelectorAll('.figure__button-delete');
        btnDeleteElement.forEach((item)=>{
            item.addEventListener('click',(evt)=>{
                this.deleteElements(evt.currentTarget.parentNode.parentNode)
            })
        })
    }
    init(){
        this.updatePlan()
        this.btnReset.addEventListener('click', ()=>this.resetRoom())
    }
}
