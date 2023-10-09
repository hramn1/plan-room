export class Plan {

    constructor(planGrid, planCell) {
        this.planGrid = planGrid;
        this.planCell = planCell;
        this.planCellBusy = [];
        this.btnReset = document.querySelector('.scheduler__action-reset');
        this.btnDeleteElement = document.querySelectorAll('.figure__button-delete');
        this.objElements = this.planGrid.querySelectorAll('.objects__item');
        this.size = 66;
    }
    createElements(element){
        console.log(element)
        let p_prime = element.cloneNode(true);
        this.planGrid.append(p_prime)

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
    init(){
        this.btnDeleteElement.forEach((item)=>{
            item.addEventListener('click',(evt)=>{
                this.deleteElements(evt.currentTarget.parentNode.parentNode)
            })
        })
        // this.resetRoom()
        this.btnReset.addEventListener('click', ()=>this.resetRoom())
    }
}
