const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const message = document.getElementById('message');
const resetBtn = document.getElementById('resetBtn');

let currentPlayer = 'X'; // Player X starts
let gameBoard = Array(9).fill(null); // Empty game board
let gameActive = true; // Game status

// Function to handle player move
const handleCellClick = (e) => {
  const clickedCell = e.target;
  const clickedIndex = clickedCell.getAttribute('data-cell');
  
  if (gameBoard[clickedIndex] || !gameActive) return; // If cell is already filled or game ended

  gameBoard[clickedIndex] = currentPlayer;
  clickedCell.textContent = currentPlayer;

  // Check if the game is over
  if (checkWinner()) {
    message.textContent = `${currentPlayer} wins!`;
    gameActive = false;
    return;
  }

  // Check if it's a draw
  if (!gameBoard.includes(null)) {
    message.textContent = "It's a draw!";
    gameActive = false;
    return;
  }

  // Switch player
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
};

// Function to check if a player wins
const checkWinner = () => {
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontal
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Vertical
    [0, 4, 8], [2, 4, 6], // Diagonal
  ];

  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
      return true;
    }
  }
  return false;
};

// Function to reset the game
const resetGame = () => {
  gameBoard = Array(9).fill(null);
  cells.forEach(cell => cell.textContent = '');
  message.textContent = '';
  currentPlayer = 'X';
  gameActive = true;
};

board.addEventListener('click', handleCellClick);
resetBtn.addEventListener('click', resetGame);
