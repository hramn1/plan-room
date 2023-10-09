import {Plan} from "./plan.js";

export class DragObj {
    constructor(objElements, planCell, planGrid) {
        this.elements = objElements;
        this.planCell = planCell;
        this.planGrid = planGrid;
        this.width = 66;
    }
    startDrag(planContainer){
        this.elements.forEach((item)=>{
            item.addEventListener('dragstart',(evt)=>{
                evt.dataTransfer.setData('id', evt.target.dataset.id)
            })
        })
    }
    drop( planContainer){
        this.planGrid.addEventListener("dragover", (event) => {
            // prevent default to allow drop
            event.preventDefault();
        });
        this.planGrid.addEventListener('drop',(evt)=>{
            let el = Array.from(this.elements).filter((item)=> item.children[0].dataset.id===evt.dataTransfer.getData('id'));
            evt.stopPropagation();
            planContainer.createElements(el[0], evt.target)
        })

    }
    dragenter( planContainer){

        this.planCell.forEach((it)=>{
            it.addEventListener("dragenter", (evt) => {
                it.classList.add('plan__cell_success');
            });
        })
    }
    dragleave(){
        this.planCell.forEach((it)=>{
            it.addEventListener("dragleave", (evt) => {
                it.classList.remove('plan__cell_success');
            });
        })
    }
    init(){
        const planContainer = new Plan(this.planGrid, this.planCell);
        planContainer.init();
        this.startDrag(planContainer);
        this.dragenter( planContainer);
        this.dragleave( planContainer);
        this.drop(planContainer);
    }
}
