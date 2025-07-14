const originalBoard = [
  [" ", " ", " "],
  [" ", " ", " "],
  [" ", " ", " "]
];

let board = structuredClone(originalBoard);
let human = "X";
let ai = "O";
let currentPlayer = human;
let difficulty = "medium";

let playerScore = 0;
let computerScore = 0;
let drawScore = 0;

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

const difficultyStateText = document.getElementById("difficulty-state");
const cells = document.querySelectorAll(".cell");
const easyBtn = document.getElementById("easy-btn");
const mediumBtn = document.getElementById("medium-btn");
const ImpossibleBtn = document.getElementById("impossible-btn");
const computerStatText = document.getElementById("computer-stat");
const drawStatText = document.getElementById("draw-stat");
const playerStatText = document.getElementById("player-stat");

cells.forEach((cell) => {
  //hover effect when mouse enters and leaves
  cell.addEventListener('mouseenter', () => {
    if (cell.hasChildNodes() || checkWinner() !== null) {
      return;
    }
    cell.innerHTML = currentPlayer == "X" ? xELementStringHover : oElementStringHover;

  });
  cell.addEventListener('mouseleave', () => {
    if (checkWinner() !== null) {
      return
    }
    if (cell.hasChildNodes() && !cell.classList.contains("active")) {
      cell.innerHTML = "";
    }
  });
  //checks clicking
  cell.addEventListener('click', () => {
    if (checkWinner() !== null) {
      return
    }
    if (currentPlayer == human && !cell.classList.contains("active")) {
      const coordinateRegex = /cell-(\d)-(\d)/;
      const cellRowIndex = cell.id.replace(coordinateRegex, "$1");
      const cellColumnIndex = cell.id.replace(coordinateRegex, "$2");
      board[parseInt(cellRowIndex, 10)][parseInt(cellColumnIndex, 10)] = human;
    
      if (checkWinner() !== null) {
        console.log(`${checkWinner() !== "tie" ?
        checkWinner() + "wins the game!" : "Tie!!!"}`);
        if (checkWinner() == "tie") drawScore += 1;
        updateScores();
      } 
      else {
        currentPlayer = ai;
        bestMove();
      }
      updateBoard();
      if (checkWinner() !== null) {
        console.log(`${checkWinner()} wins the game!`);
        if (checkWinner() == human) playerScore += 1;
        if (checkWinner() == ai) computerScore += 1;
        updateScores();
      }
    }
  });
  
});

easyBtn.addEventListener("click", () => {
  difficulty = "easy";
  difficultyStateText.innerText = `Current Difficulty: Easy`;
  resetGame();
  playerScore = 0;
  computerScore = 0;
  drawScore = 0;
});

mediumBtn.addEventListener("click", () => {
  difficulty = "medium";
  difficultyStateText.innerText = `Current Difficulty: Medium`;
  resetGame();
  playerScore = 0;
  computerScore = 0;
  drawScore = 0;
});

ImpossibleBtn.addEventListener("click", () => {
  difficulty = "impossible";
  difficultyStateText.innerText = `Current Difficulty: Impossible`;
  resetGame();
  playerScore = 0;
  computerScore = 0;
  drawScore = 0;
});

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

function updateScores() {
  computerStatText.innerText = computerScore;
  playerStatText.innerText = playerScore;
  drawStatText.innerText = drawScore;
}


function bestMove() {
  //Easy mode here:
  if (difficulty == "easy") {

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const randRowIndx = Math.floor(Math.random() * 3);
        const randColumnIdx = Math.floor(Math.random() * 3);
        if (board[randRowIndx][randColumnIdx] === " ") {
          board[randRowIndx][randColumnIdx] = ai;
          currentPlayer = human;
          return;
        }
      }
    }
    
  }


  //Medium & Impossible mode lie below here:


  let bestScore = -Infinity;
  let move;
  const maxDepth = difficulty === "medium" 
  ? 2 : Infinity; //maxDepth of 2 means that the ai only looks 2 steps ahead.
  
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      //Is the spot available?
      if (board[i][j] == " ") {
        board[i][j] = ai;
        let score = minimax(0, false, maxDepth);
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



function minimax(depth, isMaximizing, maxDepth) {
  const result = checkWinner();
  if (result !== null) {
    if (result == 'tie') return 0;
    if (result == ai) return 10 - depth;
    if (result == human) return depth - 10;
  }
  // if we reached our depth cap, return a neutral
  //heuristic (0)
  if (depth >= maxDepth) {
    return 0;
  }


  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        // Is the spot available?
        if (board[i][j] == " ") {
          board[i][j] = ai;
          let score = minimax(depth + 1, false, maxDepth);
          board[i][j] = " ";
          bestScore = Math.max(score, bestScore);
        }
      }
    }
    return bestScore;
  } else {
    let worstScore = Infinity;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        // Is the spot available?
        if (board[i][j] == " ") {
          board[i][j] = human;
          let score = minimax(depth + 1, true, maxDepth);
          board[i][j] = " ";
          worstScore = Math.min(score, worstScore);
        }
      }
    }
    return worstScore;
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

function resetGame() {
  board = structuredClone(originalBoard);
  cells.forEach(cell => {
    cell.innerHTML = "";
    cell.classList.remove("active");
  });

}