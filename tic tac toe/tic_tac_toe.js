const board = [
  ["X", "O", ""],
  ["X", "O", "O"],
  ["O", "", ""]
];

let openSpots = 9;
let human = "X";
let ai = "O";
let currentPlayer = human;

console.log(board[0][0]);
console.log(board[1][0]);
console.log(board[2][0]);
console.log(checkWinner() + " wins");





function bestMove() {
  //AI to make its turn
  let bestScore = -Infinity;
  let move;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      //Is the spot available?
      if (board[i][j] == "") {
        board[i][j] = ai;
        let score = minimax(board, 0, true);
        board[i][j] = '';
        if (score > bestScore) {
          bestScore = score;
          move = {i, j};
        }
      }
    }
  }
  board[move.i][move.j] = ai;
  currentPlayer = human;
}

let scores = {
  'X': -1,
  'O': 1,
  'tie': 0
};

function minimax(board, depth, isMaximizing) {
  let result = checkWinner();
  if (result !== null) {
    let score = scores[result];
    return true;
  }

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        // Is the spot available?
        if (board[i][j] == '') {
          board[i][j] = ai;
          let score = minimax(board, depth + 1, false);
          board[i][j] = '';
          bestScore = max(score, bestScore);
        }
      }
    }
    return bestScore;

  } else {
    let bestScore = Infinity;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        // Is the spot available?
        if (board[i][j] == '') {
          board[i][j] = human;
          let score = minimax(board, depth + 1, true);
          board[i][j] = '';
          bestScore = min(score, bestScore);
        }
      }
    }
    return bestScore;
  }


}

function checkWinner() {
  let winner = null;
  for (let i = 0; i < 3; i++) {
    //check if a row has 3 of the same symbol (O or X)
    if (board[i][0] == board[i][1] && board[i][1] == board[i][2]) {
      winner = board[i][0]; //either X or O
    }
    //check if a column has 3 of the same symbol (O or X)
    if (board[0][i] == board[1][i] && board[1][i] == board[2][i]) {
      winner = board[0][i]; //either X or O
    }
    //both if statements check if the diagonals have three X or O
    if (board[0][0] == board[1][1] && board[1][1] == board[2][2]) {
      winner = board[0][0]; //either X or O
    }
    if (board[2][0] == board[1][1] && board[1][1] == board[0][2]) {
      winner = board[2][0]; //either X or O
    }
  }

  if (winner == null && openSpots == 0) {
        return 'tie';
      }
      return winner;
}