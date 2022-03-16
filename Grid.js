const GRID_CELL = 4;
const GRID_GAP_SIZE = 1;
const GRID_CELL_SIZE = 20;

export default class Grid {
  #cells;
  constructor(gridElement) {
    gridElement.style.setProperty("--cell-size", `${GRID_CELL_SIZE}vmin`);
    gridElement.style.setProperty("--cell-gap", `${GRID_GAP_SIZE}vmin`);
    gridElement.style.setProperty("--grid-size", GRID_CELL);

    this.#cells = createGridElement(gridElement).map(
      (c,i) => new Cell(c, i % GRID_CELL, Math.floor((i / GRID_CELL) % GRID_CELL))
    );
  }

  rendomTile(gridElement){
      const x = Math.floor(Math.random() * 4);
      const y = Math.floor(Math.random() * 4);
      const tile = document.createElement('div');
      tile.classList.add('tile');
      tile.style.setProperty('--x', x);
      tile.style.setProperty('--y', y);
      tile.textContent = 4;
      gridElement.append(tile);
  }
}

class Cell {
  #x;
  #y;
  #cell;
  constructor(cell, x, y) {
    this.#x = x;
    this.#y = y;
    this.#cell = cell;
  }
}

class Tile{
    
}

function createGridElement(element) {
  const cells = [];

  for (let i = 0; i < GRID_CELL * GRID_CELL; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");

    element.append(cell);

    cells.push(cell);
  }

  return cells;
}
