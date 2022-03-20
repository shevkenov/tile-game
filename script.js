import Grid from "./Grid.js";
import Tile from "./Tile.js";

const gameBoard = document.getElementById("game-board");
const grid = new Grid(gameBoard);

grid.rendomEmptyCells().tile = new Tile(gameBoard);
grid.rendomEmptyCells().tile = new Tile(gameBoard);

handleSetup();

function handleSetup() {
  window.addEventListener("keydown", handleMove, { once: true });
}

async function handleMove(e) {
  switch (e.key) {
    case "ArrowUp":
      if(!canMoveUp()){
        handleSetup();
        return;
      }
      await moveUp();
      break;
    case "ArrowDown":
      if(!canMoveDown()){
        handleSetup();
        return;
      }
      await moveDown();
      break;
    case "ArrowLeft":
      if(!canMoveLeft()){
        handleSetup();
        return;
      }
      await moveLeft();
      break;
    case "ArrowRight":
      if(!canMoveRight()){
        handleSetup();
        return;
      }
      await moveRight();
      break;
    default:
      handleSetup();
      return;
  }

  grid.cells.forEach((c) => c.mergeTiles());

  const newTail = new Tile(gameBoard);
  grid.rendomEmptyCells().tile = newTail;

  if(!canMoveDown() && !canMoveLeft() && !canMoveRight() && !canMoveUp()){
    console.log('lost')
    alert("You loose the game!");

    return;
  }

  handleSetup();
}

function moveUp() {
  return slideTail(grid.cellsByColumn);
}

function moveDown() {
  return slideTail(grid.cellsByColumn.map((group) => [...group].reverse()));
}

function moveLeft() {
  return slideTail(grid.cellsByRow);
}

function moveRight() {
  return slideTail(grid.cellsByRow.map((group) => [...group].reverse()));
}

function slideTail(grid) {
  return Promise.all(
    grid.flatMap((group) => {
      const promises = [];
      for (let i = 1; i < group.length; i++) {
        const cell = group[i];
        if (!cell.tile) continue;
        let lastValidCell;
        for (let j = i - 1; j >= 0; j--) {
          const moveToCell = group[j];
          if (!moveToCell.canAccept(cell.tile)) break;
          lastValidCell = moveToCell;
        }

        if (lastValidCell != null) {
          //console.log(cell.tile)
          promises.push(cell.tile.waitForTransition())
          if (lastValidCell.tile != null) {
            lastValidCell.mergeTile = cell.tile;
          } else {
            lastValidCell.tile = cell.tile;
          }
          cell.tile = null;
        }
      }

      return promises;
    })
  );
}

function canMoveUp(){
  return canMove(grid.cellsByColumn);
}
function canMoveDown(){
  return canMove(grid.cellsByColumn.map(row => [...row].reverse()));
}
function canMoveLeft(){
  return canMove(grid.cellsByRow);
}
function canMoveRight(){
  return canMove(grid.cellsByRow.map(row => [...row].reverse()));
}

function canMove(cells){
  return cells.some(row => {
    return row.some((cell, i) => {
      // if it is the first row, cannot nove further
      if(i == 0) return false;
      // if cell is empty, no need to move
      if(!cell.tile) return false;

      const moveToCell = row[i-1];
      return (moveToCell.canAccept(cell.tile));
    })
  })
}

