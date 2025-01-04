// Web Worker example to interact with Stockfish (you must provide a stockfish.js file)
var worker = new Worker('stockfish.js');

worker.postMessage('uci'); // Initialize the engine

worker.onmessage = function(event) {
    console.log("Stockfish:", event.data);
    if (event.data === 'uciok') {
        worker.postMessage('isready');
    }
};

// Example to get a move suggestion from Stockfish
function getStockfishMove(fen) {
    worker.postMessage('position fen ' + fen);
    worker.postMessage('go movetime 1000'); // Search for 1 second
}
