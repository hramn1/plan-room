class UndoRedo {
    constructor() {
        this.undoStack = [];
        this.redoStack = [];
    }

    // push the current state onto the undo stack
    pushState(state) {
        this.undoStack.push(state);
        // clear redo stack as we cannot redo after a new state is pushed
        this.redoStack = [];
    }

    // undo the last operation
    undo() {
        if (this.undoStack.length > 0) {
            const state = this.undoStack.pop();
            this.redoStack.push(state);
            return state;
        }
        return null;
    }

    // redo the last operation
    redo() {
        if (this.redoStack.length > 0) {
            const state = this.redoStack.pop();
            this.undoStack.push(state);
            return state;
        }
        return null;
    }
}
