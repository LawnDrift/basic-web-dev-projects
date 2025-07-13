const board = [
  [" ", " ", " "],
  [" ", " ", " "],
  [" ", " ", " "]
];
let human = "X";
let ai = "O";
let currentPlayer = human;
const scores = {
  'X': -1,
  'O': 1,
  'tie': 0
};

const xELementString = `
        <div class="x">
          <div class="diagonal-1"></div>
          <div class="diagonal-2"></div>
        </div>
`;

const xELementStringHover = `
        <div class="x">
          <div class="diagonal-1 hover"></div>
          <div class="diagonal-2 hover"></div>
        </div>
`;

const oElementString = `
        <div class="o"></div>
`;

const oElementStringHover = `
        <div class="o hover"></div>
`;

const cells = document.querySelectorAll(".cell");

cells.forEach((cell) => {
  //hover effect when mouse enters and leaves
  cell.addEventListener('mouseenter', () => {
    if (cell.hasChildNodes()) {
      return;
    }
    cell.innerHTML = currentPlayer == "X" ? xELementStringHover : oElementStringHover;

  });
  cell.addEventListener('mouseleave', () => {
    if (cell.hasChildNodes() && !cell.classList.contains("active")) {
      cell.innerHTML = "";
    }
  });
  //checks clicking
  cell.addEventListener('click', () => {
    if (currentPlayer == human && !cell.classList.contains("active")) {
      const coordinateRegex = /cell-(\d)-(\d)/;
      const cellRowIndex = cell.id.replace(coordinateRegex, "$1");
      const cellColumnIndex = cell.id.replace(coordinateRegex, "$2");
      board[parseInt(cellRowIndex, 10)][parseInt(cellColumnIndex, 10)] = human;
    
      if (checkWinner() !== null) {
        console.log(`${checkWinner() !== "tie" ?
           checkWinner() + "wins the game!" : "Tie!!!"}`);

      } 
      else {
        currentPlayer = ai;
        bestMove();
      }
      updateBoard();
      if (checkWinner() !== null) {
        console.log(`${checkWinner()} wins the game!`);
      }
    }
  });
  
});




/*
while (true) {
  if (currentPlayer == human) {
    let rowResponse = prompt("Please enter an integer between 0 and 2 as row:");
    let columnResponse = prompt("Please enter an integer between 0 and 2 as column:");
    let rowInt = parseInt(rowResponse, 10);
    let columnInt = parseInt(columnResponse, 10);
    if (isNaN(rowInt) || isNaN(columnInt)) {
      console.log("Invalid Input, try again.");
      continue;
    } 
    else if ((rowInt > 2 || rowInt < 0) || (columnInt > 2 || columnInt < 0)) {
      console.log("The integer value must be between 0 and 2 (0, 1, 2).")
      continue;
    }
    
    else {
      if (board[rowInt][columnInt] !== " ") {
        continue;
      }
      board[rowInt][columnInt] = human;
  
      if (checkWinner() !== null) {
        drawBoard();
        console.log(`${checkWinner() !== "tie" ?
           checkWinner() + "wins the game!" : "Tie!!!"}`);

        break;
      }
      currentPlayer = ai;
      bestMove();
      
    }
    drawBoard();
    if (checkWinner() !== null) {
      console.log(`${checkWinner()} wins the game!`);
      break;
    }
  }
   
}
*/
function updateBoard() {
  cells.forEach(cell => {
    const coordinateRegex = /cell-(\d)-(\d)/;
    const cellRowIndex = parseInt(cell.id.replace(coordinateRegex, "$1"), 10);
    const cellColumnIndex = parseInt(cell.id.replace(coordinateRegex, "$2"), 10);
    if (board[cellRowIndex][cellColumnIndex] !== " ") {
      cell.innerHTML = board[cellRowIndex][cellColumnIndex] == "X" ?
      xELementString : oElementString;
      cell.classList.add("active");      
    }
  });
}


function bestMove() {
  // 1) Immediate win?

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      //Is the spot available?
      if (board[i][j] == " ") {
        board[i][j] = ai;
        if (checkWinner() == ai) {
          board[i][j] = ai;
          currentPlayer = human;
          return;
        }
        board[i][j] = " ";
      }
    }
  }
  
  //AI to make its turn
  let bestScore = -Infinity;
  let move;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      //Is the spot available?
      if (board[i][j] == " ") {
        board[i][j] = ai;
        let score = minimax(board, 0, false);
        board[i][j] = " ";
        if (score > bestScore) {
          bestScore = score;
          move = { i, j };
        }
      }
    }
  }
  board[move.i][move.j] = ai;
  currentPlayer = human;
}



function minimax(board, depth, isMaximizing) {
  let result = checkWinner();
  if (result !== null) {
    return scores[result];
  }

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        // Is the spot available?
        if (board[i][j] == " ") {
          board[i][j] = ai;
          let score = minimax(board, depth + 1, false);
          board[i][j] = " ";
          bestScore = Math.max(score, bestScore);
        }
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        // Is the spot available?
        if (board[i][j] == " ") {
          board[i][j] = human;
          let score = minimax(board, depth + 1, true);
          board[i][j] = " ";
          bestScore = Math.min(score, bestScore);
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
    if (board[i][0] == board[i][1] && board[i][1] == board[i][2] 
      && (board[i][0] == "O" || board[i][0] == "X")
    ) {
      winner = board[i][0]; //either X or O
    }
    //check if a column has 3 of the same symbol (O or X)
    if (board[0][i] == board[1][i] && board[1][i] == board[2][i] 
      && (board[0][i] == "O" || board[0][i] == "X")) {
      winner = board[0][i]; //either X or O
    }

  }
  if (board[0][0] == board[1][1] && board[1][1] == board[2][2] 
    && (board[0][0] == "O" ||board[0][0] == "X")) {
    winner = board[0][0]; //either X or O
  }
  if (board[2][0] == board[1][1] && board[1][1] == board[0][2] 
    && (board[2][0] == "O" || board[2][0] == "X")) {
    winner = board[2][0]; //either X or O
  }

  let openSpots = 0;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] == " ") {
        openSpots++;
      }
    }
  }

  if (winner == null && openSpots == 0) {
    return 'tie';
  } else {
    return winner;
  }
  
}