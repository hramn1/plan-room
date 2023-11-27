import {Plan} from "./plan.js";
import {elementsInDrag} from "../data.js"
export class DragObj {
    constructor(draggableObjElements, planCell, planGrid) {
        this.elementsDrag = draggableObjElements;
        this.planCell = planCell;
        this.planGrid = planGrid;
        this.xCord = 0;
        this.yCord = 0;
        this.size = 2;
    }
    startDrag(){
        this.elementsDrag.forEach((item)=>{
            item.addEventListener('dragstart',(evt)=>{
                let rect = evt.target.getBoundingClientRect();
                this.xCord = evt.clientX - rect.left; //x position within the element.
                this.yCord = evt.clientY - rect.top;  //y position within the element.
                if(elementsInDrag.sizeOne.includes(evt.target.dataset.id)){
                    this.size = 1;
                } else if(elementsInDrag.sizeThree.includes(evt.target.dataset.id)){
                    this.size = 3;
                } else {
                    this.size = 2;
                }
                evt.dataTransfer.setData('id', evt.target.dataset.id);
            })
        })
    }
    dragenter(){
        this.planCell.forEach((it)=>{
            it.addEventListener("dragover", () => {
                if(!it.classList.contains('plan__cell_error')) {
                    if(this.size === 1){
                       it.classList.add('plan__cell_success');
                    }
                    else if(this.size === 2 && this.xCord > 66){
                        this.planCell.forEach((item)=> {
                            if(Number(item.dataset.x) === it.dataset.x -1 && Number(item.dataset.y === it.dataset.y)){
                                item.classList.add('plan__cell_success');
                                it.classList.add('plan__cell_success');
                            }
                        })
                    } else if(this.size === 2 && this.xCord <= 66){
                        this.planCell.forEach((item)=> {
                            if(Number(item.dataset.x) === Number(it.dataset.x) + 1 && Number(item.dataset.y === it.dataset.y)){
                                item.classList.add('plan__cell_success');
                                it.classList.add('plan__cell_success');
                            }
                        })
                    } else if(this.size === 3 && this.xCord <= 66){
                        this.planCell.forEach((item)=> {
                            if(Number(item.dataset.x) === Number(it.dataset.x) + 1 && Number(item.dataset.y === it.dataset.y)){
                                item.classList.add('plan__cell_success');
                                it.classList.add('plan__cell_success');
                            }
                            if(Number(item.dataset.x) === Number(it.dataset.x) + 2 && Number(item.dataset.y === it.dataset.y)){
                                item.classList.add('plan__cell_success');
                            }
                        })
                    } else if(this.size === 3 && 66 < this.xCord && this.xCord <= 132){
                        this.planCell.forEach((item)=> {
                            if(Number(item.dataset.x) === Number(it.dataset.x) - 1  && Number(item.dataset.y === it.dataset.y)){
                                item.classList.add('plan__cell_success');
                                it.classList.add('plan__cell_success');
                            }
                            if(Number(item.dataset.x) === Number(it.dataset.x) + 1 && Number(item.dataset.y === it.dataset.y)){
                                item.classList.add('plan__cell_success');
                            }
                        })
                    }  else if(this.size === 3 && this.xCord > 132){
                        this.planCell.forEach((item)=> {
                            if(Number(item.dataset.x) === Number(it.dataset.x) - 2  && Number(item.dataset.y === it.dataset.y)){
                                item.classList.add('plan__cell_success');
                                it.classList.add('plan__cell_success');
                            }
                            if(Number(item.dataset.x) === Number(it.dataset.x) -1  && Number(item.dataset.y === it.dataset.y)){
                                item.classList.add('plan__cell_success');
                            }
                        })
                }
    }
    })
        })
    }
    dragleave(){
        this.planCell.forEach((it)=>{
            it.addEventListener("dragleave", () => {
                if(this.size === 1){
                    it.classList.remove('plan__cell_success');
                }
                else if(this.size === 2 && this.xCord > 66){
                    // it.classList.remove('plan__cell_success');
                    this.planCell.forEach((item)=> {
                        if(Number(item.dataset.y === it.dataset.y)){
                            item.classList.remove('plan__cell_success');
                        }
                    })
                } else if(this.size === 2 && this.xCord <= 66){
                    it.classList.remove('plan__cell_success');
                    this.planCell.forEach((item)=> {
                        if(Number(item.dataset.y === it.dataset.y)){
                            item.classList.remove('plan__cell_success');
                        }
                    })
                } else if(this.size === 3 && this.xCord <= 66){
                    it.classList.remove('plan__cell_success');
                    this.planCell.forEach((item)=> {
                        if(Number(item.dataset.y === it.dataset.y)){
                            item.classList.remove('plan__cell_success');
                        }
                    })
                }  else if(this.size === 3 && 66 < this.xCord && this.xCord <= 132){
                    it.classList.remove('plan__cell_success');
                    this.planCell.forEach((item)=> {
                        if(Number(item.dataset.y === it.dataset.y)){
                            item.classList.remove('plan__cell_success');
                        }
                    })
                }  else if(this.size === 3 && this.xCord > 132){
                    this.planCell.forEach((item)=> {
                        if(Number(item.dataset.y === it.dataset.y)){
                            item.classList.remove('plan__cell_success');
                        }
                    })
                }
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
                if(this.size === 2 && this.xCord > 66) {
                   evt.target.previousElementSibling.classList.remove('plan__cell_success')
                } else if(this.size === 2 && this.xCord <= 66) {
                    evt.target.nextElementSibling.classList.remove('plan__cell_success')
                } else if(this.size === 3 && this.xCord <= 66){
                    evt.target.nextElementSibling.classList.remove('plan__cell_success')
                    evt.target.nextElementSibling.nextElementSibling.classList.remove('plan__cell_success')
                } else if(this.size === 3 && this.xCord > 66 && this.xCord <= 132){
                    evt.target.nextElementSibling.classList.remove('plan__cell_success')
                    evt.target.previousElementSibling.classList.remove('plan__cell_success')
                } else if(this.size === 3 && this.xCord > 132){
                    evt.target.previousElementSibling.classList.remove('plan__cell_success')
                    evt.target.previousElementSibling.previousElementSibling.classList.remove('plan__cell_success')
                }

                planContainer.createElements(elementDrop[0], evt.target, this.xCord, this.size);
                evt.target.classList.remove('plan__cell_success');
            }
        })
    }

    init(){
        const planContainer= new Plan(this.planGrid, this.planCell);
        planContainer.init();
        this.startDrag();
        this.dragleave();
        this.dragenter();
        this.drop(planContainer);
    }
}
