import Grid from './Grid.js';

const gameBoard = document.getElementById('game-board');
const grid = new Grid(gameBoard);

grid.rendomTile(gameBoard);
grid.rendomTile(gameBoard);
//grid.createGridElement(gameBoard);

// const tile = document.createElement('div');
// tile.classList.add('tile');
// tile.textContent = '5';

//grid.appendChild(tile);

