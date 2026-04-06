export class HistoryManager {
  constructor(limit = 30) {
    this.limit = limit;
    this.undoStack = [];
    this.redoStack = [];
  }

  push(state) {
    if (!state) {
      return;
    }

    this.undoStack.push(structuredClone(state));
    if (this.undoStack.length > this.limit) {
      this.undoStack.shift();
    }
    this.redoStack = [];
  }

  undo(currentState) {
    if (!this.undoStack.length) {
      return null;
    }

    if (currentState) {
      this.redoStack.push(structuredClone(currentState));
    }

    return this.undoStack.pop();
  }

  redo(currentState) {
    if (!this.redoStack.length) {
      return null;
    }

    if (currentState) {
      this.undoStack.push(structuredClone(currentState));
    }

    return this.redoStack.pop();
  }

  clear() {
    this.undoStack = [];
    this.redoStack = [];
  }
}
