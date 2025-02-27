const Screen = require("./screen");

class Cursor {

  constructor(numRows, numCols) {
    this.numRows = numRows;
    this.numCols = numCols;

//starting point is [0, 0] => [top row, left column];
    this.row = 0;
    this.col = 0;

    this.gridColor = 'black';
    this.cursorColor = 'yellow';
  }

  resetBackgroundColor() {
    Screen.setBackgroundColor(this.row, this.col, this.gridColor);
  }

  setBackgroundColor() {
    Screen.setBackgroundColor(this.row, this.col, this.cursorColor);
  }

  up() {
    //if at row 0 = most top, can't move up further;
    if (this.row !== 0) {
      this.resetBackgroundColor();
      this.row--;
      this.setBackgroundColor();
      Screen.render();
    } else {
      console.log(`Can't go up further!`);
    }
    Screen.printCommands();
  }

  down() {
    //can't go down further if at the last row.
    //first row starts at 0, last row will be numRows - 1;
    if (this.row < this.numRows - 1) {
      this.resetBackgroundColor();
      this.row++;
      this.setBackgroundColor();
      Screen.render();
    } else {
      console.log(`Can't go down further!`);
    }
    Screen.printCommands();
  }

  left() {
    if (this.col !== 0) {
      this.resetBackgroundColor();
      this.col--;
      this.setBackgroundColor();
      Screen.render();
    } else {
      console.log(`Can't go left further!`);
    }
    Screen.printCommands();
  }

  right() {
    if (this.col < this.numCols - 1) {
      this.resetBackgroundColor();
      this.col++;
      this.setBackgroundColor();
      Screen.render();
    } else {
      console.log(`Can't go right further!`);
    }
    Screen.printCommands();
  }
}


module.exports = Cursor;
