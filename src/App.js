import React from "react";
import Grid from "./components/Grid";
import Modal from "./components/Modal";
import blue from "./assets/fichaAzul.png";
import red from "./assets/fichaRoja.png";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      board: [
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0]
      ],
      cases: [null, blue, red],
      count: 0,
      disabledClick: false,
      showModal: false,
      winner: 0,
      freeSpaces: 42
    };
  }

  checkWin = (row, col) => {
    let player = this.state.board[row][col];
    let rows = this.state.board.length;
    let cols = this.state.board[0].length;

    //verifico ganadores en el eje Y solo a partir de cuando 4 apilados
    if (row < rows - 3) {
      if (
        this.state.board[row][col] === player &&
        this.state.board[row + 1][col] === player &&
        this.state.board[row + 2][col] === player &&
        this.state.board[row + 3][col] === player
      ) {
        this.setState({ winner: player, showModal: true });
      }
    }

    //verifico ganadores en el eje de x
    let prev = 0;
    let count = 1;
    for (let i = 0; i < cols; i++) {
      if (this.state.board[row][i] === 0) {
        count = 0;
        prev = 0;
      } else {
        if (prev !== this.state.board[row][i]) {
          prev = this.state.board[row][i];
          count = 1;
        } else {
          count++;
        }
      }
      if (count === 4) {
        this.setState({ winner: this.state.board[row][i], showModal: true });
      }
    }

    //verifico ganadores en las diagonales (de abajo izquierda a arriba derecha) (/)
    let initCol = col;
    let initRow = row;

    while (initRow < this.state.board.length - 1 && initCol > 0) {
      initRow++;
      initCol--;
    }

    count = 0;
    prev = 0;
    while (initRow >= 0 && initCol <= cols) {
      if (this.state.board[initRow][initCol] === 0) {
        count = 0;
        prev = 0;
      } else {
        if (prev !== this.state.board[initRow][initCol]) {
          prev = this.state.board[initRow][initCol];
          count = 1;
        } else {
          count++;
        }
      }
      if (count === 4) {
        this.setState({
          winner: this.state.board[initRow][initCol],
          showModal: true
        });
      }

      initRow--;
      initCol++;
    }

    //verifico ganadores en las diagonales (de arriba izquierda a abajo derecha) (\)

    initCol = col;
    initRow = row;

    while (initRow > 0 && initCol > 0) {
      initRow--;
      initCol--;
    }

    count = 0;
    prev = 0;
    while (initRow < this.state.board.length && initCol < cols) {
      if (this.state.board[initRow][initCol] === 0) {
        count = 0;
        prev = 0;
      } else {
        if (prev !== this.state.board[initRow][initCol]) {
          prev = this.state.board[initRow][initCol];
          count = 1;
        } else {
          count++;
        }
      }
      if (count === 4) {
        this.setState({
          winner: this.state.board[initRow][initCol],
          showModal: true
        });
      }

      initRow++;
      initCol++;
    }
  };

  handleClick = (row, col) => {
    if (!this.state.disabledClick && this.state.board[0][col] === 0) {
      this.setState({ disabledClick: true, freeSpaces: this.state.freeSpaces - 1  });

      let rows = this.state.board.length;
      let actualRow = null;
      let nextValue = this.state.count % 2 === 0 ? 1 : 2;
      for (let i = 0; i < rows; i++) {
        if (this.state.board[i][col] === 0) {
          actualRow = i;
        }
      }

      if (actualRow != null) {
        let board = this.state.board.map(row => [...row]);
        let count = 0;
        let updatedCount = this.state.count + 1;
        var interval = setInterval(() => {
          board[count][col] = nextValue;
          if (count > 0) {
            board[count - 1][col] = 0;
          }
          this.setState({ board, count: updatedCount });
          if (count === actualRow) {
            clearInterval(interval);
            this.setState(
              { disabledClick: false },
              this.checkWin(actualRow, col)
            );
          } else {
            count++;
          }
        }, 75);
      }
    }
  };

  resetGame = () => {
    let newBoard = this.state.board.map(i =>
      i.map(j => {
        return 0;
      })
    );
    this.setState({ board: newBoard, showModal: false, winner: 0, freeSpaces: 42 });
  };

  render() {
    return (
      <React.Fragment>
        <Grid
          handleClick={this.handleClick}
          cases={this.state.cases}
          board={this.state.board}
        />
        {this.state.showModal || this.state.freeSpaces === 0 ? (
          <Modal
            winner={this.state.cases[this.state.winner]}
            resetGame={this.resetGame}
          />
        ) : null}
      </React.Fragment>
    );
  }
}
