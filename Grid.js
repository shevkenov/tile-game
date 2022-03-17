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
      (c, i) =>
        new Cell(c, i % GRID_CELL, Math.floor((i / GRID_CELL) % GRID_CELL))
    );
  }

  get cellsByColumn(){
    return this.#cells.reduce((gridCell, cell) => {
        gridCell[cell.x] = gridCell[cell.x] || [];
        gridCell[cell.x][cell.y] = cell;
        return gridCell;
    }, []);
  }

  get #emptyCells() {
    return this.#cells.filter((c) => c.tile == null);
  }

  rendomEmptyCells() {
    const randomIndex = Math.floor(Math.random() * this.#emptyCells.length);
    return this.#emptyCells[randomIndex];
  }
}

class Cell {
  #x;
  #y;
  #cell;
  #tile;

  constructor(cell, x, y) {
    this.#x = x;
    this.#y = y;
    this.#cell = cell;
  }

  get x(){
      return this.#x;
  }
  
  get y(){
      return this.#y;
  }

  get tile() {
    return this.#tile;
  }

  set tile(value) {
    this.#tile = value;
    if(!value) return;
    this.#tile.x = this.#x;
    this.#tile.y = this.#y;
  }
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
