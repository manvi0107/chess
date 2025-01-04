// Initialize Chessboard.js and Chess.js
var board = Chessboard('board1', {
    draggable: true,         // Allow dragging of pieces
    dropOffBoard: 'trash',   // When pieces are dropped off the board, remove them
    sparePieces: true,       // Allow players to drag pieces back to the board
    pieceTheme: 'https://cdn.jsdelivr.net/npm/chessboardjs@1.0.0/dist/img/chesspieces/wikipedia/{piece}.png'  // Use Wikipedia pieces
});
var chess = new Chess();

// Start a new game
function startGame() {
    chess.reset();          // Reset chess game logic
    board.start();          // Reset chessboard
    renderMoveHistory();    // Display move history
}

// Clear the board (reset game state)
function clearGame() {
    chess.clear();
    board.clear();
    renderMoveHistory();
}

// Render move history to show past moves
function renderMoveHistory() {
    var moves = chess.history(); // Get the list of moves played
    var historyElement = document.getElementById('moveHistory');
    historyElement.innerHTML = moves.join(' ');  // Display the moves as text
}

// When the piece is dropped, validate the move using chess.js
board.on('drop', function (source, target) {
    var move = chess.move({ from: source, to: target }); // Make the move in chess.js

    // Render the move history and update the board
    renderMoveHistory();
    renderBoard();

    if (move === null) {
        return 'snapback'; // Invalid move, piece goes back to original position
    }
});

// Render the current board state
function renderBoard() {
    board.position(chess.fen());  // Update the chessboard position based on the current FEN string
}

// Setup event listeners for control buttons
document.getElementById('startBtn').addEventListener('click', startGame);
document.getElementById('clearBtn').addEventListener('click', clearGame);

// Initialize the board at the start
startGame();
