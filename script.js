let currentPlayer = 'X';
let playerXScore = 0;
let playerOScore = 0;
let totalMoves = 0;
let gameOver = false;

const board = document.getElementById('board');
const playerXScoreElement = document.getElementById('playerXScore');
const playerOScoreElement = document.getElementById('playerOScore');

// Spielstand aktualisieren
function updateScore() {
  playerXScoreElement.textContent = playerXScore;
  playerOScoreElement.textContent = playerOScore;
}

// Funktion zum Erstellen des Spielfelds und der Spiellogik
function createBoard() {
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.setAttribute('data-index', i);
    cell.onclick = () => cellClicked(cell, i);
    board.appendChild(cell);
  }
}

// Funktion, die bei einem Klick auf eine Zelle ausgeführt wird
function cellClicked(cell, index) {
  if (!gameOver && !cell.textContent) {
    cell.textContent = currentPlayer;
    totalMoves++;
    checkWinner();
    if (!gameOver) {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
    if (totalMoves === 9 && !gameOver) {
      alert('Unentschieden!');
      resetGame();
    }
  }
}

// Funktion zum Überprüfen des Gewinners
function checkWinner() {
  const cells = document.querySelectorAll('.cell');
  const winningCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

  for (let i = 0; i < winningCombos.length; i++) {
    const [a, b, c] = winningCombos[i];
    if (
      cells[a].textContent &&
      cells[a].textContent === cells[b].textContent &&
      cells[a].textContent === cells[c].textContent
    ) {
      alert(`Spieler ${cells[a].textContent} hat gewonnen!`);
      gameOver = true;
      if (cells[a].textContent === 'X') {
        playerXScore++;
      } else {
        playerOScore++;
      }
      updateScore();
      resetGame();
      break;
    }
  }
}

// Spiel zurücksetzen
function resetGame() {
  const cells = document.querySelectorAll('.cell');
  for (let i = 0; i < cells.length; i++) {
    cells[i].textContent = '';
  }
  totalMoves = 0;
  gameOver = false;
}

// Spielfeld erstellen, wenn die Seite geladen ist
window.onload = createBoard;
