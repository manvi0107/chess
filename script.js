// Initialize Chessboard.js and Chess.js
var board = Chessboard('board1', {
    draggable: true,         // Allow dragging of pieces
    dropOffBoard: 'trash',   // When pieces are dropped off the board, remove them
    sparePieces: true        // Allow players to drag pieces back to the board
});
var chess = new Chess();

// Start a new game
function startGame() {
    chess.reset();
    board.start();
    renderMoveHistory();
}

// Clear the board (reset game state)
function clearGame() {
    chess.clear();
    board.clear();
    renderMoveHistory();
}

// Render move history to show past moves
function renderMoveHistory() {
    var moves = chess.history();
    var historyElement = document.getElementById('moveHistory');
    historyElement.innerHTML = moves.join(' ');
}

// When the piece is dropped, validate the move using chess.js
board.on('drop', function (source, target) {
    var move = chess.move({ from: source, to: target });

    // Render the move history and update the board
    renderMoveHistory();
    renderBoard();

    if (move === null) {
        return 'snapback'; // Invalid move, piece goes back
    }
});

// Render the current board state
function renderBoard() {
    board.position(chess.fen());
}

// Setup event listeners for control buttons
document.getElementById('startBtn').addEventListener('click', startGame);
document.getElementById('clearBtn').addEventListener('click', clearGame);

// Initialize the board at the start
startGame();

