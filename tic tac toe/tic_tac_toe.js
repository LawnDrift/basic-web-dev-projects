const originalBoard = [
  [" ", " ", " "],
  [" ", " ", " "],
  [" ", " ", " "]
];

let board = structuredClone(originalBoard);
let player = "X";
let player2 = "O";
let currentPlayer = player;

let playerScore = 0;
let player2Score = 0;
let drawScore = 0;

//winner coordinates are important to hover the
//cells that made the player win the round.

// Whenever the checkWinner() function 
// checks who wins, it stores the coordinates 
// of the winning slots so that they can be used
// later for hovering effect when the showWinner()
// function is displayed.
let winnerCoordinates = [];

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
const playAgainBtn = document.getElementById("play-again");
const player2StatText = document.getElementById("player2-stat");
const drawStatText = document.getElementById("draw-stat");
const playerStatText = document.getElementById("player-stat");
const winnerPanel = document.querySelector(".winner-panel");
const xOContainer = document.querySelector(".x-o-container");

cells.forEach((cell) => {


  //hover effect when mouse enters
  cell.addEventListener('mouseenter', () => {
    if (cell.hasChildNodes() || checkWinner() !== null) {
      return;
    }
    cell.innerHTML = currentPlayer == "X" ? xELementStringHover : oElementStringHover;

  });


  //hover effect when mouse leaves
  cell.addEventListener('mouseleave', () => {
    if (checkWinner() !== null) {
      return
    }
    if (cell.hasChildNodes() && !cell.classList.contains("active")) {
      cell.innerHTML = "";
    }
  });


  //checks clicking for either player1 or player2
  cell.addEventListener('click', () => {
    if (checkWinner() !== null) {
      return
    }
    //checks if the cell is NOT active
    if (!cell.classList.contains("active")) {
      //regex gets the two coordinate digits from
      //the cell element id.
      const coordinateRegex = /cell-(\d)-(\d)/;
      const cellRowIndex = cell.id.replace(coordinateRegex, "$1");
      const cellColumnIndex = cell.id.replace(coordinateRegex, "$2");
      //After getting the coordinates, we put the 
      //current player symbol in the corresponding
      //slot from the board 2d array
      board[parseInt(cellRowIndex, 10)][parseInt(cellColumnIndex, 10)] = currentPlayer;
    
      if (checkWinner() == "tie") drawScore += 1;
      if (checkWinner() == player) playerScore += 1;
      if (checkWinner() == player2) player2Score += 1;

      updateScores();       
      updateBoard();
      showWinner();
      currentPlayer = currentPlayer == player ? player2 : player;
    }
  });
  
});

playAgainBtn.addEventListener("click", () => {
  //calls showWinner() to toggle off the show class
  //It then resets
  showWinner();
  resetGame();
});



function updateBoard() {
  cells.forEach(cell => {
    const coordinateRegex = /cell-(\d)-(\d)/;
    const cellRowIndex = parseInt(cell.id.replace(coordinateRegex, "$1"), 10);
    const cellColumnIndex = parseInt(cell.id.replace(coordinateRegex, "$2"), 10);
    if (board[cellRowIndex][cellColumnIndex] !== " ") {
      cell.innerHTML = board[cellRowIndex][cellColumnIndex] == "X" ?
      xELementString : oElementString;
      //add classlist so that you can't click again to
      //a cell you already clicked in.
      cell.classList.add("active");      
    }
  });
}

function updateScores() {
  player2StatText.innerText = player2Score;
  playerStatText.innerText = playerScore;
  drawStatText.innerText = drawScore;

}

function checkWinner() {
  let winner = null;
  winnerCoordinates = [];
  for (let i = 0; i < 3; i++) {
    
    //check horizontal
    if (board[i][0] == board[i][1] && board[i][1] == board[i][2] 
      && (board[i][0] == "O" || board[i][0] == "X")
    ) {
      winner = board[i][0]; //either X or O
      winnerCoordinates.push({i, j: 0});
      winnerCoordinates.push({i, j: 1});
      winnerCoordinates.push({i, j: 2});
    }
    //check vertical
    if (board[0][i] == board[1][i] && board[1][i] == board[2][i] 
      && (board[0][i] == "O" || board[0][i] == "X")) {
      winner = board[0][i]; //either X or O
      winnerCoordinates.push({i: 0, j: i});
      winnerCoordinates.push({i: 1, j: i});
      winnerCoordinates.push({i: 2, j: i});
    }

  }

  //check diagonal
  if (board[0][0] == board[1][1] && board[1][1] == board[2][2] 
    && (board[0][0] == "O" ||board[0][0] == "X")) {
    winner = board[0][0]; //either X or O
    winnerCoordinates.push({i: 0, j: 0});
    winnerCoordinates.push({i: 1, j: 1});
    winnerCoordinates.push({i: 2, j: 2});
  }

  //check diagonal
  if (board[2][0] == board[1][1] && board[1][1] == board[0][2] 
    && (board[2][0] == "O" || board[2][0] == "X")) {
    winner = board[2][0]; //either X or O


    winnerCoordinates.push({i: 2, j: 0});
    winnerCoordinates.push({i: 1, j: 1});
    winnerCoordinates.push({i: 0, j: 2});
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

function showWinner() {
  const winnerHeader = document.getElementById("winner-h1");
  if (checkWinner() !== null) {
    winnerPanel.classList.toggle("show");
    if (checkWinner() == "X") {
      xOContainer.innerHTML = xELementString;
      winnerHeader.innerText = "Winner!";
    }
      
    if (checkWinner() == "O")  {
      xOContainer.innerHTML = oElementString;
      winnerHeader.innerText = "Winner!";
    }
    if (checkWinner() == "tie") {
      xOContainer.innerHTML = xELementString + oElementString;
      winnerHeader.innerText = "Draw!";
    }
  }
  //adds class to cells of the corresponding winning
  //position to show hover effect.
  for (coordinate of winnerCoordinates) {
    const winnerCell = document.getElementById(`cell-${coordinate.i}-${coordinate.j}`);
    winnerCell.classList.toggle(`${checkWinner().toLowerCase()}-winner`);
  }
  
}

function resetGame() {
  board = structuredClone(originalBoard);
  cells.forEach(cell => {
    cell.innerHTML = "";
    cell.classList.remove("active");
  });
  currentPlayer = player;

}