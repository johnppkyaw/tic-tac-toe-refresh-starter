const Screen = require("./screen");
const Cursor = require("./cursor");

class TTT {

  constructor() {

    this.playerTurn = "O";

    this.grid = [[' ',' ',' '],
                 [' ',' ',' '],
                 [' ',' ',' ']]

    this.cursor = new Cursor(3, 3);

    // Initialize a 3x3 tic-tac-toe grid
    Screen.initialize(3, 3);
    Screen.setGridlines(true);

    // Commands
    Screen.addCommand('w', 'move up', this.cursor.up.bind(this.cursor));
    Screen.addCommand('s', 'move down', this.cursor.down.bind(this.cursor));
    Screen.addCommand('a', 'move left', this.cursor.left.bind(this.cursor));
    Screen.addCommand('d', 'move right', this.cursor.right.bind(this.cursor));
    Screen.addCommand('o', 'player one plays', this.placeAMove.bind(this, 'O'));
    Screen.addCommand('x', 'player two plays', this.placeAMove.bind(this, 'X'));


    this.cursor.setBackgroundColor();
    Screen.render();
    console.log('Welcome to Tic-Tac-Toe game!');
    console.log(`It's now player ${this.playerTurn}'s turn!`);
    Screen.printCommands();

  }

  placeAMove(string) {
    let winner;
    //Has this square been played already?
    if ((string === 'X' || string ==='O') && this.grid[this.cursor.row][this.cursor.col] === ' ') {
      if (string === 'X') {
        if (this.playerTurn === 'X') {
          Screen.setGrid(this.cursor.row, this.cursor.col, 'X');
          Screen.render();
          this.grid[this.cursor.row][this.cursor.col] = 'X';
          //Check winner?
          winner = TTT.checkWin(this.grid);
          //If no winner;
          if (!winner) {
            this.playerTurn = 'O';
            this.whoseTurnIsIt();
            return;
          } else {
            TTT.endGame(winner);
          }
        } else {
          this.notYourTurn();
        }
      } else if (string === 'O') {
        if (this.playerTurn === 'O') {
          Screen.setGrid(this.cursor.row, this.cursor.col, 'O');
          Screen.render();
          this.grid[this.cursor.row][this.cursor.col] = 'O';
          //Check winner?
          winner = TTT.checkWin(this.grid);
          //If no winner;
          if (!winner) {
            this.playerTurn = 'X';
            this.whoseTurnIsIt();
            return;
          } else {
            TTT.endGame(winner);
          }
        } else {
          this.notYourTurn();
        }
      }
    } else {
      console.log (`This grid has been already played!`);
      this.whoseTurnIsIt();
    }
  }

  whoseTurnIsIt() {
    console.log(`It's now player ${this.playerTurn}'s turn!`);
    Screen.printCommands();
    return;
  }

  notYourTurn() {
    console.log(`Wait for player ${this.playerTurn}'s turn!`);
    Screen.printCommands();
    return;
  }

  static checkWin(grid) {
    let blankCount = 0;
    const originalGrid = grid;
    const transposedGrid = transpose(grid);
    const diagonalGrid = diagonal(grid);

    const horizontalWin = (symbol) => {
      return originalGrid.some(moves => moves.every(move => move === symbol));
    }
    const verticalWin = (symbol) => {
      return transposedGrid.some(moves => moves.every(move => move === symbol));
    }
    const diagonalWin = (symbol) => {
      return diagonalGrid.some(moves => moves.every(move => move === symbol));
    }

    const winnerIsX = horizontalWin('X') || verticalWin ('X') || diagonalWin('X');
    const winnerIsO = horizontalWin('O') || verticalWin ('O') || diagonalWin('O');

    return winnerIsX ? 'X' :
           winnerIsO ? 'O' :
           blankCount === 0 ? 'T' :
           false;

    //Transposed 2D array fnx;
    function transpose(grid) {
      const newArr = [];
      const col0 = [];
      const col1 = [];
      const col2 = [];
      for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[row].length; col++) {

          if (grid[row][col] === " ") {
          blankCount++; //count the ' ' elements;
          }

          if (col === 0) {
            col0.push(grid[row][col]);
          }
          if (col === 1) {
            col1.push(grid[row][col]);
          }
          if (col === 2) {
            col2.push(grid[row][col]);
          }
        }
      }
      newArr.push(col0, col1, col2);
      return newArr;
    }

    // [[(0, 0), (0, 1), (0, 2)]
    //  [(1, 0), (1, 1), (1, 2)]
    //  [(2, 0), (2, 1), (2, 2)]]
    // Find Diagonal arrays;
    function diagonal(grid) {
      const newArr = [];
      const leftToRight = [];
      const rightToLeft = [];
      for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[row].length; col++) {
          // example (0, 0)
          if (row === col) {
            leftToRight.push(grid[row][col]);
          }
          if (grid.length - (col + row) === 1) {
            rightToLeft.push(grid[row][col]);
          }
        }
      }
      newArr.push(leftToRight, rightToLeft);
      return newArr;
    }

    // Long Version
    // let blanks = 0;
    // let horizonX = 0;
    // let horizonO = 0;
    // let verticalX0 = 0;
    // let verticalX1 = 0;
    // let verticalX2 = 0;
    // let verticalO0 = 0;
    // let verticalO1 = 0;
    // let verticalO2 = 0;
    // let diagX0 = 0;
    // let diagX1 = 0;
    // let diagO0 = 0;
    // let diagO1 = 0;

    // for (let row = 0; row < grid.length; row++) {
    //   for (let col = 0; col < grid[row].length; col++) {
    //     if (grid[row][col] === ' ') {
    //       blanks++;
    //     } else if (grid[row][col] === 'X') {
    //       horizonX++;
    //       if (col === 0) {
    //         //[0, 0]
    //         if (row === 0) {
    //           diagX0++;
    //         }
    //         //[0, 2]
    //         if (row === 2) {
    //           diagX1++;
    //         }
    //         verticalX0++;
    //       } else if (col === 1) {
    //         if (row === 1) {
    //           diagX0++;
    //           diagX1++
    //         }
    //         verticalX1++;
    //       } else if (col === 2) {
    //         if (row === 0) {
    //           diagX1++;
    //         }
    //         if (row === 2) {
    //           diagX0++;
    //         }
    //         verticalX2++;
    //       }
    //     } else if (grid[row][col] === 'O') {
    //       horizonO++;
    //       if (col === 0) {
    //         if (row === 0) {
    //           diagO0++;
    //         }
    //         if (row === 2) {
    //           diagO1++;
    //         }
    //         verticalO0++;
    //       } else if (col === 1) {
    //         if (row === 1) {
    //           diagO0++;
    //           diagO1++;
    //         }
    //         verticalO1++;
    //       } else if (col === 2) {
    //         if (row === 0) {
    //           diagO1++;
    //         }
    //         if (row === 2) {
    //           diagO0++;
    //         }
    //         verticalO2++;
    //       }
    //     }
    //     if (horizonX === 3) {
    //       horizonX = 0;
    //       return 'X';
    //     } else if (horizonO === 3) {
    //       horizonO = 0;
    //       return 'O';
    //     }
    //   }
    //   horizonX = 0;
    //   horizonO = 0;
    // }
    // if (verticalX0 === 3 || verticalX1 === 3 || verticalX2 === 3 || diagX0 === 3 || diagX1 === 3) {
    //   return 'X';
    // } else if (verticalO0 === 3 || verticalO1 === 3 || verticalO2 === 3 || diagO0 === 3 || diagO1 === 3) {
    //   return 'O';
    // }
  }

  static endGame(winner) {
    if (winner === 'O' || winner === 'X') {
      Screen.setMessage(`Player ${winner} wins!`);
    } else if (winner === 'T') {
      Screen.setMessage(`Tie game!`);
    } else {
      Screen.setMessage(`Game Over`);
    }
    Screen.render();
    Screen.quit();
  }
}

module.exports = TTT;
