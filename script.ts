const cells = document.querySelectorAll(".cell") as NodeListOf<HTMLDivElement>;
const resetButton = document.querySelector(".reset-button") as HTMLButtonElement;

let currentPlayer: "X" | "O" = "X";
let board: Array<string | null> = Array(9).fill(null);

cells.forEach((cell, index) => {
  cell.addEventListener("click", () => handleCellClick(index));
});

resetButton.addEventListener("click", resetGame);

function handleCellClick(index: number) {
  if (board[index] || checkWinner()) return;

  board[index] = currentPlayer;
  cells[index].textContent = currentPlayer;
  cells[index].classList.add(currentPlayer);
  currentPlayer = currentPlayer === "X" ? "O" : "X";

  const winner = checkWinner();
  if (winner) {
    setTimeout(() => {
      alert(`Jogador ${winner} venceu!`);
    }, 10);
  }
}

function checkWinner(): "X" | "O" | null {
  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const [a, b, c] of winPatterns) {
    if (board[a] && board[a] === board[b] && board[b] === board[c]) {
      cells[a].classList.add("winning-cell");
      cells[b].classList.add("winning-cell");
      cells[c].classList.add("winning-cell");
      return board[a] as "X" | "O";
    }
  }

  if (board.every((cell) => cell !== null)) {
    setTimeout(() => {
      alert("Empate!");
    }, 10);
  }

  return null;
}

function resetGame() {
  board = Array(9).fill(null);
  cells.forEach((cell) => {
    cell.textContent = "";
    cell.classList.remove("X", "O", "winning-cell");
  });
  currentPlayer = "X";
}
