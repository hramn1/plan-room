import {Plan} from "./plan.js";

export class DragObj {
    constructor(draggableObjElements, planCell, planGrid) {
        this.elementsDrag = draggableObjElements;
        this.planCell = planCell;
        this.planGrid = planGrid;
    }
    startDrag(){
        this.elementsDrag.forEach((item)=>{
            item.addEventListener('dragstart',(evt)=>{
                evt.dataTransfer.setData('id', evt.target.dataset.id)
            })
        })
    }
    dragenter(){
        this.planCell.forEach((it)=>{
            it.addEventListener("dragenter", () => {
                if(!it.classList.contains('plan__cell_error')) {
                    it.classList.add('plan__cell_success');
                }
            });
        })
    }
    dragleave(){
        this.planCell.forEach((it)=>{
            it.addEventListener("dragleave", () => {
                it.classList.remove('plan__cell_success');
            });
        })
    }
    drop(planContainer){
        this.planGrid.addEventListener("dragover", (evt) => {
            evt.preventDefault();
        });
        this.planGrid.addEventListener('drop',(evt)=>{
            const elementDrop = Array.from(this.elementsDrag).filter((item)=> item.children[0].dataset.id === evt.dataTransfer.getData('id'));
            evt.stopPropagation();
            if(evt.target.classList.contains('plan__cell_success')) {
                planContainer.createElements(elementDrop[0], evt.target);
                evt.target.classList.remove('plan__cell_success');
            }
        })
    }

    init(){
        const planContainer= new Plan(this.planGrid, this.planCell);
        planContainer.init();
        this.startDrag();
        this.dragenter();
        this.dragleave();
        this.drop(planContainer);
    }
}
