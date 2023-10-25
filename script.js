var cells = document.querySelectorAll(".cell");
var resetButton = document.querySelector(".reset-button");
var currentPlayer = "X";
var board = Array(9).fill(null);
cells.forEach(function (cell, index) {
    cell.addEventListener("click", function () { return handleCellClick(index); });
});
resetButton.addEventListener("click", resetGame);
function handleCellClick(index) {
    if (board[index] || checkWinner())
        return;
    board[index] = currentPlayer;
    cells[index].textContent = currentPlayer;
    cells[index].classList.add(currentPlayer);
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    var winner = checkWinner();
    if (winner) {
        setTimeout(function () {
            alert("Jogador ".concat(winner, " venceu!"));
        }, 10);
    }
}
function checkWinner() {
    var winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (var _i = 0, winPatterns_1 = winPatterns; _i < winPatterns_1.length; _i++) {
        var _a = winPatterns_1[_i], a = _a[0], b = _a[1], c = _a[2];
        if (board[a] && board[a] === board[b] && board[b] === board[c]) {
            cells[a].classList.add("winning-cell");
            cells[b].classList.add("winning-cell");
            cells[c].classList.add("winning-cell");
            return board[a];
        }
    }
    if (board.every(function (cell) { return cell !== null; })) {
        setTimeout(function () {
            alert("Empate!");
        }, 10);
    }
    return null;
}
function resetGame() {
    board = Array(9).fill(null);
    cells.forEach(function (cell) {
        cell.textContent = "";
        cell.classList.remove("X", "O", "winning-cell");
    });
    currentPlayer = "X";
}
